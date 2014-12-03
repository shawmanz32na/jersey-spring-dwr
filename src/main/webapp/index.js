/**
 * The JavaScript Source for the /index.html file
 */
window.onload = function() {
	dwr.engine.setActiveReverseAjax(true);
	// TODO: Load any existing messages
	Chat.subscribe();
	
	// Create Event Handlers
	initialize();
};

function initialize() {
	document.getElementById("text").addEventListener("onkeypress", function(event) {
		dwr.util.onReturn(event, sendMessage);
	});
	document.getElementById("sendButton").addEventListener("click", function() {
		sendMessage();
	});
}

function sendMessage() {
	var chatMessage = {};
	chatMessage.text = dwr.util.getValue("text");
	
	var json = JSON.stringify(chatMessage);
	
	var ajax = new XMLHttpRequest();
	ajax.open("POST", "webapi/chat", true);
	ajax.setRequestHeader('Content-type','application/json; charset=utf-8');
	ajax.onreadystatechange = function(){
        if (ajax.readyState != 4) return;
        if (ajax.status == 204) {
        	// If the POST was successful
        	dwr.util.setValue("text", "");
        }
    };
    ajax.send(json);
}
