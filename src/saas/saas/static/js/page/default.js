'use strict';
(function(){
    // navigators
    // const setActiveNavigatorTab = function(navigator_id) {
    //     const a_nav = document.querySelector('a[aria-selected=true');
    //     if (a_nav != null) {
    //         a_nav.setAttribute('aria-selected','false');
    //         a_nav.parentElement.classList.remove('active');
    //     }

    //     const content_old = document.querySelector('div.nav-content.active');
    //     if (content_old != null) {
    //         content_old.classList.remove('active');
    //     }

    //     const a_new = document.querySelector(`a#nav-${navigator_id}`);
    //     if (a_new != null) {
    //         a_new.setAttribute('aria-selected', true);
    //         a_new.parentElement.classList.add('active');
    //     }

    //     const content_new = document.querySelector(`div#nav-content-${navigator_id}.nav-content`);
    //     if (content_new != null) {
    //         content_new.classList.add('active');
    //     }
    // };

    // document.querySelectorAll('.navigators .nav-links .nav').forEach(a => {
    //     a.addEventListener('click', function(e) {
    //         const nav_id = a.dataset.navid;
    //         setActiveNavigatorTab(nav_id);
    //     });
    // });

    // setActiveNavigatorTab('admin');
})();