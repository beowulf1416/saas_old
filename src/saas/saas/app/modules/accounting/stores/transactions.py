import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID


class TransactionStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(TransactionStore, self).__init__(manager, name)

    def add(self, transation = {}):
        try:
            cn = super(TransactionStore, self).begin()

            c = cn.cursor()
            c.callproc('accounting.transaction_add', [
                transaction['clientId'],
                transaction['transactionId'],
                transaction['currencyId'],
                transaction['description']
            ])

            super(TransactionStore, self).commit(cn)
        except Exception as e:
            log.error(e)
            super(TransactionStore, self).rollback(cn)
            raise StoreException(e)