import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore


class UOMStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(UOMStore, self).__init__(manager, name)


    def length(self):
        try:
            return super(UOMStore, self).runProc('common.uom_length_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve units of measure for length')

    def area(self):
        try:
            return super(UOMStore, self).runProc('common.uom_area_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve units of measure for width')

    def volume(self):
        try:
            return super(UOMStore, self).runProc('common.uom_volume_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve units of measure for height')

    def weight(self):
        try:
            return super(UOMStore, self).runProc('common.uom_weight_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve units of measure for weight')

    def quantity(self):
        try:
            return super(UOMStore, self).runProc('common.uom_quantity_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve units of measure for quantity')

    def all(self):
        try:
            return super(UOMStore, self).runProc('common.uom_all', [])
        except Exception as e:
            log.error(e)
            raise Exception('Unable to retrieve all units of measure')