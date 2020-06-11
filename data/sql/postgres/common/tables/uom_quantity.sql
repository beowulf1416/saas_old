create table if not exists uom_quantity (
    id int not null,
    name varchar(30) not null,
    symbol varchar(10),
    constraint pk_uom_quantity primary key (id),
    constraint u_uom_quantity unique (name)
);