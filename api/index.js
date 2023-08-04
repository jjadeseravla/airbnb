const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

// use line underneath if get server error 500, could not get 'name' from req.body for register endpoint
app.use(express.json());
app.use(cors({
  // credentials: true,
  // telling teh backend it must communicate with the url of frontend
  // origin: 'http://127.0.0.1:5173',
  // origin: 'http//localhost:5173'
}));



// app.get('/test', (req, res) => {
  //   // console.log('-----------here')
  //   res.json('ok')
  // });
  
  app.post('/register', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  const userDoc = await User.create({
    name, 
    email,
    password: bcrypt.hashSync(password, bcryptSalt),
  })
  res.json(userDoc);
})

app.listen(4000);

// tOeqFg2W2iR1fkZf