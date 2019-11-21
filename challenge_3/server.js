/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();
const port = 3000;

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());

app.post('/f1', (req, res, next) => {
  debugger;
});
