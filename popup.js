//toggle button
document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      // do this
      console.log("Checked");
    } else {
      // do that
      console.log("Not checked");
    }
  });
});

//updating censor types
const INPUTS = document.querySelectorAll('#replacements input');
const updateValue = e => document.querySelector('#result').innerHTML = e.target.value;

INPUTS.forEach(el => el.addEventListener('click', e => updateValue(e)));