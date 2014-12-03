package spikes.jsd.model;

import org.directwebremoting.annotations.DataTransferObject;
import org.directwebremoting.annotations.RemoteProperty;

/**
 * A POJO that represents a typed chat message
 */
@DataTransferObject
public class ChatMessage {

	/**
	 * When the message was created
	 */
	private long id = System.currentTimeMillis();

	/**
	 * The username of the user that sent the message
	 */
	@RemoteProperty
	private String username;

	/**
	 * The text of the message
	 */
	@RemoteProperty
	private String text;

	/**
	 * Empty default constructor required for JAXB Serialization
	 */
	public ChatMessage() {
	}

	/**
	 * @param text
	 *            the new message text
	 */
	public ChatMessage(String username, String text) {
		this.username = username;

		if (text.length() > 256) {
			text = text.substring(0, 256);
		}

		this.text = text;
	}

	/**
	 * @return the message id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @return the username of the user that sent the message
	 */
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the message itself
	 */
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}
}