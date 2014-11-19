package spikes.jsd.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.SecurityContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import spikes.jsd.model.User;

@Path("user")
public class UserResource {
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@GET
	@Path("me")
	@Produces(MediaType.APPLICATION_JSON)
	public User getCurrentUser(@Context final SecurityContext securityContext) {
		log.debug("Entered getCurrentUser");
		
		String userName = securityContext.getUserPrincipal().getName();
		log.debug("User determined to be " + userName);
		// TODO: For now, we'll just create a new User object. We can figure out how to retrieve an existing User object later.
		User user = new User(userName);
		log.debug("Leaving getCurrentUser");
		return user;
	}
	
	
}
