package spikes.jsd.dwr;

import java.util.LinkedList;

import org.directwebremoting.Browser;
import org.directwebremoting.annotations.RemoteMethod;
import org.directwebremoting.annotations.RemoteProxy;
import org.directwebremoting.ui.dwr.Util;

@RemoteProxy
public class Chat {

    /**
     * @param text The new message text to add
     */
	@RemoteMethod
    public void addMessage(String text)
    {
        // Make sure we have a list of the list 10 messages
        if (text != null && text.trim().length() > 0)
        {
            messages.addFirst(new ChatMessage(text));
            while (messages.size() > 10)
            {
                messages.removeLast();
            }
        }

        // Clear the input box in the browser that kicked off this page only
        Util.setValue("text", "");

        // For all the browsers on the current page:
        Browser.withCurrentPage(new Runnable()
        {
            public void run()
            {
                // Clear the list and add in the new set of messages
                Util.removeAllOptions("chatlog");
                Util.addOptions("chatlog", messages, "text");
            }
        });
    }

    /**
     * The current set of messages
     */
    private final LinkedList<ChatMessage> messages = new LinkedList<ChatMessage>();
}