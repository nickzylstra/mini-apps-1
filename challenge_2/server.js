const express = require('express');

const app = express();
const port = 3000;

// eslint-disable-next-line max-len
/* The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report. */
// eslint-disable-next-line max-len
/* You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.

You may also assume that child records in the JSON will always be in a property called `children`.
 */
const jsonToCSV = (json) => {
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
        flatObj[oKey].push(obj[oKey]);
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

  // let csv = passedCSV;
  // csv += passedCols.filter((col) => col !== 'children').join(',');
  // csv += '\n';
  debugger;
  return;
};

app.use('/', express.static('client'));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`server listening on ${port}`));

app.post('/', express.urlencoded({ extended: true }), (req, res) => {
  const csv = jsonToCSV(req.body.jsoninput);
  res.status(201).send(csv);
  // debugger;
  // add functionality to send back to form after sending csv
  // res.status(201).redirect('/');
});
