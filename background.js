chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.sendMessage(tab.id, "save");

});


chrome.commands.onCommand.addListener(function(command) {
	var tabid = null;

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		if (tabs && tabs[0] && tabs[0].id) {
			tabid = tabs[0].id;
		}

		// TODO rewrite to promises?
		if (tabid == null) {
			console.error("Cannot detect active tab id. Command cancelled.")
			return;
		}

		if (command == "save-item") {
			chrome.tabs.sendMessage(tabid, "save");
		}

		if (command == "export") {
			chrome.tabs.sendMessage(tabid, "export");
		}
	});	
});


chrome.contextMenus.onClicked.addListener(function(info, tab) {

	if (info.menuItemId == "menu-export") {
		chrome.tabs.sendMessage(tab.id, "export");
	}

});


chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create(
		{
			"id":    "menu-export",
			"title": "Export saved phrases",
			"contexts": ["page"]
		}
	);
});

// TODO UI for deleting/cleaning
// TODO UI for preview of saved items