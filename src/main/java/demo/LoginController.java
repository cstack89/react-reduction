package demo;

import javax.annotation.PostConstruct;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginController {
	private static final Logger LOGGER = LogManager.getLogger(LoginController.class.getName());

	@PostConstruct
	public void init() {
	}
	
//	 @RequestMapping(value = "/{[path:[^\\.]*}")
	@GetMapping("/**/{path:[^\\.]*}")
	    public String redirect() {
		 LOGGER.log(Level.ERROR, "Forwarding");
	      return "forward:/index.html";
	    }

//	@RequestMapping("/**")
//	public String login() {
//		return "index.html";
//	}

//	@RequestMapping("/user")
//	@ResponseBody
//	public String getUser(Authentication auth) {
//		String ret = "{\"name\":\"" + auth.getName() + "\"}";
//
//		return ret;
//	}

}
