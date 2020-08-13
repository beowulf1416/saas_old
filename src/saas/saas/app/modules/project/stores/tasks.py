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

    def remove(self,
        client_id: UUID,
        project_id: UUID,
        task_id: UUID
        ) -> None:
        try:
            super(TaskStore, self).runProcTransactional('work.task_remove', [
                client_id,
                project_id,
                task_id
            ])
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to remove task')

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

    def get_root(self, client_id: UUID, project_id: UUID) -> list:
        try:
            result = super(TaskStore, self).runProc('work.task_root', [
                client_id,
                project_id
            ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve project root tasks')

    # def get_dependents(self, client_id: UUID, project_id: UUID, task_id: UUID) -> list:
    #     try:
    #         result = super(TaskStore, self).runProc('work.')