/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyparser.json());

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((result) => {
    debugger;
    console.log(`mongoose connected ${result}`);
  }, (err) => {
    console.log(`mongoose failed to connect, \n ${err}`);
  });

app.post('/Home', (req, res, next) => {
  // TODO replace userId with cookie
  console.log('new user requested');
  const data = { userId: '00045' };
  res.end(JSON.stringify(data));
});

app.post('/F1', (req, res, next) => {
  console.log('F1 submitted');
  const data = { userId: '00045' };
  res.end(JSON.stringify(data));
});
