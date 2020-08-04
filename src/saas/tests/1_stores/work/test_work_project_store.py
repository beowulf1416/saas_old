import unittest

from pyramid import testing

import string
import random
import uuid
import datetime

from saas.app.core.stores.base import StoreException


class TestWorkProjectStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.project.stores.projects import ProjectStore

        mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(mgr, 'default')
        self.projects = ProjectStore(mgr, 'default')
        
        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_project_add(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)
        try:
            self.projects.add(
                client_id,
                project_id,
                random_str,
                random_str,
                datetime.datetime.now(),
                datetime.datetime.now()
            )
        except Exception as e:
            self.fail(e)

    def test_project_update(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)

        self.projects.add(
            client_id,
            project_id,
            random_str,
            random_str,
            datetime.datetime.now(),
            datetime.datetime.now()
        )

        try:
            random_str = self.generate_random_str(10)
            self.projects.update(
                client_id,
                project_id,
                random_str,
                random_str,
                datetime.datetime.now(),
                datetime.datetime.now(),
                datetime.datetime.now(),
                datetime.datetime.now()
            )
        except Exception as e:
            self.fail(e)

    def test_project_get(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)

        self.projects.add(
            client_id,
            project_id,
            random_str,
            random_str,
            datetime.datetime.now(),
            datetime.datetime.now()
        )

        try:
            result = self.projects.get(
                client_id,
                project_id
            )
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)

    def test_project_filter(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)

        self.projects.add(
            client_id,
            project_id,
            random_str,
            random_str,
            datetime.datetime.now(),
            datetime.datetime.now()
        )

        try:
            result = self.projects.filter(
                client_id,
                random_str[1:9]
            )
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)