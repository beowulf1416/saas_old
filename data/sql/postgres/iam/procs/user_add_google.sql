create or replace function user_add_google (
    p_id iam.users_google.id%type,
    p_google_id iam.users_google.google_id%type
)
returns void
as $$
begin
    insert into iam.users_google (
        id,
        google_id
    ) values (
        p_id,
        p_google_id
    );
end
$$
language plpgsql;