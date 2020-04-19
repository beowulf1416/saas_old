/**
 * 
 */

set schema 'public';

\prompt 'email: ' email


create or replace function promote_sysad_user(
    p_email public.email_address
)
returns void
as $$
declare
    tmp_cid clients.clients.id%type;
    tmp_uid iam.users.id%type;
    tmp_rid iam.roles.id%type;
begin
    select
        a.id into tmp_cid
    from clients.clients a
    where name = 'default';

    -- toggle client to active
    update clients.clients
    set active = true
    where id = tmp_cid;

    select
        a.id into tmp_uid
    from iam.users a
    where a.email = p_email;

    -- toggle user to active
    update iam.users
    set active = true
    where id = tmp_uid;

    select
        a.id into tmp_rid
    from iam.roles a
    where a.name = 'system administrator';

    -- toggle role to active
    update iam.roles
    set active = true
    where id = tmp_rid;

    insert into iam.role_permissions (role_id, permission_id, client_id)
    select 
        tmp_rid,
        a.id,
        tmp_cid
    from iam.permissions a;
end
$$
language plpgsql;

select promote_sysad_user(:'email');

drop function promote_sysad_user;


\echo 'done'