const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require('body-parser'),
  port = 3080;

// placeholder for the data
const users = [
  {
    email: 'littled685@gmail.com',
    password: '123456789',
    admin: true,
    userInfo: {
      name: 'Liza',
      group: 'IP-94',
      phone: '123456789',
      idCard: 'AB №123456',
      faculty: 'FICT',
    },
  },
];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../ui/build')));

// Get users
app.get('/api/users', (req, res) => {
  res.json(users);
});

//Add user
app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.sendStatus('OK');
});

//Get current user
app.get('/api/current/:email', (req, res) => {
  const email = req.params.email;
  const user = users.find((el) => el.email === email);
  if (!user) res.json({});
  res.json(user);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
