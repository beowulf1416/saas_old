import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID
from saas.app.modules.accounting.models.account_types import AccountTypes


class AccountsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(AccountsStore, self).__init__(manager, name)

    def accountTypesAll(self):
        '''retrieve all account types
        '''
        try:
            result = super(AccountsStore, self).runProc('accounting.account_types_all', [])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving account types')

    def add(self, clientId: UUID, typeId: AccountTypes, name: str, description: str):
        '''add an account record for a specified client
        '''
        try:
            [accountId, ] = super(AccountsStore, self).executeTransactional(
                "select * from accounting.account_add('{0}', {1}::smallint, '{2}', '{3}')".format(
                    clientId,
                    typeId,
                    name,
                    description
                )
            )
            return accountId
        except Exception as e:
            log.error(e)
            raise e

    def assign_account_parent(self, clientId: UUID, accountId: UUID, parentAccountId: UUID):
        '''assign an account as the parent account
        '''
        try:
            super(AccountsStore, self).runProcTransactional('accounting.account_assign_parent', [clientId, accountId, parentAccountId])
        except Exception as e:
            log.error(e)
            raise e

    def all(self, clientId: UUID):
        '''rerieve all accounts for client
        '''
        try:
            result = super(AccountsStore, self).runProc('accounting.accounts_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise e