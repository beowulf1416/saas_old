create table if not exists countries (
    id int not null,
    name varchar(100) not null,
    iso_3166_1_alpha_2 varchar(5) not null,
    iso_3166_1_alpha_3 varchar(5) not null,
    iso_3166_1_numeric int not null,
    iso_4217_currency_alpha varchar(5) not null,
    iso_4217_currency_country_name varchar(100) not null,
    iso_4217_currency_minor_unit varchar(100) not null,
    iso_4217_currency_name varchar(100) not null,
    iso_4217_currency_numeric int not null,
    constraint pk_countries primary key (id),
    constraint u_countries unique (name)
);