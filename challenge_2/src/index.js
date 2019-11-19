window.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  (function test() {
    const div = document.createElement('div');
    div.innerHTML = 'hiya from index.js';
    app.appendChild(div);
  }());
});
