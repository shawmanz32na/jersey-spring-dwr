/**
 * The JavaScript Source for the /index.html file
 */
window.onload = function() {
	dwr.engine.setActiveReverseAjax(true);
	_getNewMessages();
	Chat.subscribe();
	
	// Create Event Handlers
	initialize();
};

function initialize() {
	document.getElementById("text").addEventListener("keypress", function(event) {
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
	ajax.onreadystatechange = function() {
        if (ajax.readyState != 4) return;
        if (ajax.status == 204) {
        	// If the POST was successful
        	dwr.util.setValue("text", "");
        }
    };
    ajax.send(json);
}

function onMessageReceived() {
	_getNewMessages();
}

function _getLatestChatMessageId() {
	var chatlog = document.getElementById("chatlog");
	var chatMessageListItems = chatlog.getElementsByTagName("li");
	if (chatMessageListItems.length > 0) {
		var chatMessageListItem =  chatMessageListItems.item(chatMessageListItems.length - 1);
		return chatMessageListItem.getAttribute("data-chat-id");
	} else {
		return null;
	}
}

function _getNewMessages() {
	// Find the most recent Chat message we have
	var latestChatMessageId = _getLatestChatMessageId();
	var sinceIdQueryParam = latestChatMessageId == null ? "" : "?since_id=" + latestChatMessageId;
	
	// Get any new messages from the Server
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "webapi/chat" + sinceIdQueryParam, true);
	ajax.onreadystatechange = function() {
		if (ajax.readyState != 4) return;
		if (ajax.status == 200) {
			var chatMessages = JSON.parse(ajax.responseText);
			_updateChatList(chatMessages);
		}
	};
	ajax.send();
}

function _updateChatList(newMessages) {
	var chatlog = document.getElementById("chatlog");
	if (newMessages instanceof Array) {
		for(var i = 0; i < newMessages.length; i++) {
			var chatMessage = newMessages[i];
			var messageListItem = document.createElement("li");
			messageListItem.setAttribute("data-chat-id", chatMessage.id);
			var messageText = chatMessage.username + ": " + chatMessage.text;
			messageListItem.appendChild(document.createTextNode(messageText));
			chatlog.appendChild(messageListItem);
		}
	}
}
