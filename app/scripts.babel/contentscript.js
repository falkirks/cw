'use strict';
let warningList = [];
const CW_META_OFF = 'no';
const CW_META_ON = 'yes';
const CW_META_FULL = 'full';
const CW_META_DEFAULT = 'default';


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "50000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

let getMetaMode = function() {
  let metas = document.getElementsByTagName('meta');

  for (let i=0; i<metas.length; i++) {
    if (metas[i].getAttribute('name') == 'cw') {
      let meta = metas[i].getAttribute('content');
      if(meta === CW_META_OFF || meta === CW_META_ON || meta === CW_META_FULL || meta === CW_META_DEFAULT){
        return meta;
      }
    }
  }
  return CW_META_DEFAULT;
};

const LOCAL_META_MODE = getMetaMode();



let displayContentWarning = function (warning) {
  if(warningList.indexOf(warning.toLowerCase()) === -1){
    toastr.warning(warning, 'Content warning!');
    warningList.push(warning.toLowerCase());
  }
  chrome.runtime.sendMessage({type: 'counter', count: warningList.length});
  chrome.runtime.sendMessage({type: 'warnings', warnings: warningList});
};

let runChecks = function () {
  if(LOCAL_META_MODE === CW_META_DEFAULT || LOCAL_META_MODE === CW_META_ON) {
    regexConsumer(displayContentWarning);
  }

  if(LOCAL_META_MODE === CW_META_ON || LOCAL_META_MODE === CW_META_FULL){
    tagConsumer(displayContentWarning);
  }

  if(LOCAL_META_MODE === CW_META_DEFAULT || LOCAL_META_MODE === CW_META_ON || LOCAL_META_MODE === CW_META_FULL){
    personalConsumer(displayContentWarning);
  }
};


MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let observer = new MutationObserver(function(mutations, observer) {
  runChecks();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true,
  childList: true,
  characterData: true
});

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  switch (request.type){
    case 'warningsRequest':
      sendResponse({type: 'warnings', warnings: warningList});
      break;
  }
});

runChecks();

console.log(getMetaMode());