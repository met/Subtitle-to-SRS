chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.sendMessage(tab.id, "save");

});

chrome.contextMenus.onClicked.addListener(function(info, tab) {

	if (info.menuItemId == "menu-save") {
		chrome.tabs.sendMessage(tab.id, "list");
	}

});

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create(
		{
			"id":    "menu-save",
			"title": "Show saved phrases",
			"contexts": ["page"]
		}
	);
});

// TODO menu for deleting