/**
 * add a category
 */
create or replace function category_add (
    p_client_id clients.clients.id%type,
    p_name categories.name%type
)
returns void
as $$
begin
    insert into categories (
        client_id,
        name
    ) values (
        p_client_id,
        p_name
    );
end
$$
language plpgsql