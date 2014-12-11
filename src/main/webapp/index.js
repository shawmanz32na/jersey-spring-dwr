/**
 * The JavaScript Source for the /index.html file
 */
window.onload = function() {
	dwr.engine.setActiveReverseAjax(true);
	_displayNewMessages();
	Chat.subscribe();

	// Create Event Handlers
	_initialize();
};

/**
 * Creates Event Handlers
 */
function _initialize() {
	document.getElementById("text").addEventListener("keypress",
			function(event) {
				dwr.util.onReturn(event, sendMessage);
			});
	document.getElementById("sendButton").addEventListener("click", function() {
		sendMessage();
	});
}

/**
 * Sends the text in the message text box as a Chat Message to the server
 */
function sendMessage() {
	var chatMessage = {};
	chatMessage.text = dwr.util.getValue("text");

	var json = JSON.stringify(chatMessage);

	var ajax = new XMLHttpRequest();
	ajax.open("POST", "webapi/chat", true);
	ajax.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	ajax.onreadystatechange = function() {
		if (ajax.readyState != 4)
			return;
		if (ajax.status == 204) {
			// If the POST was successful
			dwr.util.setValue("text", "");
		}
	};
	ajax.send(json);
}

/**
 * Called when a new Chat Message has been received by the Server.
 */
function onMessageReceived() {
	_displayNewMessages();
}

function _displayNewMessages() {
	var latestChatMessageId = _getLatestChatMessageId();
	jsd.ChatMessageUtils.requestNewChatMessageIds(latestChatMessageId, _onNewChatMessageIdsResponse);
}

/**
 * Gets the Chat Message ID of the most recent Chat Message displayed on the Screen
 * @returns the most recent Chat Message ID, or null if no Chat Messages are being displayed
 */
function _getLatestChatMessageId() {
	var chatlog = document.getElementById("chatlog");
	var chatMessageListItems = chatlog.getElementsByTagName("li");
	if (chatMessageListItems.length > 0) {
		var chatMessageListItem = chatMessageListItems.item(chatMessageListItems.length - 1);
		return chatMessageListItem.getAttribute("data-chat-id");
	} else {
		return null;
	}
}

/**
 * @param {Array.<Number>} newChatMessageIds - The Ids of the new ChatMessages available on the server
 */
function _onNewChatMessageIdsResponse(newChatMessageIds) {
	for (var i = 0; i < newChatMessageIds.length; i++) {
		var newChatMessageId = newChatMessageIds[i];
		jsd.ChatMessageUtils.requestChatMessage(newChatMessageId, _onChatMessageResponse);
	}
}

/**
 * @param {jsd.ChatMessage} chatMessage
 */
function _onChatMessageResponse(chatMessage) {
	// Add the new ChatMessage to the display
	_updateChatList(chatMessage);
}

function _updateChatList(chatMessage) {
	var chatlog = document.getElementById("chatlog");
	var messageListItem = document.createElement("li");
	messageListItem.setAttribute("data-chat-id", chatMessage.id);
	var messageText = chatMessage.username + ": " + chatMessage.text;
	messageListItem.appendChild(document.createTextNode(messageText));
	// TODO: Insert the new ChatMessage in order
	chatlog.appendChild(messageListItem);
}
