'use strict';

class Common {
    static countries() {
        return fetch('/api/common/countries', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((r) => r.json());
    }
}
export { Common };