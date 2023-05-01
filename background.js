// Copyright - BrowserNative, browsernative.apps@gmail.com, https://browsernative.com/close-all-tabs-extension/

const closeAllTabs = function(action, thisTab) {
    if(action === "newtab") {
        chrome.tabs.create({}, function(newTab){
            let querying = chrome.tabs.query({}, function(tabs){
                var cpt = localStorage.getItem('cpt') || "false";
                if (cpt === "true") {
                    for (let tab of tabs) {
                        if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
                    } 
                }
                if (cpt === "false") {
                    for (let tab of tabs) {
                        if (tab.id !== newTab.id && tab.pinned === false) chrome.tabs.remove(tab.id);
                    } 
                }
            });
        });   
    }
    else if(action === "currentwin") {
        chrome.tabs.create({}, function(newTab){
            let querying = chrome.tabs.query({'currentWindow': true}, function(tabs){
                var cpt = localStorage.getItem('cpt') || "false";
                if (cpt === "true") {
                    for (let tab of tabs) {
                        if (tab.id !== newTab.id) chrome.tabs.remove(tab.id);
                    } 
                }
                if (cpt === "false") {
                    for (let tab of tabs) {
                        if (tab.id !== newTab.id && tab.pinned === false) chrome.tabs.remove(tab.id);
                    } 
                }
            });
        });
    }
    else if(action === "current") {
        let querying = chrome.tabs.query({}, function(tabs){
            var cpt = localStorage.getItem('cpt') || "false";
            if (cpt === "true") {
                for (let tab of tabs) {
                    if (tab.id !== thisTab.id) chrome.tabs.remove(tab.id);
                } 
            }
            if (cpt === "false") {
                for (let tab of tabs) {
                    if (tab.id !== thisTab.id && tab.pinned === false) chrome.tabs.remove(tab.id);
                } 
            }
        });
    }
    else if(action === "custom") {
        var customurl = localStorage.getItem("customurl") || "https://www.google.com/";
        chrome.tabs.create({url: customurl}, function(customTab){
            let querying = chrome.tabs.query({}, function(tabs){
                var cpt = localStorage.getItem('cpt') || "false";
                if (cpt === "true") {
                    for (let tab of tabs) {
                        if (tab.id !== customTab.id) chrome.tabs.remove(tab.id);
                    } 
                }
                if (cpt === "false") {
                    for (let tab of tabs) {
                        if (tab.id !== customTab.id && tab.pinned === false) chrome.tabs.remove(tab.id);
                    } 
                }
            });
        }); 
    } 
    else if(action === "otherwins") {
        chrome.windows.getAll(function(wins) {
            chrome.windows.getCurrent(function(thisWin){
                for(let win of wins) {
                    if(win.id !== thisWin.id) chrome.windows.remove(win.id);
                }
            });     
        });
    }
    else if(action === "exit") {
        let querying = chrome.tabs.query({}, function(tabs){           
            for (let tab of tabs) {
                chrome.tabs.remove(tab.id);
            }
        });
    }
    else if(action === "settings") {
        chrome.tabs.create({url: "options/options.html"});
    }
}

// toolbar button and keyboard shortcut
chrome.browserAction.onClicked.addListener(function(thisTab) {
    var action = localStorage.getItem("action") || "newtab";
    closeAllTabs(action, thisTab);
});


// context menu
const contextHandler = function(info, tab){
    closeAllTabs(info.menuItemId, tab);
}

chrome.contextMenus.onClicked.addListener(contextHandler);

// first run
chrome.runtime.onInstalled.addListener(function(details) {
    
    const titles = [{id: "newtab", title: "Close all tabs, and open a new tab page"}, {id: "current", title: "Close all tabs except the current tab"}, {id: "currentwin", title: "Close all tabs only in current window, and open a new tab"}, {id: "otherwins", title: "Close other windows"}, {id: "exit", title: "Close all tabs (including pinned tabs) and exit"}, {id: "custom", title: "Close all tabs, and open the set URL"}, {id: "settings", title: "Settings"}];
    
    for(let i=0; i< titles.length; i++) {
        chrome.contextMenus.create({
            "title": titles[i].title,
            "id": titles[i].id
        })
    }
    
    
    if (details.reason == "install") {
        chrome.tabs.create({"url": "https://browsernative.com/close-all-tabs-extension/"});
    }
});