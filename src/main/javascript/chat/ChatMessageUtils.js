// @namespace jsd
var jsd = jsd || {};

/**
 * @class
 * @static
 */
jsd.ChatMessageUtils = {
		/**
		 * Gets a list of ids for all ChatMessages sent after the provided ChatMessageId
		 * @public
		 * @param {Number} latestChatMessageId
		 * @param {jsd.ChatMessageUtils~NewChatMessageIdsCallback} callback
		 */
		requestNewChatMessageIds : function(latestChatMessageId, callback) {
			// We request all the new Chat Messages from the server, and then parse out the Ids from the Messages themselves. We want to make the network busy, so this
			// allows us to request all the Chat Messages again separately.
			var sinceIdQueryParam = latestChatMessageId == null ? "" : "?since_id=" + latestChatMessageId;
			var ajax = new XMLHttpRequest();
			ajax.open("GET", "webapi/chat" + sinceIdQueryParam, true);
			ajax.onreadystatechange = function() {
				if (ajax.readyState != 4)
					return;
				if (ajax.status == 200) {
					// TODO: Do we need to do some special Javascript scoping here?
					jsd.ChatMessageUtils._onNewChatMessageIdsResponse(ajax.responseText, callback);
				}
			};
			ajax.send();
		},
		
		/**
		 * Parses the newChatMessageIds response and calls the given newChatMessageIdsCallback
		 * @private
		 * @param {String} response - the AJAX response text
		 * @param {jsd.ChatMessageUtils~NewChatMessageIdsCallback} callback
		 */
		_onNewChatMessageIdsResponse : function(response, callback) {
			var chatMessages = JSON.parse(response);
			// Parse the Ids from the returned ChatMessages (Yes, I know this is absurd, but we're trying to make the network busy with this application.
			var newChatMessageIds = [];
			if (chatMessages instanceof Array) {
				for(var i = 0; i < chatMessages.length; i++) {
					var chatMessageId = chatMessages[i].id;
					if (chatMessageId != null) {
						newChatMessageIds.push(chatMessageId);
					}
				}
			}
			
			// Make the callback
			callback(newChatMessageIds);
		},
		
		/**
		 * Callback for @link{jsd.ChatMessageUtils~requestNewChatMessageIds}
		 * @public
		 * @callback jsd.ChatMessageUtils~NewChatMessagIdsCallback
		 * @param {Array.<Number>} newChatMessageIds
		 */
		
		/**
		 * Gets a @link{jsd.ChatMessage} from the server
		 * @public
		 * @param {Number} chatMessageId - the Id
		 * @param {jsd.ChatMessageUtils~ChatMessageCallback} callback
		 */
		requestChatMessage : function(chatMessageId, callback) {
			var ajax = new XMLHttpRequest();
			ajax.open("GET", "webapi/chat/" + chatMessageId, true);
			ajax.onreadystatechange = function() {
				if (ajax.readyState != 4)
					return;
				if (ajax.status == 200) {
					// TODO: Do we need to do some special Javascript scoping here?
					jsd.ChatMessageUtils._onChatMessageResponse(ajax.responseText, callback);
				}
			};
			ajax.send();
		},
		
		/**
		 * Pareses the ChatMessage response and calls the given jsd.ChatMessageUtils~ChatMessageCallback
		 * @param {String} response - The AJAX response text
		 * @param {jsd.ChatMessageUtils~ChatMessageCallback} callback
		 */
		_onChatMessageResponse : function(response, callback) {
			var chatMessage = JSON.parse(response);
			callback(chatMessage);
		}
		
		/**
		 * Callback for @link{jsd.ChatMessageUtils~requestChatMessage}
		 * @public
		 * @callback jsd.ChatMessageUtils~ChatMessageCallback
		 * @param {jsd.ChatMessage} chatMessage
		 */
};
