'use strict';
import { Util } from '/static/js/util.js';
class Project {

    static add(project = {}) {
        return Util.fetch('/api/work/projects/add', project);
    }

    static update(project = {}) {
        return Util.fetch('/api/work/projects/update', project);
    }

    static get(clientId = '', projectId = '') {
        return Util.fetch('/api/work/projects/get', {
            clientId: clientId,
            projectId: projectId
        });
    }
}
export { Project };