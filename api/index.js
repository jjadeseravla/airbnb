const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

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
  if (userFindOne) {
    // see if our log in password is the same as register one
    const passwordOk = bcrypt.compareSync(password, userFindOne.password);
    if (passwordOk) {
      jwt.sign({
        email: userFindOne.email,
        id: userFindOne._id,
        name: userFindOne.name
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
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
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, user) => {
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
app.post('upload-by-link', async (req, res) => {
  console.log('-----1')
  const { link } = req.body;
  const newName = Date.now() + '.jpg';
  await download.image({
    url: link,
    dest: __dirname + '/uploads' + newName,
  });
  res.json(__dirname + '/uploads' + newName);
});

const photosMiddleware = multer({ destination: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  console.log('---------', req.files)
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalName } = req.files[i];
    const parts = originalName.split('.')
    const ext = parts[parts.lenggth - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace('uploads/', ''));
  }
  res.json(uploadedFiles);
})
  
app.listen(4000);

// tOeqFg2W2iR1fkZf