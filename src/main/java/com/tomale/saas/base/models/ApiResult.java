package com.tomale.saas.base.models;

import lombok.Data;

@Data
public class ApiResult {

    private String status;
    private String message;
    private Object data;


    public ApiResult(String status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}