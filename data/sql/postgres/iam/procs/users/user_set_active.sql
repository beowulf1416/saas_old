/**
 * update user active status
 */
create or replace function user_set_active (
    p_user_id iam.users.id%type,
    p_active iam.users.active%type
)
returns void
as $$
begin
    update iam.users set
        active = p_active
    where id = p_user_id;
end
$$ language plpgsql;