import logging
log = logging.getLogger(__name__)

import jsonschema
from jsonschema.exceptions import ValidationError
import json

class SchemaValidator(object):
    def __init__(self, schema_path: str):
        self._schema_path = schema_path

    def validate(self, schema_file: str, instance: object):
        try:
            with open('{0}/{1}'.format(self._schema_path, schema_file)) as f:
                data = f.read()
                schema = json.loads(data)
                jsonschema.validate(instance, schema)
        except ValidationError as e:
            log.error(e)
            raise Exception(e.message)

    