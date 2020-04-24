/**
 * retrieve all permissions
 */
create or replace permissions_all ()
returns table (
    id iam.permissions.id%type,
    active iam.permissions.active%type,
    name iam.permissions.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.name
    from iam.permissions a;
end
$$
language plpgsql;