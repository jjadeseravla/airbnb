const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Place = require('./models/Place');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
var path = require('path');


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


var storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
      console.log('----------1-------------', file)
        cb(null, file.originalname);
    }
});

const photosMiddleware = multer({
  storage,
  // dest: 'uploads'
});


// app.post("/upload_files", upload.array("files"), uploadFiles);

function uploadFiles(req, res) {
  console.log(req.body);
  console.log(req.files);
  
  // update database

  // redirect somewhere
  // res.json({ message: "Successfully uploaded files" });
  let uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    console.log('---------xxxx', req.files[0])
    const { path, originalname } = req.files[i];
    // const parts = originalname.split('.')
    // const ext = parts[parts.length - 1];
    // const newPath = path + '.' + ext;
    // console.log('---------1', req.files[0])
    // 
    // fs.renameSync(path, newPath)
    // const image = fs.readFileSync(path);
    // console.log('---------2', req.files[0])
    // Set the appropriate content type for JPEG
    // res.setHeader('Content-Type', 'image/jpeg');
    
    // uploadedFiles.push(newPath.replace('uploads/', ''));
    uploadedFiles.push(`http://localhost:4000/uploads/${originalname}`);
  }
  res.send(uploadedFiles);
}

app.post('/upload', photosMiddleware.array('photos', 100), uploadFiles);



// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
//   const uploadedFiles = [];
  
//   for (let i = 0; i < req.files.length; i++) {
//     console.log('---------xxxx', req.files[0])
//     const { path, originalname } = req.files[i];
//     // const parts = originalname.split('.')
//     // const ext = parts[parts.length - 1];
//     // const newPath = path + '.' + ext;
//     // console.log('---------1', req.files[0])
// // 
//     // fs.renameSync(path, newPath)
//     const image = fs.readFileSync(path);
//     // console.log('---------2', req.files[0])
//     // Set the appropriate content type for JPEG
//     res.setHeader('Content-Type', 'image/jpeg');

//     // uploadedFiles.push(newPath.replace('uploads/', ''));
//     uploadedFiles.push(originalname);
//   }


//   // Send the image in the response
//   res.send(uploadedFiles);
//   // res.json(uploadedFiles); // res. send content type image
// })

app.post('/places', (req, res) => {
  const token = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async(err, userData) => {
    if (err) throw err;
    // return our place documentation from DB
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  })
})
  
app.listen(4000);

// tOeqFg2W2iR1fkZf