import logging
log = logging.getLogger(__name__)

from pyramid.view import view_config
import pyramid.httpexceptions as exception

from jsonschema import validate
from jsonschema.exceptions import ValidationError
import json


@view_config(
    route_name='api.work.projects.add',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_work_projects_add(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    store = services['store.project.projects']
    try:
        validator.validate(
            instance = params,
            schema_file = 'work/project.json'
        )

        store.add(
            params['clientId'],
            params['projectId'],
            params['name'],
            params['description'],
            params['plannedStart'] if 'plannedStart' in params else None,
            params['plannedEnd'] if 'plannedEnd' in params else None,
            params['tasks']
        )
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Project created',
        body={
            'message': 'Project created'
        }
    )

@view_config(
    route_name='api.work.projects.update',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_work_projects_update(request):
    params = request.json_body

    services = request.services()
    validator = services['validator.json']
    store = services['store.project.projects']
    try:
        validator.validate(
            instance = params,
            schema_file = 'work/project.json'
        )

        store.update(
            params['clientId'],
            params['projectId'],
            params['name'],
            params['description'],
            params['plannedStart'] if 'plannedStart' in params else None,
            params['plannedEnd'] if 'plannedEnd' in params else None,
            params['actualStart'] if 'actualStart' in params else None,
            params['actualEnd'] if 'actualEnd' in params else None,
            params['tasks'] if 'tasks' in params else []
        )
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Project updated',
        body={
            'message': 'Project updated'
        }
    )


@view_config(
    route_name='api.work.projects.get',
    request_method='POST',
    renderer='json',
    permission='user.authenticated'
)
def api_work_projects_get(request):
    params = request.json_body
    client_id = params['clientId'] if 'clientId' in params else None
    project_id = params['projectId'] if 'projectId' in params else None

    if client_id is None or project_id is None:
        raise exception.HTTPBadRequest(
            detail='Missing required parameter',
            explanation='Client Id and Project Id is required'
        )

    services = request.services()
    store = services['store.project.projects']
    project = {}
    try:
        result = store.get(
            client_id,
            project_id
        )

        result_root = store.get_root(
            client_id, 
            project_id
        )
        tasks = [
            {
                'taskId': r[0],
                'name': r[1],
                'description': r[2],
                'tasks': _get_child_tasks(store, client_id, project_id, r[0])
            }
            for r in result_root
        ]

        project = {
            'clientId': client_id,
            'projectId': project_id,
            'name': result[1],
            'description': result[2],
            'plannedStart': result[3],
            'plannedEnd': result[4],
            'actualStart': result[5],
            'actualEnd': result[6],
            'tasks': tasks
        }
    except ValidationError as e:
        log.error(e)
        raise exception.HTTPBadRequest(
            detail=e.message,
            explanation='Incorrect parameters'
        )
    except Exception as e:
        log.error(e)
        raise exception.HTTPInternalServerError(
            detail=str(e),
            explanation=str(e)
        )

    raise exception.HTTPOk(
        detail='Project found',
        body={
            'project': project
        }
    )