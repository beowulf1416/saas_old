package com.tomale.saas.base.models.security;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class CipherUtil {

    private static final Logger log = LogManager.getLogger(CipherUtil.class);

    private String key;
    private byte[] bKey;
    private SecretKeySpec keySpec;
    

    public CipherUtil(String key) {
        this.key = key;
    }

    private void setKey(String key) {
        try {
            this.bKey = this.key.getBytes("UTF-8");
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            bKey = Arrays.copyOf(digest.digest(this.bKey), 16);
            keySpec = new SecretKeySpec(bKey, "AES");
        } catch(UnsupportedEncodingException e) {
            log.error(e);
        } catch(NoSuchAlgorithmException e) {
            log.error(e);
        }
    }

    public String encrypt(String plaintext) {
        try {
            setKey(key);
            Cipher c = Cipher.getInstance("AES/ECB/PKCS5Padding");
            c.init(Cipher.ENCRYPT_MODE, keySpec);
            return Base64.getEncoder().encodeToString(c.doFinal(
                plaintext.getBytes("UTF-8")
            ));
        } catch(Exception e) {
            log.error(e);
        }
        return null;
    }

    public String decrypt(String cipherText) {
        try {
            setKey(key);
            Cipher c = Cipher.getInstance("AES/ECB/PKCS5Padding");
            c.init(Cipher.DECRYPT_MODE, keySpec);
            return new String(c.doFinal(Base64.getDecoder().decode(cipherText)));
        } catch(Exception e) {
            log.error(e);
        }
        return null;
    }
}