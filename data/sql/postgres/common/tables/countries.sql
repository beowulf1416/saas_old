create table if not exists countries (
    name varchar(100) not null,
    iso_3166_1_alpha_2 varchar(5) not null,
    iso_3166_1_alpha_3 varchar(5) not null,
    iso_3166_1_numeric int not null,
    iso_4217_currency_alpha varchar(10),
    iso_4217_currency_country_name varchar(100),
    iso_4217_currency_minor_unit varchar(100),
    iso_4217_currency_name varchar(100),
    iso_4217_currency_numeric int,
    constraint pk_countries primary key (iso_3166_1_numeric),
    constraint u_countries_1 unique (name),
    constraint u_countries_2 unique (iso_3166_1_alpha_2),
    constraint u_countries_3 unique (iso_3166_1_alpha_3)
);