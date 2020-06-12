'use strict';

function showInTab(id = '', label = '', content = '') {
    const tab = document.querySelector('tab-container');
    tab.addTab(id, label, content);
}

function showInView(label = '', content = '') {
    const views = document.getElementById('views');
    if (views.firstChild) {
        views.removeChild(views.lastChild);
    }

    views.innerHTML = `
        <div class="view-wrapper">
            <div class="view-header">
                <h4>${label}</h4>
                <a class="link-close" title="Close View" href="#">
                    <span class="material-icons">close</span>
                </a>
            </div><!-- .view-header -->
            <div class="view-content">
                ${content}
            </div><!-- .view-content -->
        </div><!-- .view-wrapper -->
    `;

    // event handler
    const close = views.querySelector('.link-close');
    close.addEventListener('click', function(e) {
        while(views.firstChild) {
            views.removeChild(views.lastChild);
        }
        e.preventDefault();
    });

    return views.querySelector('.view-content');
}

function notify(type = 'info', message = '', timeout = null) {
    const notifier = document.querySelector('notification-list');
    notifier.add(type, message, timeout);
}

export { showInTab, showInView, notify };