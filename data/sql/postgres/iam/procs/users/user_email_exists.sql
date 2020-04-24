create or replace function user_email_exists (
    p_email iam.users.email%type
)
returns boolean
as $$
declare
    bExists int;
begin
    select count(*) into bExists
    from iam.users
    where email = p_email;

    return bExists > 0;
end
$$
language plpgsql;