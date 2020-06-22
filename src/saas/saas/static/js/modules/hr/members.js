'use strict';
import { Util } from '/static/js/util.js';
class Members {

    static save(member = {}) {
        return Util.fetch('/api/hr/members/save', member);
    }
}
export { Members };