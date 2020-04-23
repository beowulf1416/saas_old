package com.tomale.saas.base.models;

import lombok.Data;

@Data
public class ApiResult {

    private String status;
    private String message;
    private String json;


    public ApiResult(String status, String message, String json) {
        this.status = status;
        this.message = message;
        this.json = json;
    }
}