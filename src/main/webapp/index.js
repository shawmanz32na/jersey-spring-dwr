/**
 * The JavaScript Source for the /index.html file
 */

// public variables (gasp)
var chatMessageResponseAggregator;

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
	// TODO: Show an overlay that we're busy loading messages
	_displayNewMessages();
}

function _displayNewMessages() {
	// Providing 'null' will get us the Ids of all ChatMessages
	jsd.ChatMessageUtils.requestNewChatMessageIds(null, _onNewChatMessageIdsResponse);
}

/**
 * @param {Array.<Number>} newChatMessageIds - The Ids of the new ChatMessages available on the server
 */
function _onNewChatMessageIdsResponse(newChatMessageIds) {
	// We want to capture all Responses before displaying any of them... This is a fancy way to keep them in order. ;-)
	chatMessageResponseAggregator = new jsd.ResponseAggregator();
	chatMessageResponseAggregator.setCallback(_onChatMessagesReceived);
	chatMessageResponseAggregator.setExpectedResponses(newChatMessageIds.length);
	for (var i = 0; i < newChatMessageIds.length; i++) {
		var newChatMessageId = newChatMessageIds[i];
		// Should we implement some sort of response aggregation to make sorting easier, then display all at once? It would be faster overall, but longer until the first update starts showing up...
		jsd.ChatMessageUtils.requestChatMessage(newChatMessageId, _onChatMessageResponse);
	}
}

/**
 * @param {jsd.ChatMessage} chatMessage
 */
function _onChatMessageResponse(chatMessage) {
	chatMessageResponseAggregator.onResponseReceived(chatMessage);
}

/**
 * @param {Array.<jsd.ChatMessage>} chatMessages
 */
function _onChatMessagesReceived(chatMessages) {
	// Sort them messages by Id
	chatMessages.sort(function(a,b) {
		return a.id - b.id;
	});
	_updateChatList(chatMessages);
}

function _updateChatList(chatMessages) {
	var chatlog = document.getElementById("chatlog");
	// Clear all existing ChatMessages
	while (chatlog.firstChild) {
		chatlog.removeChild(chatlog.firstChild);
	}
	// Add all the ChatMessages
	for (var i = 0; i < chatMessages.length; i++) {
		var chatMessage = chatMessages[i];
		var messageListItem = document.createElement("li");
		messageListItem.setAttribute("data-chat-id", chatMessage.id);
		var messageText = chatMessage.username + ": " + chatMessage.text;
		messageListItem.appendChild(document.createTextNode(messageText));
		chatlog.appendChild(messageListItem);
	}
}
