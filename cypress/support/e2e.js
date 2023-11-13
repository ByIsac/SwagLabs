import './commands'
import "cypress-real-events/support"

const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML =
        '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');

    app.document.head.appendChild(style);
}

require('@cypress/xpath');

beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage()
    cy.window().then(win => {
        win.sessionStorage.clear()
        win.localStorage.clear()
    })
});