package spikes.jsd.config;

import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;

@SuppressWarnings("serial")
@WebServlet(name = "DwrServlet", displayName = "DWR Servlet", description = "Direct Web Remoting Servlet", urlPatterns = { "/dwr/*" }, initParams = {
		@WebInitParam(name = "classes", value = "spikes.jsd.dwr.Chat,spikes.jsd.model.ChatMessage"),
		@WebInitParam(name = "activeReverseAjaxEnabled", value = "true"),
		@WebInitParam(name = "initApplicationScopeCreatorsAtStartup", value = "true") }, asyncSupported = true, loadOnStartup = 1)
public class DwrServlet extends org.directwebremoting.servlet.DwrServlet {
}
