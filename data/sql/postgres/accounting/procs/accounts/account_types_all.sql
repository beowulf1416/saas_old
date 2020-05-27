/**
 * retrieve all account types
 * exclude the 'root' account type
 */
create or replace function account_types_all ()
returns table (
    id accounting.account_types.id%type,
    name accounting.account_types.name%type
)
as $$
begin
    return query 
    select
        a.id,
        a.name
    from accounting.account_types a
    where a.id > 0;
end
$$
language plpgsql;