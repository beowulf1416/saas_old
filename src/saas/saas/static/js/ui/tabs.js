'use strict';

function tabs(elem) {
    elem.querySelectorAll('[role=tabs] [role=tablist] a[role=tab]').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();

            const current_li = elem.querySelector('[role=tabs] ul[role=tablist] li.active');
            if (current_li) {
                current_li.classList.remove('active');
            }
            const current_a = elem.querySelector('[role=tabs] ul[role=tablist] a.active');
            if (current_a) {
                current_a.classList.remove('active');
            }
            
            a.classList.add('active');
            a.parentElement.classList.add('active');


            const tp = a.getAttribute('aria-controls');
            if (tp != null) {
                const current_tabpanel = elem.querySelector('[role=tabs] [role=tabpanel].active');
                if (current_tabpanel != null) {
                    current_tabpanel.classList.remove('active');
                }
                
                elem.querySelector(`[role=tabs] #${tp}[role=tabpanel]`).classList.add('active');
            }
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