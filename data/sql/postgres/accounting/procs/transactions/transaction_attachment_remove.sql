create or replace function transaction_attachment_remove (
    p_client_id clients.clients.id%type,
    p_transaction_id accounting.transactions.id%type,
    p_attachment_id accounting.transaction_attachments.id%type
)
returns void
as $$
begin
    delete from accounting.transaction_attachments
    where client_id = p_client_id
        and transaction_id = p_transaction_id
        and id = p_attachment_id;
end
$$
language plpgsql;