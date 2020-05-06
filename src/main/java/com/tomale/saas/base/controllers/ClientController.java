package com.tomale.saas.base.controllers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import com.tomale.saas.base.models.User;
import com.tomale.saas.base.models.security.JWTAuthenticationToken;
import com.tomale.saas.base.models.security.JWTUtil;
import com.tomale.saas.base.store.ClientStore;
import com.tomale.saas.base.store.PermissionStore;

import java.util.List;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.tomale.saas.base.models.Client;
import com.tomale.saas.base.models.SessionUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller 
@RequestMapping(
    path = "/client",
    produces = MediaType.TEXT_PLAIN_VALUE
)
public class ClientController {

    private final static Logger log = LogManager.getLogger(ClientController.class);

    @Autowired
    private PermissionStore permissionStore;

    @Autowired
    private ClientStore clientStore;

    @Autowired
    private SessionUtil sessionUtil;

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

    @GetMapping("")
    @PreAuthorize("hasAuthority('user.authenticated')")
    public ModelAndView viewDefault() {
        ModelAndView mv = new ModelAndView("client/default");

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object o = auth.getPrincipal();
        if (o instanceof User) {
            User user = (User) o;
            List<Client> clients = user.getClients();
            mv.addObject("clients", clients);
        }

        return mv;
    }

    @GetMapping("/select")
    @PreAuthorize("hasAuthority('user.authenticated')")
    public ModelAndView viewSelect(
        HttpServletResponse response,
        @RequestParam String client
    ) {
        log.debug(client);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth instanceof JWTAuthenticationToken) {
            User user = (User) auth.getPrincipal();

            try {
                Client userClient = clientStore.get(UUID.fromString(client));
                List<Client> clients = user.getClients();
                List<String> permissions = permissionStore.userPermissions(
                    user.getId(), 
                    UUID.fromString(client)
                );

                Cookie cookie = sessionUtil.generateCookie(user, permissions, userClient, clients);

                response.addCookie(cookie);

                ModelAndView mv = new ModelAndView("security/redirect");

                return mv;
                
            } catch(Exception e) {
                log.error(e);

                throw new RuntimeException("An error occured while trying to process request");
            }
        } else {
            log.error("error with security context");
            throw new RuntimeException("An error occured while trying to process request");
        }
    }
}