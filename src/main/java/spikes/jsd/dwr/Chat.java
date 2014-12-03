package spikes.jsd.dwr;

import java.util.List;

import org.directwebremoting.Browser;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.ui.dwr.Util;

import spikes.jsd.model.ChatMessage;

/**
 * 
 * @author kevinshaw
 * 
 */
@RemoteProxy
public final class Chat {

	@RemoteMethod
	public static void subscribe() {
		ScriptSession scriptSession = WebContextFactory.get()
				.getScriptSession();
		scriptSession.setAttribute(
				SubscriptionFilter.SUBSCRIBED_SESSION_ATTRIBUTE, true);
	}

	@RemoteMethod
	public static void unsubscribe() {
		ScriptSession scriptSession = WebContextFactory.get()
				.getScriptSession();
		scriptSession
				.removeAttribute(SubscriptionFilter.SUBSCRIBED_SESSION_ATTRIBUTE);
	}

	public static void updateClients(final List<ChatMessage> chatMessages) {
		// For all the browsers on the current page:
		Browser.withAllSessionsFiltered(new SubscriptionFilter(), new Runnable() {
			public void run() {
				// Clear the list and add in the new set of messages
				Util.removeAllOptions("chatlog");
				Util.addOptions("chatlog", chatMessages, "text");
			}
		});
	}

}
