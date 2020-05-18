import logging
log = logging.getLogger(__name__)


class ServiceManager(dict):
    def getServices(self):
        return self.keys()

    def get_service(self, service: str):
        log.debug('ServiceManager::get()')