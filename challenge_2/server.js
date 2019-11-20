const express = require('express');
const fs = require('fs');
const path = require('path');
const Busboy = require('busboy');

const app = express();
const port = 3000;

const jsonToCSV = (json) => {
  // eslint-disable-next-line max-len
  /* The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report. */
  // eslint-disable-next-line max-len
  /* You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.

  You may also assume that child records in the JSON will always be in a property called `children`.
   */
  const parsed = JSON.parse(json);

  const flattenObj = (obj, flatObj = { objCount: 0 }) => {
    const oKeys = Object.keys(obj);
    oKeys.forEach((oKey) => {
      if (!flatObj[oKey] && oKey !== 'children') {
        // eslint-disable-next-line no-param-reassign
        flatObj[oKey] = [];
        for (let i = 0; i < flatObj.objCount; i += 1) {
          flatObj[oKey].push('');
        }
      }
    });

    const foKeys = Object.keys(flatObj);
    foKeys.forEach((foKey) => {
      if (Object.prototype.hasOwnProperty.call(obj, foKey)) {
        flatObj[foKey].push(obj[foKey]);
      } else if (foKey !== 'objCount') {
        flatObj[foKey].push('');
      }
    });

    // eslint-disable-next-line no-param-reassign
    flatObj.objCount += 1;

    if (obj.children) {
      obj.children.forEach((child) => {
        flattenObj(child, flatObj);
      });
    }

    return flatObj;
  };

  const flattenedObj = flattenObj(parsed);
  const cols = Object.keys(flattenedObj).filter((col) => col !== 'objCount');
  let csv = `${cols.join(',')}\n`;

  for (let i = 0; i < cols.length; i += 1) {
    const col = cols[i];
    csv += `${flattenedObj[col].join(',')}\n`;
  }

  return csv;
};

app.use('/', express.static('client'));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`server listening on ${port}`));

// saves file to disk and adds name to req.file
const runBusBoy = (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    console.log('Saving file');
    const saveTo = path.join(__dirname, 'csvFiles', path.basename(fieldname));
    file.pipe(fs.createWriteStream(saveTo));
    req.file = fieldname;
  });
  busboy.on('finish', () => {
    console.log('File saved!');
    next();
  });
  req.pipe(busboy);
};

app.post('/', runBusBoy, (req, res, next) => {
  const formFilePath = path.join(__dirname, 'client', 'index.html');
  fs.readFile(formFilePath, (err, form) => {
    if (err) {
      console(err);
      next();
    }
    const savedFilePath = path.join(__dirname, 'csvFiles', path.basename(req.file));
    fs.readFile(savedFilePath, (err, json) => {
      const csv = jsonToCSV(json);
      const page = form + csv;
      res.status(200).send(page);
    });
  });
});
