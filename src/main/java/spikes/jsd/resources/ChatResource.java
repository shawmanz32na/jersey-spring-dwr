package spikes.jsd.resources;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import spikes.jsd.dwr.Chat;
import spikes.jsd.model.ChatMessage;
import spikes.jsd.model.ChatMessageStore;

@Path("chat")
public class ChatResource {

	private Log log = LogFactory.getLog(this.getClass());

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ChatMessage> getAllMessages(@Context final SecurityContext securityContext, @QueryParam(value = "since_id") Long id) {
		log.debug("Entered getAllMessages");

		List<ChatMessage> chatMessages = new ArrayList<ChatMessage>();
		if (id != null) {
			log.debug("All messages after " + id + " requested");
			chatMessages = ChatMessageStore.getInstance().getAllChatMessagesAfter(id);
		} else {
			log.debug("All messages requested");
			chatMessages = ChatMessageStore.getInstance().getAllChatMessages();
		}

		log.debug("Leaving getAllMessages");
		return chatMessages;
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public ChatMessage getMessage(@PathParam("id") Long id) {
		return ChatMessageStore.getInstance().getChatMessage(id);
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public void createMessage(@Context final SecurityContext securityContext, ChatMessage chatMessage) {
		log.debug("Entered createMessage");

		String username = securityContext.getUserPrincipal().getName();
		log.debug("User determined to be " + username);
		// TODO: For now, we'll just add the username to the Chat message. Realistically, we should add a User object to the ChatMessage.
		// User user = new User(userName);
		chatMessage.setUsername(username);
		ChatMessageStore.getInstance().addChatMessage(chatMessage);

		Chat.onChatMessage();
		log.debug("Leaving createMessage");
	}

}
