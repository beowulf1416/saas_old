'use strict';

function tabs(elem) {
    elem.querySelectorAll('[role=tabs] [role=tablist] a[role=tab]').forEach(a => {
        a.addEventListener('click', function(e) {
            const tp = a.getAttribute('aria-controls');
            if (tp != null) {
                const current_tabpanel = elem.querySelector('[role=tabs] [role=tabpanel].active');
                if (current_tabpanel != null) {
                    current_tabpanel.classList.remove('active');
                }
                
                elem.querySelector(`[role=tabs] #${tp}[role=tabpanel]`).classList.add('active');
            }
            console.log('//TODO click');
        });
    });

    // set the first tab as active
    const tab = elem.querySelector('[role=tabs] [role=tablist] a[role=tab]');
    if (tab) {
        tab.classList.add('active');
    }
    const tp = elem.querySelector('[role=tabs] [role=tabpanel]');
    if (tp) {
        tp.classList.add('active');
    }
}

export { tabs };