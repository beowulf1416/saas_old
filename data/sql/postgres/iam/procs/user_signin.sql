create or replace function user_signin(
    p_id iam.users.id%type
)
returns boolean
as $$
declare
    tmpb int;
begin
    select
        count(*) into tmpb
    from iam.users a
    where a.id = p_id
        and a.active = true;

    return tmpb > 0; 
end;
$$
language plpgsql;