'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("sent from tab.id=", sender.tab.id);
  switch(request.type){
    case 'counter':
      chrome.browserAction.setBadgeText({text: request.count.toString(), tabId: sender.tab.id});
      break;
  }
});

chrome.browserAction.setBadgeText({text: '\'Hey'});

console.log('\'Allo \'Allo! Event Page for Browser Action');
