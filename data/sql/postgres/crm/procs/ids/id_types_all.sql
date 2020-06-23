create or replace function id_types_all (
)
returns table (
    id crm.id_types.id%type,
    name crm.id_types.name%type
)
as $$
begin
    return query
    select
        a.id,
        a.name
    from crm.id_types a;
end
$$
language plpgsql
stable;