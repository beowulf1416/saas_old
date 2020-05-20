/**
 * client management
 */
create table if not exists clients (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'utc'),
    name varchar(200) not null,
    address text,
    url_name public.slug,
    constraint pk_clients primary key (id),
    constraint u_clients_1 unique (name),
    constraint u_clients_2 unique (url_name),
    constraint chk_clients_1 check (name <> '')
);

/** add default client **/
insert into clients (name, address, active, url_name) values 
('default', 'N/A', true, 'default')
on conflict do nothing;