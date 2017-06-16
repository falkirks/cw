let words = [];

chrome.storage.sync.get({
  words: ''
}, function(items) {
  words = items.words.split(',').map(function (str) {
    return str.trim();
  }).filter(function (str) {
    return str !== '';
  });

});

const personalConsumer = function (cb) {
  let data = document.body.innerText;
  words.forEach(function (word) {
    let regex = new RegExp('\\W' + word + '\\W', 'i');
    if(regex.test(data)){
      cb(word);
    }
  });
};


