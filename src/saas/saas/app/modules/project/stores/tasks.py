import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID
from datetime import datetime


class TaskStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(TaskStore, self).__init__(manager, name)

    def add(self, 
        client_id: UUID, 
        project_id: UUID, 
        task_id: UUID, 
        name: str, 
        description: str
        ) -> None:
        try:
            super(TaskStore, self).runProcTransactional('work.task_add', [
                client_id,
                project_id,
                task_id,
                name,
                description
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to add project task')

    def update(self, 
        client_id: UUID, 
        project_id: UUID, 
        task_id: UUID, 
        name: str, 
        description: str
        ) -> None:
        try:
            super(TaskStore, self).runProcTransactional('work.task_update', [
                client_id,
                project_id,
                task_id,
                name,
                description
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to update project task')

    def get(self, client_id: UUID, project_id: UUID, task_id: UUID) -> dict:
        try:
            result = super(TaskStore, self).runProc('work.task_get', [
                client_id,
                project_id,
                task_id
            ])
            if len(result) > 0:
                return result[0]
            else:
                raise StoreException('Missing project task')
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve project task')