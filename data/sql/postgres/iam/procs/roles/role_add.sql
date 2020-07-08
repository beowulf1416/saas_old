/**
 * add a role
 */
create or replace function role_add (
    p_client_id clients.clients.id%type,
    p_role_id iam.roles.id%type,
    p_role_name iam.roles.name%type
)
returns void
as $$
begin
    insert into iam.roles (
        client_id,
        id,
        name
    ) values (
        p_client_id,
        p_role_id,
        p_role_name
    );
end
$$
language plpgsql;