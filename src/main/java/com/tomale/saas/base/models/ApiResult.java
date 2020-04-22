package com.tomale.saas.base.models;

import com.google.gson.JsonObject;

import lombok.Data;

@Data
public class ApiResult {

    private String status;
    private String message;
    private JsonObject data;


    public ApiResult(String status, String message, JsonObject data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}