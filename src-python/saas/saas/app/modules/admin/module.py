import logging
log = logging.getLogger(__name__)

from saas.app.core.services.module import BaseModule


class AdminModule(BaseModule):

    def getModuleDescriptor(self):
        return {
            'name': 'admin',
            'help': 'System Administration Module',
            'icon': '<span class="material-icons">view_quilt</span>'
        }

    def getContent(self):
        return {
            'template': 'saas.app.modules.admin:templates/module.html'
        }