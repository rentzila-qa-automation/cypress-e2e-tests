import header from '../pages/components/Header';
import authPopup from '../pages/components/AuthPopup';
import { getUser, Role } from './users';
import { LOGIN_API } from './constants';

/**
 * Logs in as one of the test accounts and caches the session, so each role
 * logs in once per run instead of once per test.
 *
 * Works through the UI for now. The login API is POST /api/auth/jwt/create/
 * with { email, password }.
 * TODO (when test accounts are issued): check where the app stores the token
 * after a successful login and switch the setup to cy.request.
 */
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
        // TODO (when test accounts are issued): replace with a positive check,
        // for example header.getUserIcon().should('be.visible')
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
      /** Logs in as a test account from cypress.env.json and caches the session. */
      loginAs(role?: Role): Chainable<void>;
      /** Logs out through the profile menu in the header. */
      logout(): Chainable<void>;
    }
  }
}

export {};
