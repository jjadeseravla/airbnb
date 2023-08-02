const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  credentials: true,
  // telling teh backend it must communicate with the url of frontend
  origin: 'http://127.0.0.1:5173',
}));

// app.get('/test', (req, res) => {
//   // console.log('-----------here')
//   res.json('ok')
// });

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json('ok');
})

app.listen(4000);