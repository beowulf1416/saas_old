package com.tomale.saas.base.models;

import lombok.Data;


@Data
public class IdValue {

    private String id;
    private String value;

    public IdValue(String id, String value) {
        this.id = id;
        this.value = value;
    }
}