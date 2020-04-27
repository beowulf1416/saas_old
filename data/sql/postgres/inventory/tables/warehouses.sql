/**
 * warehouses
 */
create table if not exists warehouses (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(100) not null,
    address text,
    constraint pk_warehouses primary key (id),
    constraint u_warehouses_1 unique (client_id, name),
    constraint fk_warehouses_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);