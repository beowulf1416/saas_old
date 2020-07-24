import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID


class TransactionStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(TransactionStore, self).__init__(manager, name)

    def add(self, transaction = {}):
        try:
            client_id = transaction['clientId']
            transaction_id = transaction['transactionId']

            cn = super(TransactionStore, self).begin()

            c = cn.cursor()
            c.callproc('accounting.transaction_add', [
                client_id,
                transaction_id,
                transaction['currencyId'],
                transaction['description']
            ])

            # process transaction items
            entries = transaction['entries']
            for e in entries:
                c.callproc('accounting.transaction_item_add', [
                    client_id,
                    transaction_id,
                    e['id'],
                    e['accountId'],
                    e['debit'],
                    e['credit']
                ])

            # process transaction attachments
            attachments = transaction['attachments'] if 'attachments' in transaction else []
            for a in attachments:
                c.callproc('accounting.transaction_attachment_add', [
                    client_id,
                    transaction_id,
                    a['id'],
                    a['filename'],
                    a['type'],
                    a['size'],
                    a['data']
                ])

            super(TransactionStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(TransactionStore, self).rollback(cn)
            raise StoreException(e)


    def update(self, transaction = {}):
        try:
            client_id = transaction['clientId']
            transaction_id = transaction['transactionId']

            cn = super(TransactionStore, self).begin()

            c = cn.cursor()
            c.callproc('accounting.transaction_update', [
                client_id,
                transaction_id,
                transaction['currencyId'],
                transaction['description']
            ])

            # process transaction items
            entries = transaction['entries']
            for e in entries:
                status = e['status'] if 'status' in e else None

                if status:
                    if status == 'update':
                        c.callproc('accounting.transaction_item_update', [
                            client_id,
                            transaction_id,
                            e['id'],
                            e['accountId'],
                            e['debit'],
                            e['credit']
                        ])
                    elif status == 'remove':
                        c.callproc('accounting.transaction_item_remove', [
                            client_id,
                            transaction_id,
                            e['id']
                        ])
                else:
                    c.callproc('accounting.transaction_item_add', [
                        client_id,
                        transaction_id,
                        e['id'],
                        e['accountId'],
                        e['debit'],
                        e['credit']
                    ])
            
            # process transaction attachments
            attachments = transaction['attachments'] if 'attachments' in transaction else []
            for a in attachments:
                status = a['status'] if 'status' in a else None

                if status:
                    if status == 'remove':
                        c.callproc('accounting.transaction_attachment_remove', [
                            client_id,
                            transaction_id,
                            a['id']
                        ])
                else:
                    c.callproc('accounting.transaction_attachment_add', [
                        client_id,
                        transaction_id,
                        a['id'],
                        a['filename'],
                        a['type'],
                        a['size'],
                        a['data']
                    ])


            super(TransactionStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(TransactionStore, self).rollback(cn)
            raise StoreException(e)