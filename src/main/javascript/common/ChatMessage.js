// Ensure the jsd namespace exists
var jsd = jsd || {};

/**
 * Creates a new ChatMessage
 * @class
 */
jsd.ChatMessage = function() {
	// @member {Number}
	this.id = null;
	// @member {String}
	this.username = null;
	// @member {String}
	this.text = null;
};

