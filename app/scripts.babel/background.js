'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch(request.type){
    case 'counter':
      chrome.browserAction.setBadgeText({text: request.count.toString(), tabId: sender.tab.id});
      break;
  }
});



chrome.browserAction.setBadgeBackgroundColor({color: '#F89406'});