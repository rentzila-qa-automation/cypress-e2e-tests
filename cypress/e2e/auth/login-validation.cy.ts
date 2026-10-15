import { faker } from '@faker-js/faker';
import HomePage from '../../pages/HomePage';
import Header from '../../pages/components/Header';
import AuthPopup, { AUTH_MESSAGES, ERROR_INPUT_CLASS } from '../../pages/components/AuthPopup';

// Example spec for the team: shows the conventions from README.
describe('Login validation', () => {
  beforeEach(() => {
    HomePage.open();
    Header.openLoginPopup();
  });

  it('C200 Authorization with empty fields', () => {
    AuthPopup.submit();
    AuthPopup.getFieldErrors().should('have.length', 2).each(($el) => {
      cy.wrap($el).should('have.text', AUTH_MESSAGES.required);
    });
    AuthPopup.getLoginInput().invoke('attr', 'class').should('include', ERROR_INPUT_CLASS);
    AuthPopup.getPasswordInput().invoke('attr', 'class').should('include', ERROR_INPUT_CLASS);
    AuthPopup.getRoot().should('be.visible');
  });

  it('shows an error for a non-existent account', () => {
    cy.intercept('POST', '/api/auth/jwt/create/').as('login');
    AuthPopup.login(faker.internet.email(), faker.internet.password({ length: 10 }));
    cy.wait('@login').its('response.statusCode').should('eq', 400);
    AuthPopup.getFormError().should('have.text', AUTH_MESSAGES.invalidCredentials);
    AuthPopup.getRoot().should('be.visible');
  });
});
