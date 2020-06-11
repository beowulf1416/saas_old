create table if not exists uom_area (
    id int not null,
    name varchar(30) not null,
    symbol varchar(10),
    constraint pk_uom_area primary key (id),
    constraint u_uom_area unique (name)
);