/**
 * attributes table
 */
create table if not exists attributes (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp without time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name varchar(100) not null,
    constraint pk_attributes primary key (id),
    constraint u_attributes_1 unique (client_id, name),
    constraint fk_attributes_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update  restrict
);