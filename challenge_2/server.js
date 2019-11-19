const express = require('express');

const app = express();
const port = 3000;

app.use('/', express.static('client'));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`server listening on ${port}`));

app.post('/', express.urlencoded({ extended: true }), (req, res) => {
  debugger;
  res.redirect('/');
});
