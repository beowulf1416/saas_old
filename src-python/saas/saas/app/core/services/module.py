import logging
log = logging.getLogger(__name__)

class BaseModule(object):

    def getModuleDescriptor(self):
        return {
            'name': 'base module',
            'help': 'This is the base module',
            'icon': '/static/img/gear.ico'
        }