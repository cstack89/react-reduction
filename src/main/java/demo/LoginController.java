package demo;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
 

@Controller
public class LoginController {
	private static final Logger	LOGGER			= LogManager.getLogger(LoginController.class.getName());
	
 

	@PostConstruct
	public void init() {
	}

	@RequestMapping("/pictureframe")
	public String login() { 
		return "index.html";
	}

//	@RequestMapping("/user")
//	@ResponseBody
//	public String getUser(Authentication auth) {
//		String ret = "{\"name\":\"" + auth.getName() + "\"}";
//
//		return ret;
//	}

}
