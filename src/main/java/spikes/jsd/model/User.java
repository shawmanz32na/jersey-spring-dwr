package spikes.jsd.model;


/**
 * Super-temporary copy of the BRVT Hibernate User object. Will be used to test
 * the get/user/method
 * 
 * @author kevinshaw
 * 
 */
public class User {
	private String userName;
	
	public User() {} // Required for JAXB Serialization

	public User(String userName) {
		this.userName = userName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

}
