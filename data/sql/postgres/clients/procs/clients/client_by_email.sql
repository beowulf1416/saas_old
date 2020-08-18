create or replace function client_by_email (
    p_filter clients.clients.name%type
)
returns clients.clients.id%type
as $$
begin
    return query
    select
        a.id
    from clients.clients a
    where a.name ilike p_filter;
end
$$
language plpgsql
stable;