package spikes.jsd.config;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import spikes.jsd.resources.TestResource;

@ApplicationPath("webapi")
public class JerseyApplication extends Application {
	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> classes = new HashSet<Class<?>>();
		classes.add(TestResource.class);
		return classes;
	}
}
