/**
 * retrieve all users associated with client
 */
create or replace function client_users_all (
    p_client_id clients.clients.id%type
)
returns table (
    id iam.users.id%type,
    active iam.users.active%type,
    email iam.users.email%type,
    name iam.users.name%type
)
as $$
begin
    return query
    select
        u.id,
        u.active,
        u.email,
        u.name
    from iam.users u
        inner join iam.user_clients uc on u.id = uc.user_id
    where uc.client_id = p_client_id;
end
$$ 
language plpgsql;