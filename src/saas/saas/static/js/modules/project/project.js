'use strict';
import { Util } from '/static/js/util.js';
class Project {

    static add(project = {}) {
        return Util.fetch('/api/work/projects/add', project);
    }
}
export { Project };