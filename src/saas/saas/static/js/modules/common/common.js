'use strict';
import { Util } from '/static/js/util.js';
class Common {
    static countries(filter = '') {
        return Util.fetch('/api/common/countries', {
            filter: filter
        });
    }

    static country_get(countryId = '') {
        return Util.fetch('/api/common/countries/get', {
            countryId: countryId
        });
    }

    static currencies(filter = '') {
        return Util.fetch('/api/common/currencies', {
            filter: filter
        });
    }

    static currency_get(currencyId = '') {
        return Util.fetch('/api/common/currencies/get', {
            currencyId: currencyId
        })
    }
}
export { Common };