const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'abc';

// use line underneath if get server error 500, could not get 'name' from req.body for register endpoint
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+ '/uploads'));
app.use(cors({
   credentials: true,
  // telling teh backend it must communicate with the url of frontend
   origin: 'http://127.0.0.1:5173',
  // origin: 'http//localhost:5173'
}));



// app.get('/test', (req, res) => {
  //   // console.log('-----------here')
  //   res.json('ok')
  // });
  
app.post('/register', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  const userCreated = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
  res.json(userCreated);
});

app.post('/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userFindOne = await User.findOne({ email: email });
  console.log('-----------1')
  if (userFindOne) {
    // see if our log in password is the same as register one
    console.log('-----------2')
    const passwordOk = bcrypt.compareSync(password, userFindOne.password);
    if (passwordOk) {
      console.log('-----------3')
      jwt.sign({
        email: userFindOne.email,
        id: userFindOne._id,
        name: userFindOne.name
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        console.log('-----------4', userFindOne)
        res.cookie('token', token).json(userFindOne); // userInfo cos thats what youve named axios req in login component
      })
    } else {
      console.log('-----------not here')
      res.json('password NOT ok')
    }
  }
  // console.log('-----------not here 2')
  // res.json('not found :(')
});

app.get('/profile', (req, res) => {
  console.log('---------------DAVE--------------------', req.cookies)
  const { token } = req.cookies;
  if (token) {
    console.log('---------------DAVE 1--------------------')
    jwt.verify(token, jwtSecret, {}, (err, user) => {
      console.log('---------------DAVE 2--------------------')
      if (err) throw err;
      res.json(user);
    })
  } else {
    console.log('---------------DAVE 3--------------------')

    res.json(null);
  }
})

app.post('/logout', (req, res) => {
  // reset token
  res.cookie('token', '').json(true);

})

console.log({ __dirname });
// { __dirname: '/Users/Jade/Documents/airbnb/api' }
app.post('upload-by-link', async(req, res) => {
  const { link } = req.body;
  const newName = Date.now() + '.jpg';
  await download.image({
    url: link,
    dest: __dirname + '/uploads' + newName,
  });
  res.json(__dirname + '/uploads' + newName);
})
  
app.listen(4000);

// tOeqFg2W2iR1fkZf