create or replace function users_filter (
    p_filter varchar
)
returns table (
    id iam.users.id%type,
    active iam.users.active%type,
    email iam.users.email%type,
    name iam.users.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.email,
        a.name
    from iam.users a
    where a.email like p_filter
        or a.name like p_filter;
end
$$
language plpgsql
stable;