/// <reference path="./chrome.d.ts" /> #
import "../img/note_69.png";
import {updateNotes} from "./helpers/utils"
chrome.runtime.onInstalled.addListener(function() {
  onInstalled();
  onPageChanged();
});

chrome.runtime.onConnect.addListener(function(externalPort) {
  externalPort.onDisconnect.addListener(function(w) {
    console.log("onDisconnect", w);
    // Do stuff that should happen when popup window closes here
    chrome.storage.sync.set("notes");
  });

  console.log("onConnect");
});

function onInstalled() {
  chrome.storage.sync.set(
    {
      color: "#606060",
      "card-bg-color": "#606060",
      "text-color": "#ffffff",
      notes: []
    },
    function() {
      console.log("installed.");
    }
  );
}

function onPageChanged() {
  //   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //     chrome.declarativeContent.onPageChanged.addRules([
  //       {
  //         conditions: [
  //           new chrome.declarativeContent.PageStateMatcher({
  //             pageUrl: { hostEquals: "*/*"
  //             urlMatches:"(slfdk|xmcmx).*"
  //              }
  //             // pageUrl:"*"
  //           })
  //         ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //       }
  //     ]);
  //   });
}

chrome.browserAction.onClicked.addListener(tab => {
  // chrome.tabs.executeScript({
  //   file: "appIframe.js"
  // });
  // chrome.tabs.executeScript({
  //   code:"console.log('executeScript')"
  // })
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    console.log(tabs);
    chrome.tabs.sendMessage(tabs[0].id, { openApp: true }, function(response) {
      console.log("open app response :", response);
    });
  });
});

// chrome.webNavigation.onCompleted.addListener(
//   function() {
//     alert("This is my favorite website!");
//   },
//   { url: [{ urlMatches: "https://www.google.co.in/" }] }
// );

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("asldfjsladj lask djflkdjs ", request);
  if (request.type == "popupInit") console.log("popup");
  console.log("message");
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  if (request.greeting == "hello") sendResponse({ farewell: "goodbye" });

  if (request.saveNote) {
    console.log("...saving...", request.saveNote);
  }
  return true;
});

window.saveNotes = ({ activeNotes }) => {
  console.log("activenotes", activeNotes);
  updateNotes(chrome,activeNotes)
};
