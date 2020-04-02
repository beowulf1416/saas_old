create or replace function user_add (
    p_email iam.users.email%type
)
returns void
as
$$
declare
    tmp_id iam.users.id%type;
begin
    insert into iam.users (
        email
    ) values (
        p_email
    );
end
$$
language plpgsql;
