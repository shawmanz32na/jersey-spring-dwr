package spikes.jsd.dwr;

import org.directwebremoting.ScriptSession;
import org.directwebremoting.ScriptSessionFilter;

/**
 * DWR ScriptSessionFilter that matches only sessions that have been marked as
 * "subscribed"
 * 
 * @author kevinshaw
 */
public class SubscriptionFilter implements ScriptSessionFilter {

	public static final String SUBSCRIBED_SESSION_ATTRIBUTE = "subscribed";

	@Override
	public boolean match(final ScriptSession session) {
		Object sessionAttribute = session
				.getAttribute(SUBSCRIBED_SESSION_ATTRIBUTE);
		boolean isSubscribed = false;
		if (sessionAttribute != null) {
			if (sessionAttribute.equals(true)) {
				isSubscribed = true;
			}
		}

		return isSubscribed;
	}

}
