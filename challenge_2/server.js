const express = require('express');

const app = express();
const port = 3000;

// app.get('/', (req, res) => res.send('heyo'));
app.use('/', express.static('dist'));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`server listening on ${port}`));
