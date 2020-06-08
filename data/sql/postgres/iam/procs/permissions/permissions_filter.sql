/**
 * retrieve all permissions
 */
create or replace function permissions_filter (
    p_filter iam.permissions.name%type
)
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
    from iam.permissions a
    where a.name like p_filter;
end
$$
language plpgsql;