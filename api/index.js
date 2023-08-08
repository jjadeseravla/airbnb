const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'abc';

// use line underneath if get server error 500, could not get 'name' from req.body for register endpoint
app.use(express.json());
app.use(cors({
  //  credentials: true,
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
      jwt.sign({ email: userFindOne.email, id: userFindOne._id }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        console.log('-----------4', userFindOne)
        res.cookie('token', token).json(userFindOne);
      })
    } else {
      console.log('-----------not here')
      res.json('password NOT ok')
    }
  }
  console.log('-----------not here 2')
  res.json('not found :(')
});
  
app.listen(4000);

// tOeqFg2W2iR1fkZf