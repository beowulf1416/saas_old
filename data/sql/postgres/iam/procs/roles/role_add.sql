/**
 * add a role
 */
create or replace function role_add (
    p_client_id clients.clients.id%type,
    p_role_name iam.roles.name%type
)
returns iam.roles.id%type
as $$
declare
    tmp_id iam.roles.id%type;
begin
    insert into iam.roles (
        client_id,
        name
    ) values (
        p_client_id,
        p_role_name
    )
    returning id into tmp_id;

    return tmp_id;
end
$$
language plpgsql;