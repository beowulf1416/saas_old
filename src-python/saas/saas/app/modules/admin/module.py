import logging
log = logging.getLogger(__name__)

from saas.app.core.services.module import BaseModule


class AdminModule(BaseModule):

    def getModuleDescriptor(self):
        return {
            'name': 'admin',
            'help': 'System Administration Module'
        }