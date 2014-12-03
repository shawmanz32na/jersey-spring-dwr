package spikes.jsd.dwr;

import java.util.LinkedList;

import org.directwebremoting.Browser;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.annotations.ScriptScope;
import org.directwebremoting.ui.dwr.Util;

import spikes.jsd.model.ChatMessage;

@RemoteProxy(scope = ScriptScope.APPLICATION)
public class ChatOperations {
	
	private static final int MESSAGE_STORE_SIZE = 20;

	/**
	 * @param text
	 *            The new message text to add
	 */
	@RemoteMethod
	public void addMessage(String text) {
		// Get the current user out of the Spring Context
		
		
		
		// Make sure we have a list of the most recent messages
		if (text != null && text.trim().length() > 0) {
			messages.addFirst(new ChatMessage(null, text));
			while (messages.size() > MESSAGE_STORE_SIZE) {
				messages.removeLast();
			}
		}

		// Clear the input box in the browser that kicked off this page only
		Util.setValue("text", "");

		// For all the browsers on the current page:
		Browser.withCurrentPage(new Runnable() {
			public void run() {
				// Clear the list and add in the new set of messages
				Util.removeAllOptions("chatlog");
				Util.addOptions("chatlog", messages, "text");
			}
		});
	}

	/**
	 * The current set of messages.
	 */
	private final LinkedList<ChatMessage> messages = new LinkedList<ChatMessage>();
}