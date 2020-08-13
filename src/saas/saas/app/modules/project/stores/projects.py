import logging
log = logging.getLogger(__name__)

from saas.app.core.services.connection import ConnectionManager
from saas.app.core.stores.base import BaseStore, StoreException

from uuid import UUID
from datetime import datetime


class ProjectStore(BaseStore):

    def __init__(self, manager: ConnectionManager, name: str):
        super(ProjectStore, self).__init__(manager, name)

    def add(self, 
        client_id: UUID, 
        project_id: UUID,
        name: str,
        description: str,
        planned_start: datetime,
        planned_end: datetime,
        tasks: list
        ) -> None:

        cn = super(ProjectStore, self).begin()
        try:
            c = cn.cursor()
            c.callproc('work.project_add', [
                client_id,
                project_id,
                name,
                description,
                planned_start,
                planned_end
            ])

            for t in tasks:
                current_task_id = t['taskId']
                c.callproc('work.task_add', [
                    client_id,
                    project_id,
                    current_task_id,
                    t['name'],
                    t['description']
                ])

            super(ProjectStore, self).commit(cn)
        except Exception as e:
            super(ProjectStore, self).rollback(cn)
            log.error(e)
            raise StoreException('Unable to add project')

    def update(self,
        client_id: UUID, 
        project_id: UUID,
        name: str,
        description: str,
        planned_start: datetime,
        planned_end: datetime,
        actual_start: datetime,
        actual_end: datetime,
        tasks: list
        ) -> None:
        cn = super(ProjectStore, self).begin()
        try:
            c = cn.cursor()
            c.callproc('work.project_update', [
                client_id,
                project_id,
                name,
                description,
                planned_start,
                planned_end,
                actual_start,
                actual_end
            ])

            for t in tasks:
                current_task_id = t['taskId']
                status = t['status']
                if status is None:
                    c.callproc('work.task_add', [
                        client_id,
                        project_id,
                        current_task_id,
                        t['name'],
                        t['description']
                    ])
                elif status == 'update':
                    c.callproc('work.task_update', [

                    ])
                elif status == 'remove':
                    c.callproc('work.task_remove', [
                        client_id,
                        project_id,
                        current_task_id
                    ])
                else:
                    log.warn('Unhandled case %s', status)

                super(ProjectStore, self).commit(cn)
        except Exception as e:
            super(ProjectStore, self).rollback(cn)
            log.error(e)
            raise StoreException('Unable to update project')

    def get(self, client_id: UUID, project_id: UUID) -> dict:
        try:
            result = super(ProjectStore, self).runProc('work.project_get', [
                client_id,
                project_id
            ])
            if len(result) > 0:
                return result[0]
            else:
                raise StoreException('Project not found')
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve project')

    def filter(self, client_id: UUID, filter: str) -> list:
        try:
            result = super(ProjectStore, self).runProc('work.project_filter', [
                client_id,
                f'%{filter}%'
            ])
            return result
        except Exception as e:
            log.error(e)
            raise StoreException('Unable to retrieve projects')

    def _tasks_add(self, client_id: UUID, project_id: UUID, task_id: UUID, tasks: list, cursor: object) -> None:
        try:
            for t in tasks:
                current_task_id = t['taskId']
                cursor.callproc('work.task_add', [
                    client_id,
                    project_id,
                    current_task_id,
                    t['name'],
                    t['description']
                ])
        except Exception as e:
            log.error(e)
            raise e