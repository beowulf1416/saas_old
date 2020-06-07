'use strict';

function tabs(elem) {
    elem.querySelectorAll('tabs .tablist a[role=tab]').forEach(a => {
        a.addEventListener('click', function(e) {
            console.log('//TODO click');
        });
    });
}

export { tabs };