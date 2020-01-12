package demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@EnableZuulProxy

//@EnableDiscoveryClient
@ComponentScan(basePackages = { "com.fledglingmaker", "demo" })
// @ComponentScan(basePackages = {"com.fledglingmaker","demo"},basePackageClasses = KeycloakSecurityComponents.class)

public class UiApplication  {

	public static void main(String[] args) {
		SpringApplication.run(UiApplication.class, args);
	}

	// @Configuration
	// @Order(-20)
	// protected static class LoginConfig extends WebSecurityConfigurerAdapter {

	
//
//	@Bean
//	public OAuth2RestOperations restTemplate(OAuth2ClientContext clientContext, OAuth2ProtectedResourceDetails resourceDetails) {
//		return new OAuth2RestTemplate(resourceDetails, clientContext);
//	}

	// }

}
