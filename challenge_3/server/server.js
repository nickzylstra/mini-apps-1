/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const model = require('./model');

const app = express();
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyparser.json());

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
