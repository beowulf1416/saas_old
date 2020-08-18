create or replace function client_by_name (
    p_filter clients.clients.name%type
)
returns clients.clients.id%type
as $$
declare
    t_client_id clients.clients.id%type;
begin
    select
        a.id into t_client_id
    from clients.clients a
    where a.name ilike p_filter
    limit 1;

    return t_client_id;
end
$$
language plpgsql
stable;