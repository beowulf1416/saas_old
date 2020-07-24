create or replace function transaction_attachment_add (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type,
    p_attachment_id accounting.transaction_attachments.id%type,
    p_filename accounting.transaction_attachments.filename%type,
    p_type accounting.transaction_attachments.filetype%type,
    p_size accounting.transaction_attachments.filesize%type,
    p_data accounting.transaction_attachments.data%type
)
returns void
as $$
begin
    insert into accounting.transaction_attachments (
        client_id,
        transaction_id,
        id,
        filename,
        filetype,
        filesize,
        data
    ) values (
        p_client_id,
        p_transaction_id,
        p_attachment_id,
        p_filename,
        p_type,
        p_size,
        p_data
    );
end
$$
language plpgsql;