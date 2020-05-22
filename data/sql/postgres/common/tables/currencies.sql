/**
 * currencies table
 */
create table if not exists currencies (
    id smallint not null,
    name varchar(20) not null,
    iso_3166_alpha_3 varchar(5) not null,
    iso_3166_numeric int not null,
    minor_unit smallint not null,
    constraint pk_currencies primary key (id),
    constraint u_currencies_1 unique (name)
);

insert into currencies (id, name) values 
(1, 'peso')
on conflict do nothing;