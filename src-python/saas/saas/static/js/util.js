'use strict';

class Util {

    static generateId() {
        return Math.random().toString(16).slice(10);
    }
}
export { Util };