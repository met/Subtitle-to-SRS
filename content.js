chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg == "save") {
		saveCurrentSubtitleItem();
	}

	if (msg == "export") {
		exportItems();
	}
});

function saveCurrentSubtitleItem() {

	if (!document.querySelector("#lingo-main .lingo-subs")) {
		console.log("Language learning extension not found. Do you have extension installed? https://languagelearningwithnetflix.com/");
		return;
	}

	var originalSubText = document.querySelector("#lingo-main .lingo-subs").innerText;
	var machineTranslationSubText = document.querySelectorAll("#lingo-main .whole-title-translation")[0] ? document.querySelectorAll("#lingo-main .whole-title-translation")[0].innerText : "";
	var humanTranslationSubText = document.querySelectorAll("#lingo-main .whole-title-translation")[1] ? document.querySelectorAll("#lingo-main .whole-title-translation")[1].innerText : "";

	var url = document.location.href;
	var timestamp = new Date().getTime();

	var stringifiedObj = JSON.stringify(
			[
				originalSubText, machineTranslationSubText, humanTranslationSubText, url
			]
	);

	localStorage.setItem("srs-saved-" + timestamp, stringifiedObj);

	console.log("Saving:" + stringifiedObj);
};

function exportItems() {

	// look at local storage, find keys of every saved items and sort them 
	var keys = Object.keys(localStorage).filter(key => key.startsWith("srs-saved")).sort();

	if (keys.length == 0) {
		console.log("Export called by we have nothing for export. Export canceled.");
		return;
	}
	var tsvItems = [];

	keys.forEach(function(item) {
		// parse JSON item to JS array, transform that array into string with tabs separator,
		// and push result to new array
		tsvItems.push(JSON.parse(localStorage.getItem(item)).join("\t"));
	});

	var tsvExport = tsvItems.join("\n");

	window.open("data:text/tab-separated-values," + encodeURIComponent(tsvExport));
}