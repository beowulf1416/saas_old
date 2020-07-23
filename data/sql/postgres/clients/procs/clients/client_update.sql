create or replace function client_update (
    p_client_id clients.clients.id%type,
    p_name clients.clients.name%type,
    p_address clients.clients.address%type,
    p_country_id clients.clients.country_id%type,
    p_currency_id clients.clients.currency_id%type
)
returns void
as $$
begin
    update clients.clients set 
        name = p_name,
        address = p_address,
        country_id = p_country_id,
        currency_id = p_currency_id
    where id = p_client_id;
end
$$
language plpgsql;