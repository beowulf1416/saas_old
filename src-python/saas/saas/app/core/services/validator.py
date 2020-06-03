import logging
log = logging.getLogger(__name__)

import jsonschema
from jsonschema.exceptions import ValidationError
import json

class SchemaValidator(object):
    def __init__(self, schema_path: str):
        self._schema_path = schema_path
        self._schemas = {}

    def validate(self, schema_file: str, instance: object):
        try:
            schema = ''
            if schema_file in self._schemas:
                schema = self._schemas[schema_file]
            else:
                with open('{0}/{1}'.format(self._schema_path, schema_file)) as f:
                    data = f.read()
                    schema = json.loads(data)
                    
            jsonschema.validate(instance, schema)
        except ValidationError as e:
            log.error(e)
            raise Exception(e.message)

    