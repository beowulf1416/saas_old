create or replace function user_add (
    p_email iam.users.email%type,
    p_name iam.users.name%type
)
returns iam.users.id%type
as $$
begin
    insert into iam.users (
        email,
        name
    ) values (
        p_email,
        p_name
    ) 
    returning id;
end
$$
language plpgsql;
