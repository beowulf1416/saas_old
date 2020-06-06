import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service
from saas.app.modules.admin.stores.clients import ClientsStore
from saas.app.modules.admin.stores.roles import RolesStore
from saas.app.modules.admin.stores.permissions import PermissionsStore
from saas.app.modules.admin.stores.users import UsersStore


def includeme(config):
    log.info('including: saas.app.modules.admin.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    clientsStore = ClientsStore(mgr, 'default')
    services['store.admin.clients'] = clientsStore

    rolesStore = RolesStore(mgr, 'default')
    services['store.admin.roles'] = rolesStore

    permissionsStore = PermissionsStore(mgr, 'default')
    services['store.admin.permissions'] = permissionsStore

    usersStore = UsersStore(mgr, 'default')
    services['store.admin.users'] = usersStore