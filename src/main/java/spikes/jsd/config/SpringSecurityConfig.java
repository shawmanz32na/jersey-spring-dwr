package spikes.jsd.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.inMemoryAuthentication()
		.withUser("admin").password("password").roles("USER", "ADMIN").and()
		.withUser("user").password("password").roles("USER").and()
		.withUser("kshaw").password("password").roles("USER").and()
		.withUser("rwhiteside").password("password").roles("USER").and()
		.withUser("jadams").password("password").roles("USER").and()
		.withUser("svolchenok").password("password").roles("USER");
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests().anyRequest().authenticated().and()
			.formLogin().and()
			.csrf().disable();
	}
}
