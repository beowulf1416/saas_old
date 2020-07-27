create or replace function account_update (
    p_client_id clients.clients.id%type,
    p_account_id accounting.accounts.id%type,
    p_name accounting.accounts.name%type,
    p_description accounting.accounts.description%type
)
returns void
as $$
begin
    update accounting.accounts set
        a.name = p_name,
        a.description = p_description
    where a.client_id = p_client_id
        and a.id = p_account_id;
end
$$
language plpgsql;