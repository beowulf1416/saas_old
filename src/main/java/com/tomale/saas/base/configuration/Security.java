package com.tomale.saas.base.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
public class Security extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/", "/security/**").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/security/signin")
                .permitAll()
                .and()
            .logout().permitAll();

        // http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        // http.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
    }
}