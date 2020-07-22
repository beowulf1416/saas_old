'use strict';
import { Util } from '/static/js/util.js';
class Common {
    static countries() {
        return Util.fetch('/api/common/countries', {});
        // return fetch('/api/common/countries', {
        //     method: 'POST',
        //     credentials: 'same-origin',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then((r) => r.json());
    }

    static currencies() {
        return Util.fetch('/api/common/currencies', {});
    }
}
export { Common };