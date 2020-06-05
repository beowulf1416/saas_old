'use strict';
(function(){
    const setActiveModule = function(module) {
        const aactive = document.querySelector('li.module-item.active');
        if (aactive != null) {
            aactive.classList.remove('active');
        }

        const mactive = document.querySelector('div.module-content.active');
        if (mactive != null) {
            mactive.classList.remove('active');
        }

        const li = document.querySelector(`li.module-${module}`);
        li.classList.add('active');

        const div = document.querySelector(`div#module-content-${module}`);
        div.classList.add('active')
    };

    document.querySelectorAll('.modules-wrapper a.link-module').forEach(a => {
        a.addEventListener('click', function(e) {
            const module = a.dataset.module;
            setActiveModule(module);
        });
    });

    setActiveModule('admin');
})();