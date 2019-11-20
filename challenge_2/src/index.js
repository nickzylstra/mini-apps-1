const $ = require('jquery');

window.addEventListener('DOMContentLoaded', () => {
  const $app = $('#app');
  const $form = $(`
  <form method="POST" enctype="multipart/form-data">
    <div>
      <label for="jsoninput">Upload JSON file to translate to CSV</label>
      <input
          type="file"
          name="jsoninput"
          id="jsoninput"
          accept=".json"
        >
    </div>
    <div>
      <input type="submit" value="Submit">
    </div>
  </form>
  `);
  $app.append($form);
});
