create or replace function client_user_set_active (
    p_client_id clients.clients.id%type,
    p_user_id iam.users.id%type,
    p_active iam.user_clients.active%type
)
returns void
as $$
begin
    update iam.user_clients set
        active = p_active
    where client_id = p_client_id
        and user_id = p_user_id;
end
$$
language plpgsql;