package spikes.jsd.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public final class ChatMessageStore {

	private static ChatMessageStore instance = null;

	private List<ChatMessage> chatMessages;

	private ChatMessageStore() {
		chatMessages = Collections.synchronizedList(new ArrayList<ChatMessage>());
	}

	public static ChatMessageStore getInstance() {
		if (instance == null) {
			instance = new ChatMessageStore();
		}
		return instance;
	}

	public List<ChatMessage> getAllChatMessages() {
		synchronized (chatMessages) {
			return new ArrayList<ChatMessage>(chatMessages);
		}
	}

	public ChatMessage getChatMessage(Long id) {
		// TODO: Is there a smarter way to do this?
		ChatMessage chatMessage = null;

		// Validate input
		if (id == null) {
			return chatMessage;
		}

		synchronized (chatMessages) {
			for (ChatMessage currentChatMessage : chatMessages) {
				if (id.equals(currentChatMessage.getId())) {
					chatMessage = currentChatMessage;
				}
			}
		}

		return chatMessage;
	}

	public void addChatMessage(ChatMessage chatMessage) {
		chatMessages.add(chatMessage);
	}

}
