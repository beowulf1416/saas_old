import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore

from uuid import UUID


class MembersStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(MembersStore, self).__init__(manager, name)

    def save(self, member: dict):
        '''add a member record
        '''
        cn = super(MembersStore, self).begin()
        try:
            member_id = member['memberId']
            c = cn.cursor()
            c.callproc('hr.employee_save', [
                member['clientId'],
                member['memberId'],
                member['firstName'],
                member['middleName'],
                member['lastName'],
                member['prefix'],
                member['suffix']
            ])

            super(MembersStore, self).commit(cn)
        except Exception as e:
            super(MembersStore, self).rollback(cn)
            log.error(e)
            raise Exception('Unable to save Member record')

    def filter(self, clientId: UUID, filter: str):
        try:
            result = super(MembersStore, self).runProc('hr.employees_filter', [clientId, f'%{filter}%'])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve HR members')