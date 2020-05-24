create or replace function accounts_filter (
    p_client_id clients.clients.id%type,
    p_filter_name accounting.accounts.name%type
)
returns table (
    id uuid,
    active boolean,
    created_ts timestamp without time zone,
    type_id smallint,
    name varchar(200),
)
as $$
begin
    return query
    select
        a.id,
        a.active,
        a.created_ts,
        a.type_id,
        a.name
    from accounting.accounts a
    where a.name like p_filter_name;
end
$$
language plpgsql;