/**
 * update permission active status
 */
create or replace function permission_set_active (
    p_permission_id iam.permissions.id%type,
    p_active iam.permission.active%type
)
returns void 
as $$
begin
    update iam.permissions set
        active = p_active
    where id = p_permission_id;
end
$$ language plpgsql;