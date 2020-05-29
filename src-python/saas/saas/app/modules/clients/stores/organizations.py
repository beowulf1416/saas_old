import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class OrganizationsStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(OrganizationsStore, self).__init__(manager, name)

