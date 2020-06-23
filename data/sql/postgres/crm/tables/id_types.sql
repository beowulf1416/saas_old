create table if not exists id_types (
    id int not null,
    name varchar(50) not null,
    constraint pk_id_types primary key (id),
    constraint u_id_types_1 unique (name)
);