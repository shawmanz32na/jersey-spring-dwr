package spikes.jsd.config;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.glassfish.jersey.message.internal.TracingLogger.Level;
import org.glassfish.jersey.server.ServerProperties;
import org.glassfish.jersey.server.TracingConfig;

import spikes.jsd.resources.ChatResource;
import spikes.jsd.resources.TestResource;
import spikes.jsd.resources.UserResource;

@ApplicationPath("webapi")
public class JerseyApplication extends Application {
	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new HashSet<Class<?>>();
		classes.add(ChatResource.class);
		classes.add(TestResource.class);
		classes.add(UserResource.class);
		//classes.add(LoggingFilter.class);
		return classes;
	}
	
	@Override
	public Map<String, Object> getProperties() {
		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put(ServerProperties.TRACING, TracingConfig.ON_DEMAND.toString());
		properties.put(ServerProperties.TRACING_THRESHOLD, Level.VERBOSE.toString());
		return properties;
	}
}
