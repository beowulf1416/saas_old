import logging
log = logging.getLogger(__name__)

from saas.app.core.services import get_service

from saas.app.modules.hr.stores.members import MembersStore
from saas.app.modules.hr.stores.id_types import IdTypesStore

def includeme(config):
    log.info('including: saas.app.modules.hr.stores')

    services = get_service(None)
    mgr = services['connection.manager']

    mStore = MembersStore(mgr, 'default')
    services['store.hr.members'] = mStore

    idStore = IdTypesStore(mgr, 'default')
    services['store.hr.idtypes'] = idStore
