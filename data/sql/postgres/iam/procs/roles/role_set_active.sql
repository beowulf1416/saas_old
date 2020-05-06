/**
 * sets a role as active or inactive
 */
create or replace function role_set_active (
    p_role_id iam.roles.id%type,
    p_active iam.roles.active%type
)
returns void
as $$
begin
    update iam.roles set 
        active = p_active
    where id = p_role_id;
end
$$ language plpgsql;