'use strict';

function showInTab(id = '', label = '', content = '') {
    const tab = document.querySelector('tab-container');
    tab.addTab(id, label, content);
}

function showInView(content) {
    const views = document.getElementById('views');
    if (views.firstChild) {
        views.removeChild(views.lastChild);
    }

    views.innerHTML = `${content}`;
    return views.firstChild;
}

function notify(type = 'info', message = '', timeout = null) {
    const notifier = document.querySelector('notification-list');
    notifier.add(type, message, timeout);
}

export { showInTab, showInView, notify };