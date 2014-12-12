// Ensure the jsd namespace exists
var jsd = jsd || {};

/**
 * Utility class designed to keep track of asynchronous requests and their responses, especially useful when validating BattleRhythms and/or their Events
 * and/or their pre- and post-requisites. Once all the expected responses have been received, the class will call the given callback method with an array
 * containing all the response messages as the only parameter.
 * <br/>
 * To use: <br/>
 * (1) Instantiate a new asyncResponseAggregator with the method that you would like to call when all the responses have been received. <br/>
 * (2) Either:
 * 		(a) Set the number of expected responses via the setExpectedResponses() method
 * 		(b) Call the onRequestSent() method when sending each request.
 * (3) When any responses are received, call the onResponseReceived Method.
 * (4) Smile, because the class will call your callback method with all the received responses.
 * 
 * @class
 * @param {jsd.ResponseAggregator~ResponsesReceivedCallback} callback - the callback to call when all responses have been received
 */
jsd.ResponseAggregator = function(callback) {
	/**
	 * @member {Number}
	 */
	this._expectedResponses = 0;
	
	/**
	 * @member {Number}
	 */
	this._receivedResponses = 0;
	
	/**
	 * @member {Array.<Object>}
	 */
	this._aggregatedResponseMessages = [];
	
	/**
	 * @member {jsd.ResponseAggregator~ResponsesReceivedCallback}
	 */
	this._callback = (callback) ? callback : null; // TODO: Should we provide this as part of the constructor?
};

/**
 * Sets the callback to be called when all responses have been received
 * @param {jsd.ResponseAggregator~ResponsesReceivedCallback} callback
 */
jsd.ResponseAggregator.prototype.setCallback = function(callback) {
	if (callback) {
		this._callback = callback;
	}
};

/**
 * Sets the number of expected responses the ResponseAggregator should receive.
 * @param {Number} expectedResponses
 */
jsd.ResponseAggregator.prototype.setExpectedResponses = function(expectedResponses) {
	this._expectedResponses = expectedResponses;
	
	// If no responses are expected (and a callback exists), just fire the callback
	if (this._expectedResponses == 0 && this._callback) {
		this._callback(this._aggregatedResponseMessages);
	}
};

/**
 * If the number of expected responses was not set explicitly by {@link jsd.ResponseAggregator#setExpectedResponses}, this method should be called on each sent request.
 */
jsd.ResponseAggregator.prototype.onRequestSent = function() {
	this._expectedResponses++;
};

/**
 * To be called when a response is received.
 * @param {(Array.<Object>|Object)} response - the response text(s) or contained object(s)
 */
jsd.ResponseAggregator.prototype.onResponseReceived = function(response) {
	if (response) {
		if (response instanceof Array) {
			// Merge the given Array with the receivedResponses Array
			for (var i = 0; i < response.length; i++) {
				this._aggregatedResponseMessages.push(response[i]);
			}
		} else {
			// Push the response onto the response array
			this._aggregatedResponseMessages.push(response);
		}
	}
	
	this._receivedResponses++;
	
	// If we've received all the expected responses, fire the callback
	if ((this._receivedResponses >= this._expectedResponses) && this._callback) {
		this._callback(this._aggregatedResponseMessages);
	}
};

/**
 * Callback for when the {@link jsd.ResponseAggregator} has received and aggregated all results
 * @callback jsd.ResponseAggregator~ResponsesReceivedCallback
 * @param {Array.<Object>} responses
 */