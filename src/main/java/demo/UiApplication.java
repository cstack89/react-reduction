package demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.resource.OAuth2ProtectedResourceDetails;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@SpringBootApplication
@EnableZuulProxy
@EnableOAuth2Sso
@EnableDiscoveryClient
@ComponentScan(basePackages = { "com.fledglingmaker", "demo" })
// @ComponentScan(basePackages = {"com.fledglingmaker","demo"},basePackageClasses = KeycloakSecurityComponents.class)

public class UiApplication extends WebSecurityConfigurerAdapter {

	public static void main(String[] args) {
		SpringApplication.run(UiApplication.class, args);
	}

	// @Configuration
	// @Order(-20)
	// protected static class LoginConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// @formatter:off
	        http
	        .logout().logoutSuccessUrl("/logout").and() 
	            .authorizeRequests()
	                .antMatchers("/*.png","/*.js.*", "/login", "/static/**","/img/**").permitAll() //"/",
	                .anyRequest().authenticated()
	                .and()
	            .csrf()
	                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
	                ;
	            // @formatter:on
	}
//
//	@Bean
//	public OAuth2RestOperations restTemplate(OAuth2ClientContext clientContext, OAuth2ProtectedResourceDetails resourceDetails) {
//		return new OAuth2RestTemplate(resourceDetails, clientContext);
//	}

	// }

}
