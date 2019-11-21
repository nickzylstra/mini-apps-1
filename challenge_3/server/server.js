/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
// const db = require('./model');
const { post } = require('./controller');

const app = express();
const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyparser.json());

app.post('/Home', (req, res, next) => {
  // TODO replace userId with cookie
  post(null, (err, id) => {
    if (err) {
      console.log(err);
      res.end(err);
      next();
    }
    console.log(`new user created with id: ${id}`);
    res.end(JSON.stringify({ id }));
    next();
  });
});

app.post('/F1', (req, res, next) => {
  console.log('F1 data received');
  post(req.body, (err, id) => {
    if (err) {
      console.log(err);
      res.end(err);
      next();
    }
    console.log(`F1 data added to id: ${id}`);
    res.end(JSON.stringify({ id }));
    next();
  });
});
