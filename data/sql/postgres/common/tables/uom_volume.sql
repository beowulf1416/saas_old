create table if not exists uom_volume (
    id int not null,
    name varchar(30) not null,
    constraint pk_uom_volume primary key (id),
    constraint u_uom_volume unique (name)
);