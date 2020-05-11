/**
 * items table
 */
create table if not exists items (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name text not null,
    description text not null,
    make varchar(100),
    brand varchar(100),
    model varchar(100),
    version varchar(100),
    sku varchar(100),
    upc varchar(100),
    length numeric(12,4),
    width numeric(12,4),
    height numeric(12,4),
    weight numeric(12,4),
    perishable boolean,
    hazardous boolean,
    constraint pk_items primary key (id),
    constraint u_items_1 unique (client_id, name),
    constraint fk_items_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);