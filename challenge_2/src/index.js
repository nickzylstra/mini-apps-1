document.body.prependChild(() => {
  const div = document.createElement('div');
  div.innerHTML = 'hiya from index.js';
});
