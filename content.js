chrome.runtime.onMessage.addListener(function(msg, sender) {
	if (msg == "save") {
		saveCurrentSubtitleItem();
	}

	if (msg == "list") {
		showSavedItems();
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

	console.log("Saving:" + stringifiedObj)
};

function showSavedItems() {

	console.log("SHOWING SAVED ITEMS");

	// filter our localStorage items
	var keys = Object.keys(localStorage).filter(key => key.startsWith("srs-saved"));

	keys.forEach(function(item) {
		console.log(localStorage.getItem(item));
	});

	// TODO make better = show in webpage
}