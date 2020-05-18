import logging
log = logging.getLogger(__name__)

import json


class ConnectionManager(dict):
    def __init__(self, settings):
        config_location = settings['app.config']
        with open('{0}/databases.json'.format(config_location), 'r') as f:
            data = json.loads(f.read())
            databases = data['databases']
            for db in databases:
                dbtype = db['type']
                name = db['name']
                host = db['host']
                port = db['port']
                dbname = db['dbname']
                dbuser = db['dbuser']
                dbpw = db['dbpassword']
                self[name] = self._create_connection(dbtype, db)

        log.debug(self)

    def _create_connection(self, type: str, db: dict):
        if type == 'postgresql':
            log.debug('attempting to create postgresql connection')
            import psycopg2
            try:
                return psycopg2.connect(
                    "host='{0}' port='{1}' dbname='{2}' user='{3}' password='{4}'".format(
                        db['host'],
                        db['port'],
                        db['dbname'],
                        db['dbuser'],
                        db['dbpassword']
                    )
                )
            except KeyError as e:
                log.error('incorrect configuration %s', type)
                raise RuntimeError('Incorrect database configuration for postgresql')
            except Exception as e:
                log.error(e)
                raise e
        else:
            log.error('unknown connection type %s', type)