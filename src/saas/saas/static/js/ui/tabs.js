'use strict';

function tabs(elem) {
    elem.querySelectorAll('.tabs .tablist a[role=tab]').forEach(a => {
        a.addEventListener('click', function(e) {
            const tp = a.getAttribute('aria-controls');
            if (tp != null) {
                const current_tabpanel = elem.querySelector('.tabs [role=tabpanel].active');
                if (current_tabpanel != null) {
                    current_tabpanel.classList.remove('active');
                }
                
                elem.querySelector(`.tabs #${tp}[role=tabpanel]`).classList.add('active');
            }
            console.log('//TODO click');
        });
    });
}

export { tabs };