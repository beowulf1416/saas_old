/**
 * role management
 */
create table if not exists roles (
    id uuid not null default public.gen_random_uuid(),
    active boolean not null default false,
    created_ts timestamp with time zone not null default(now() at time zone 'UTC'),
    client_id uuid not null,
    name varchar(200) not null,
    constraint pk_roles primary key (id),
    constraint u_roles_1 unique (client_id, name),
    constraint fk_roles_1 foreign key (client_id)
        references clients.clients (id) on delete restrict on update restrict
);


do $$
declare
    default_client_id clients.clients.id%type;
begin
    select
        a.id into default_client_id
    from clients.clients a
    where a.name = 'default';

    insert into roles (client_id, name) values 
    (default_client_id, 'system administrator');
end
$$
language plpgsql;