import logging
log = logging.getLogger(__name__)

from saas.app.core.services.module import BaseModule


class AdminModule(BaseModule):

    def getDescriptor(self):
        return {
            'name': 'admin',
            'help': 'System Administration Module',
            'template': 'saas.app.modules.admin:templates/module.html',
            'icon': '<span class="material-icons">view_quilt</span>'
        }