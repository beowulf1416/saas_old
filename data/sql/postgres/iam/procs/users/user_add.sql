/**
 * add user account
 */
create or replace function user_add (
    p_user_id iam.users.id%type,
    p_email iam.users.email%type,
    p_name iam.users.name%type
)
returns void
as $$
declare
    default_client_id clients.clients.id%type;
    default_role_id iam.roles.id%type;
begin
    insert into iam.users (
        id,
        email,
        name,
        active
    ) values (
        p_user_id,
        p_email,
        p_name,
        true
    );

    -- retrieve default client id
    select
        a.id into default_client_id
    from clients.clients a
    where a.name = 'default';

    -- add user to default client
    insert into iam.user_clients (
        user_id,
        client_id
    ) values (
        p_user_id,
        default_client_id
    )
    on conflict do nothing;

    -- retrieve 'everyone' role
    select
        a.id into default_role_id
    from iam.roles a
    where a.client_id = default_client_id
        and a.name = 'everyone';

    -- assign role to user
    perform * from iam.role_assign_user(default_client_id, default_role_id, p_user_id);
end
$$
language plpgsql;
