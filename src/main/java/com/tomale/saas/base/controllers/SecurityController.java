package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.google.gson.JsonObject;

import com.tomale.saas.base.models.User;
import com.tomale.saas.base.models.security.JWTUtil;
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

    @Value("${oauth.google.redirecturi.signin}")
    private String redirectUriGoogleSignin;

    @Value("${jwt.issuer}")
    private String jwtIssuer;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${app.cookie.name}")
    private String cookieName;

    @Value("${app.cookie.domain}")
    private String cookieDomain;

    @Value("${app.cookie.secure}")
    private boolean cookieSecure;

    @Value("${app.cookie.max_age}")
    private int cookieMaxAge;

    @Value("${app.cipher.key}")
    private String cipherKey;

    @Autowired
    private UserStore userStore;

    @GetMapping("/signin")
    public ModelAndView userSignIn() {
        log.debug("VIEW: security.signin");
        
        ModelAndView mv = new ModelAndView("security/signin");
        mv.addObject("google_oauth_url", Google.getAuthorizationUrl(clientId, redirectUriGoogleSignin));

        return mv;
    }

    @GetMapping("/signout")
    public String userSignOut() {
        log.debug("VIEW: security.signout");

        return "security/signout";
    }

    @GetMapping("/signin/google/oauth/redirect")
    public ModelAndView userSigninGoogleRedirect(
        HttpServletResponse response,
        @RequestParam String code
    ) {
        log.debug("VIEW: security.signin.google");

        // HttpHeaders headers = new HttpHeaders();
        // headers.add("Content-Type", MediaType.APPLICATION_JSON_VALUE);

        try {
            Map<String, String> tokens = Google.getTokens(
                clientId,
                clientSecret,
                code,
                redirectUriGoogleSignin
            );

            JsonObject data = Google.getUserInfo(tokens.get("access_token"));
            JsonObject profile = data.getAsJsonObject("profile");
            String email = profile.get("email").getAsString();
            String name = profile.get("name").getAsString();

            User user = userStore.getUserByEmail(email);
            if (user == null) {
                user = new User(name, email);
                userStore.addUser(
                    user, 
                    data
                );
            }

            if (user.isActive()) {
                // retrieve user permissions
                List<String> permissions = new ArrayList<String>();
                // dummy permissions
                permissions.add("security.default");
                permissions.add("security.signout");
                
                JWTUtil jwt = new JWTUtil(jwtIssuer, jwtSecret, cipherKey);
                String token = jwt.generateToken(user, permissions);

                Cookie cookie = new Cookie(cookieName, token);
                cookie.setDomain(cookieDomain);
                cookie.setSecure(cookieSecure);
                cookie.setHttpOnly(true);
                cookie.setPath("/");
                cookie.setMaxAge(cookieMaxAge);

                response.addCookie(cookie);

                ModelAndView mv = new ModelAndView("security/redirect");
                mv.addObject("token", token);

                return mv;
            } else {
                ModelAndView mv = new ModelAndView("security/user_account_inactive");

                return mv;
            }
        } catch(Exception e) {
            log.error(e);

            ModelAndView mv = new ModelAndView("security/user_account_inactive");
            mv.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);

            return mv;
        }
    }

    @GetMapping("/oauth/redirect")
    public String userOAuthRedirect(@RequestParam String code) {
        log.debug("VIEW security.redirect");
        log.debug(String.format("code: %s", code));
        return "security/redirect";
    }
}