package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;

import java.util.Map;
import java.util.UUID;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.tomale.saas.base.models.User;
import com.tomale.saas.base.oauth.providers.Google;
import com.tomale.saas.base.store.UserStore;


@Controller
@RequestMapping("/security")
public class SecurityController {

    private final static Logger log = LogManager.getLogger(SecurityController.class);

    @Value("${openid.google.discovery.url}")
    private String openIdDiscoveryUrl;

    @Value("${oauth.google.client_id}")
    private String clientId;

    @Value("${oauth.google.secret}")
    private String clientSecret;

    @Value("${oauth.google.redirecturi}")
    private String redirectUri;

    @Value("${oauth.google.redirecturi.signup}")
    private String redirectUriGoogleSignup;

    @Autowired
    private UserStore userStore;

    @GetMapping("/signin")
    public ModelAndView userSignIn() {
        log.debug("VIEW: security.signin");
        
        ModelAndView mv = new ModelAndView("security/signin");
        mv.addObject("google_oauth_url", Google.getAuthorizationUrl(clientId, redirectUriGoogleSignup));

        return mv;
    }

    @GetMapping("/signout")
    public String userSignOut() {
        log.debug("VIEW: security.signout");

        return "security/signout";
    }

    @GetMapping("/signup")
    public ModelAndView userSignUp() {
        log.debug("VIEW: security.signup");

        ModelAndView mv = new ModelAndView("security/signup");
        mv.addObject("google_oauth_url", Google.getAuthorizationUrl(clientId, redirectUriGoogleSignup));

        return mv;
    }

    @GetMapping("/signin/google/oauth/redirect")
    public ResponseEntity<String> userSigninGoogleRedirect(
        @RequestParam String code
    ) {
        log.debug("VIEW: security.signin.google");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);

        try {
            Map<String, String> tokens = Google.getTokens(
                clientId,
                clientSecret,
                code,
                redirectUriGoogleSignup
            );

            JsonObject data = Google.getUserInfo(tokens.get("access_token"));
            JsonObject profile = data.getAsJsonObject("profile");
            log.debug(data);
            String email = profile.get("email").getAsString();

            User user = userStore.getUserByEmail(email);
            if (user.isActive()) {
                return new ResponseEntity<>(headers, HttpStatus.FOUND);
            } else {
                // user account is not active
                return new ResponseEntity<>(headers, HttpStatus.FOUND);    
            }
        } catch(Exception e) {
            log.error(e);
            return new ResponseEntity<>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/signup/google/oauth/redirect")
    public ResponseEntity<String> userSignupGoogleRedirect(
        @RequestParam String code
    ) {
        log.debug("VIEW: security.signup.google");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);

        try {
            Map<String, String> tokens = Google.getTokens(
                clientId,
                clientSecret,
                code,
                redirectUriGoogleSignup
            );
            // log.debug(tokens);

            JsonObject data = Google.getUserInfo(tokens.get("access_token"));
            JsonObject profile = data.getAsJsonObject("profile");
            log.debug(data);
            String email = profile.get("email").getAsString();
            User user = new User(
                UUID.randomUUID(), 
                profile.get("name").getAsString(),
                email
            );

            if (!userStore.userEmailExists(email)) {
                // user is already registered
                userStore.addUser(user, data);
            }
            // userStore.sign

            headers.add("Location", "/dashboard");
            
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        } catch(Exception e) {
            log.error(e);
            return new ResponseEntity<>(headers, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/oauth/redirect")
    public String userOAuthRedirect(@RequestParam String code) {
        log.debug("VIEW security.redirect");
        log.debug(String.format("code: %s", code));
        return "security/redirect";
    }
}