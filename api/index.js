const express = require('express');
const cors = require('cors');
const app = express();

// use line underneath if get server error 500, could not get 'name' from req.body for register endpoint
app.use(express.json());
app.use(cors({
  // credentials: true,
  // telling teh backend it must communicate with the url of frontend
  // origin: 'http://127.0.0.1:5173',
  // origin: 'http//localhost:5173'
}));

app.get('/test', (req, res) => {
  // console.log('-----------here')
  res.json('ok')
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  res.json({name, email, password});
})

app.listen(4000);