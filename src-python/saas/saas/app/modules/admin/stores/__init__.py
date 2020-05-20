from saas.app.core.services import get_service

from saas.app.modules.admin.stores.clients import ClientsStore


def includeme(config):
    services = get_service(None)
    mgr = services['connection.manager']

    clientsStore = ClientsStore(mgr, 'default')
    services['store.admin.clients'] = clientsStore