'use strict';

function view(content) {
    const views = document.getElementById('views');
    if (views.firstChild) {
        views.removeChild(views.lastChild);
    }

    views.innerHTML = `${content}`;
    return views.firstChild;
}

export { view };