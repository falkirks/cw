
const tagConsumer = function (cb) {
  let all = document.getElementsByTagName('*');
  for (let i = 0, max=all.length; i < max; i++) {
    let data = all[i].getAttribute('cw-data');
    if(data !== null && data !== ''){
      data.split(',').forEach(function (warning) {
        cb(warning.trim());
      });
    }
  }
};