create table if not exists uom (
    id int not null,
    dimension_id int not null,
    name varchar(30) not null,
    symbol varchar(10),
    constraint pk_uom primary key (id),
    constraint fk_uom_1 foreign key (dimension_id)
        references common.dimensions (id) on delete restrict on update restrict
);