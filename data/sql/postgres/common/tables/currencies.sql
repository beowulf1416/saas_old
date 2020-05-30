/**
 * currencies table
 */
create table if not exists currencies (
    id serial not null,
    name varchar(100) not null,
    currency varchar(10),
    symbol varchar(5),
    constraint pk_currencies primary key (id),
    constraint u_currencies_1 unique (name)
);