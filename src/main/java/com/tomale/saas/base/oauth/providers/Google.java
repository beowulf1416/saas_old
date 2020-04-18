package com.tomale.saas.base.oauth.providers;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeRequestUrl;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class Google {
    private final static Logger log = LogManager.getLogger(Google.class);

    private static final String URL_USER_PROFILE = "https://openidconnect.googleapis.com/v1/userinfo";

    private final static HttpTransport HTTP_TRANSPORT = new NetHttpTransport();
    private final static JsonFactory JSON_FACTORY = new JacksonFactory();

    public static String getAuthorizationUrl(String clientId, String redirectUri) {
        String url = new GoogleAuthorizationCodeRequestUrl(
                clientId, 
                redirectUri, 
                Arrays.asList(
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile",
                    "openid",
                    "profile",
                    "email"
                )
            )
            .build();
        return url;
    }

    public static Map<String, String> getTokens(
        String clientId,
        String clientSecret,
        String code,
        String redirectUri
        ) {
        HashMap<String, String> tokens = new HashMap<>();
        try {
            GoogleTokenResponse response = new GoogleAuthorizationCodeTokenRequest(
                    HTTP_TRANSPORT,
                    JSON_FACTORY,
                    clientId,
                    clientSecret,
                    code,
                    redirectUri
                )
                .execute();

            tokens.put("access_token", response.getAccessToken());
            tokens.put("refresh_token", response.getRefreshToken());
        } catch(Exception e) {
            log.error(e);
        }

        return tokens;
    }

    public static JsonObject getUserInfo(String accessToken) throws Exception {
        GenericUrl url = new GenericUrl(URL_USER_PROFILE);
        HttpRequest request = HTTP_TRANSPORT.createRequestFactory(new HttpRequestInitializer(){
                @Override
                public void initialize(HttpRequest request) throws IOException {
                    request.getHeaders().setAuthorization(String.format("Bearer %s", accessToken));
                }
            })
            .buildGetRequest(url);
        HttpResponse response = request.execute();
        String content = response.parseAsString();

        JsonObject result = new JsonObject();
        if (response.isSuccessStatusCode()) {
            result.add("profile", JsonParser.parseString(content));
            return result;
        } else {
            log.error(content);
            throw new Exception(content);
        }
    }
}