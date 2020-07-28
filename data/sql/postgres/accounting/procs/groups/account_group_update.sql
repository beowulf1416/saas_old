create or replace function account_group_update (
    p_client_id clients.clients.id%type,
    p_group_id accounting.account_groups.id%type,
    p_type_id accounting.account_groups.type_id%type,
    p_name accounting.account_groups.name%type,
    p_description accounting.account_groups.description%type
)
returns void 
as $$
declare
    t_count int;
    t_prev_name accounting.account_groups.name%type;
begin
    select
        a.name into t_prev_name
    from accounting.account_groups a
    where a.client_id = p_client_id
        and a.id = p_group_id
        and a.type_id = p_type_id;

    select
        count(*) into t_count
    from accounting.account_types a
    where a.name ilike p_name
          or a.name ilike t_prev_name;

    -- do not update to predefined group
    if t_count > 0 then
        raise exception 'Cannot update group with name %', p_name;
    end if;

    update accounting.account_groups
        set name = p_name
    where client_id = p_client_id
        and id = p_group_id
        and type_id = p_type_id;
end
$$
language plpgsql;