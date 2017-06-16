/*
    This is the regex-consumer
 */
const regexConsumer = function (cb) {
  const regex = /\\?(CW|CN|TW|cw|cn|tw):(\s)?((\w| |\/|"|-)*\w)+(,(\w| |\/|"|-)+\w)*/g;
  let data = document.body.innerHTML;
  let m;

  do {
    m = regex.exec(data);
    if (m && m[0].charAt(0) !== '\\') {
      let warnings = m[0].substr(3).trim().split(',');

      for(let i = 0; i < warnings.length; i++){
        let warning = warnings[i].trim();
        if(warning.substr(0, 4) === 'and '){
          cb(warning.substr(4));
        }
        else {
          cb(warning);
        }
      }
    }
  } while (m);
};