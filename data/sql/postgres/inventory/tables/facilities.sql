create table if not exists facilities (
    id uuid not null,
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(100) not null,
    description text,
    address text,
    area decimal(10,3),
    area_uom_id int,
    constraint pk_facilities primary key (client_id, id),
    constraint u_facilities_1 unique (client_id, name),
    constraint fk_facilities_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict,
    constraint fk_facilities_2 foreign key (area_uom_id)
        references common.uom_area (id) on delete restrict on update restrict
);