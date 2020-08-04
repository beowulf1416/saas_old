import unittest

from pyramid import testing

import string
import random
import uuid
import datetime

from saas.app.core.stores.base import StoreException


class TestWorkProjectTaskStore(unittest.TestCase):

    def setUp(self):
        self.config = testing.setUp()

        from saas.app.core.services.connection import ConnectionManager
        from saas.app.core.stores.client import ClientStore
        from saas.app.modules.project.stores.projects import ProjectStore
        from saas.app.modules.project.stores.tasks import TaskStore

        mgr = ConnectionManager({
            'app.config': '../../etc'
        })
        self.clientStore = ClientStore(mgr, 'default')
        self.projects = ProjectStore(mgr, 'default')
        self.tasks = TaskStore(mgr, 'default')
        
        self.defaultClient = self.clientStore.getDefaultClient()

    def generate_random_str(self, length: int):
        allowed = string.ascii_lowercase + string.digits
        return ''.join(random.choice(allowed) for i in range(length))

    def test_add(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        task_id = str(uuid.uuid4())
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
            self.tasks.add(
                client_id,
                project_id,
                task_id,
                random_str,
                random_str
            )
        except Exception as e:
            self.fail(e)

    def test_update(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        task_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)

        self.projects.add(
            client_id,
            project_id,
            random_str,
            random_str,
            datetime.datetime.now(),
            datetime.datetime.now()
        )

        self.tasks.add(
            client_id,
            project_id,
            task_id,
            random_str,
            random_str
        )

        random_str = self.generate_random_str(10)

        try:
            self.tasks.update(
                client_id,
                project_id,
                task_id,
                random_str,
                random_str
            )
        except Exception as e:
            self.fail(e)

    def test_get(self):
        client_id = self.defaultClient[0]
        project_id = str(uuid.uuid4())
        task_id = str(uuid.uuid4())
        random_str = self.generate_random_str(10)

        self.projects.add(
            client_id,
            project_id,
            random_str,
            random_str,
            datetime.datetime.now(),
            datetime.datetime.now()
        )

        self.tasks.add(
            client_id,
            project_id,
            task_id,
            random_str,
            random_str
        )
        
        random_str = self.generate_random_str(10)

        try:
            result = self.tasks.get(
                client_id,
                project_id,
                task_id
            )
            self.assertGreater(len(result), 0, '{0}'.format(result))
        except Exception as e:
            self.fail(e)