/**
 * return all clients associated to user
 */
create or replace function user_clients_all (
    p_user_id users.id%type
)
returns table (
    client_id clients.clients.id%type,
    client_name clients.clients.name%type
)
as $$
begin
    return query
    select
        distinct c.id,
        c.name
    from clients.clients c
        inner join iam.user_clients uc on c.id = uc.client_id
    where uc.user_id = p_user_id;
end;
$$
language plpgsql;