const $ = require('jquery');

window.addEventListener('DOMContentLoaded', () => {
  const $app = $('#app');
  const $form = $(`
  <form method="POST">
    <div>
      <label for="jsoninput">Input JSON to translate to CSV</label>
      <textarea
          rows="50"
          cols="50"
          name="jsoninput"
          id="jsoninput"
          placeholder="Input JSON..."
        ></textarea>
    </div>
    <div>
      <input type="submit" value="Submit">
    </div>
  </form>
  `);
  $app.append($form);
});
