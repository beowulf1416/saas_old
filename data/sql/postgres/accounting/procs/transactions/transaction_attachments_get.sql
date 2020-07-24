create or replace function transaction_attachments_get (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transaction_attachments.transaction_id%type
)
returns table (
    attachment_id accounting.transaction_attachments.id%type,
    filename accounting.transaction_attachments.filename%type,
    filetype accounting.transaction_attachments.filetype%type,
    filesize accounting.transaction_attachments.filesize%type,
    data accounting.transaction_attachments.data%type
)
as $$
begin
    return query
    select
        a.id,
        a.filename,
        a.filetype,
        a.filesize,
        a.data
    from accounting.transaction_attachments a
    where a.client_id = p_client_id
        and a.transaction_id = p_transaction_id;
end
$$
language plpgsql
stable;