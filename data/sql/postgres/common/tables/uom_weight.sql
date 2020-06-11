create table if not exists uom_weight (
    id int not null,
    name varchar(30) not null,
    symbol varchar(10),
    constraint pk_uom_weight primary key (id),
    constraint u_uom_weight unique (name)
);