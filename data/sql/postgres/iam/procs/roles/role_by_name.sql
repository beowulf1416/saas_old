create or replace function role_by_name (
    p_client_id clients.clients.id%type,
    p_name iam.roles.name%type
)
returns iam.roles.id%type
as $$
declare
    t_role_id iam.roles.id%type;
begin
    select
        a.id into t_role_id
    from iam.roles a
    where a.client_id = p_client_id
        and a.name = p_name;

    return t_role_id;
end
$$
language plpgsql
stable;