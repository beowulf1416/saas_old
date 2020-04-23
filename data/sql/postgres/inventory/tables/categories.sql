/**
 * inventory categories
 */
create table if not exists categories (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    client_id uuid not null,
    name text not null,
    constraint pk_categories primary key (id),
    constraint u_categories_1 unique (client_id, name),
    constraint fk_categories_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);