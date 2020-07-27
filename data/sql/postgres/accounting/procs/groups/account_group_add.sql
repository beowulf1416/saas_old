create or replace function account_group_add (
    p_client_id clients.clients.id%type,
    p_group_id accounting.account_groups.id%type,
    p_name accounting.account_groups.name%type,
    p_description accounting.account_groups.description%type
)
returns void
as $$
declare
    t_root_group_id accounting.account_groups.id%type;
    t_count int;
begin
    select
        count(*) into t_count
    from accounting.account_types a
    where a.name ilike p_name;

    -- do not add predefined groups
    if t_count > 0 then
        raise exception 'Cannot add group with name %', p_name;
    end if;

    insert into accounting.account_groups (
        id,
        client_id,
        name,
        description
    ) values (
        p_group_id,
        p_client_id,
        p_name,
        p_description
    );

    -- retrieve root account group and assign as parent
    select
        a.id into t_root_group_id
    from accounting.account_groups a
    where a.client_id = p_client_id
        and a.name = 'root';
    -- account group tree
    insert into accounting.account_group_tree (
        client_id,
        group_id,
        parent_group_id,
        path
    ) values (
        p_client_id,
        p_group_id,
        t_root_group_id,
        text2ltree('root.' || replace(p_group_id::text, '-', '_'))
    );
end
$$
language plpgsql;