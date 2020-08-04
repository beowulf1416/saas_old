create or replace function project_add (
    p_client_id clients.clients.id%type,
    p_project_id work.projects.id%type,
    p_name work.projects.name%type,
    p_description work.projects.description%type,
    p_planned_start work.projects.planned_start_ts%type,
    p_planned_end work.projects.planned_end_ts%type
)
returns void
as $$
begin
    insert into work.projects (
        client_id,
        id,
        name,
        description,
        planned_start_ts,
        planned_end_ts
    ) values (
        p_client_id,
        p_project_id,
        p_name,
        p_description,
        p_planned_start,
        p_planned_end
    );
end
$$
language plpgsql;