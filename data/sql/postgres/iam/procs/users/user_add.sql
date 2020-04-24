create or replace function user_add (
    p_email iam.users.email%type,
    p_name iam.users.name%type
)
returns iam.users.id%type
as $$
declare
    tmpId iam.users.id%type;
begin
    insert into iam.users (
        email,
        name,
        active
    ) values (
        p_email,
        p_name,
        true
    ) 
    returning id into tmpId;

    return tmpId;
end
$$
language plpgsql;
