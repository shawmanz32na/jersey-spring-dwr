/**
 * The JavaScript Source for the /index.html file
 */
window.onload = function() {
	dwr.engine.setActiveReverseAjax(true);
};

function sendMessage() {
	Chat.addMessage(dwr.util.getValue("text"));
}
