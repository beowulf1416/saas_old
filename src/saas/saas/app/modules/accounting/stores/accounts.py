import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID
from saas.app.modules.accounting.models.account_types import AccountTypes

from saas.app.modules.accounting.stores.groups import GroupStore


class AccountsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str, groupStore: GroupStore):
        super(AccountsStore, self).__init__(manager, name)
        self._groups = groupStore

    def accountTypesAll(self):
        '''retrieve all account types
        '''
        try:
            result = super(AccountsStore, self).runProc('accounting.account_types_all', [])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('An error occured while retrieving account types')

    def add(self, client_id: UUID, account_id: UUID, type_id: AccountTypes, name: str, description: str):
        '''add an account record for a specified client
        '''
        try:
            super(AccountsStore, self).executeTransactional(
                'select * from accounting.account_add(%(client_id)s,%(account_id)s,%(type_id)s::smallint,%(name)s,%(description)s)',
                { 
                    'client_id': client_id,
                    'account_id': account_id,
                    'type_id': type_id,
                    'name': name,
                    'description': description
                }
            )
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add account')

    def update(self, client_id: UUID, account_id: UUID, name: str, description: str) -> None:
        try:
            super(AccountsStore, self).runProc('accounting.account_update', [
                client_id,
                account_id,
                name,
                description
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to update account')

    def get(self, client_id: UUID, account_id: UUID) -> {}:
        try:
            result = super(AccountsStore, self).runProc('accounting.account_get', [
                client_id,
                account_id
            ])
            if len(result) > 0:
                return result[0]
            else:
                raise StoreException('Missing account')
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve account')

    def assign_account_parent(self, clientId: UUID, accountId: UUID, parentAccountId: UUID):
        '''assign an account as the parent account
        '''
        try:
            super(AccountsStore, self).runProcTransactional('accounting.account_assign_parent', [clientId, accountId, parentAccountId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to assign parent account')

    def all(self, clientId: UUID):
        '''rerieve all accounts for client
        '''
        try:
            result = super(AccountsStore, self).runProc('accounting.accounts_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve accounts')

    def getChildren(self, clientId: UUID, parentId: UUID):
        '''retrieve account children
        '''
        try:
            result = super(AccountsStore, self).runProc('accounting.account_get_children', [clientId, parentId])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve child accounts')

    def getTree(self, clientId: UUID):
        '''get account tree
        '''
        try:
            result = super(AccountsStore, self).runProc('accounting.account_tree_all', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve account tree')

    def filter(self, clientId: UUID, filter: str):
        try:
            result = super(AccountsStore, self).runProc('accounting.accounts_filter', [
                clientId,
                f'%{filter}%'
            ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve accounts filtered')

    def assign_group(self, client_id: UUID, account_id: UUID, group_id: UUID):
        try:
            super(AccountsStore, self).runProcTransactional('accounting.account_assign_group', [
                client_id,
                account_id,
                group_id
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to assign account to group')
        

    def chart(self, client_id: UUID):
        try:
            result = self._groups.tree(client_id)
            chart = [
                {
                    'groupId': r[0],
                    'groupName': r[1],
                    'groupTypeId': r[2],
                    'groupLevel': r[3],
                    'accounts': [
                        {
                            'accountId': rr[0],
                            'accountName': rr[4],
                            'accountTypeId': rr[3],
                            'value': rr[6]
                        }
                        for rr in self._groups.accounts(client_id, r[0])
                    ]
                }
                for r in result
            ]

            return chart
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve chart of accounts')