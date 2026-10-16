import header from '../pages/components/Header';
import authPopup from '../pages/components/AuthPopup';
import { getUser, Role } from './users';
import { LOGIN_API } from './constants';

Cypress.Commands.add('loginAs', (role: Role = 'user') => {
  const { login, password } = getUser(role);
  cy.session(
    ['ui-login', role, login],
    () => {
      cy.visit('/');
      cy.intercept('POST', LOGIN_API).as('login');
      header.openLoginPopup();
      authPopup.login(login, password);
      cy.wait('@login').its('response.statusCode').should('eq', 200);
      header.getLoginButton().should('not.exist');
    },
    {
      validate() {
        cy.visit('/');
        header.getLoginButton().should('not.exist');
      },
      cacheAcrossSpecs: true,
    },
  );
});

Cypress.Commands.add('logout', () => {
  header.logout();
  header.getLoginButton().should('be.visible');
});

declare global {
  namespace Cypress {
    interface Chainable {
      loginAs(role?: Role): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

export {};
