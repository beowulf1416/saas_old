import logging
log = logging.getLogger(__name__)

from uuid import UUID

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class OrganizationsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(OrganizationsStore, self).__init__(manager, name)

    def add(self, clientId: UUID, organizationId: UUID, name: str, description: str):
        '''add organization to client
        '''
        try:
            super(OrganizationsStore, self).runProcTransactional(
                'clients.organization_add', [clientId, organizationId, name, description])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to add organization to client')

    def update(self, clientId: UUID, organizationId: UUID, name: str, description: str):
        try:
            super(OrganizationsStore, self).runProcTransactional(
                'clients.organization_update', [clientId, organizationId, name, description])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to update organization')


    def get(self, organizationId: UUID):
        ''' retrieve organization
        '''
        try:
            [result, ] = super(OrganizationsStore, self).runProc('clients.organization_get', [organizationId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrive organization record')

    def getRoot(self, clientId: UUID):
        '''get root organization id for client
        '''
        try:
            [(result, )] = super(OrganizationsStore, self).runProc('clients.organization_root', [clientId, ])
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve root organization for client')


    def setParentOrg(self, clientId: UUID, orgId: UUID, parentOrgId: UUID):
        '''set parent organization id
        '''
        try:
            super(OrganizationsStore, self).runProcTransactional(
                'clients.organization_set_parent', [clientId, orgId, parentOrgId])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to set parent organization id')


    def tree(self, clientId: UUID):
        '''retrieve organizations for a client in tree format
        '''
        try:
            result = super(OrganizationsStore, self).runProc(
                'clients.organizations_tree_all',
                [clientId, ]
            )
            return result
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve organizations')