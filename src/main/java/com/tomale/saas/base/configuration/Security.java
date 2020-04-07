package com.tomale.saas.base.configuration;

import com.tomale.saas.base.models.security.JWTAuthenticationEntryPoint;
import com.tomale.saas.base.models.security.JWTRequestFilter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {

    @Autowired
    private JWTAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    private JWTRequestFilter filter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/", "/security/**").permitAll()
                .anyRequest().authenticated();
                // .and()
            // .formLogin()
            //     .loginPage("/security/signin")
            //     .permitAll()
            //     .and()
            // .logout().permitAll();

        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
    }
}