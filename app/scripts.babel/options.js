'use strict';

console.log('\'Allo \'Allo! Option');

function save_options() {
  let words = document.getElementById('words').value;
  chrome.storage.sync.set({
    words: words
  }, function() {
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    words: ''
  }, function(items) {
    document.getElementById('words').value = items.words;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
  save_options);