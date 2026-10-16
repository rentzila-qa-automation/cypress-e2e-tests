import { faker } from '@faker-js/faker';
import homePage from '../../pages/HomePage';
import header from '../../pages/components/Header';
import { LOGIN_API } from '../../support/constants';
import authPopup, { AUTH_MESSAGES, ERROR_INPUT_CLASS } from '../../pages/components/AuthPopup';

// Example spec for the team: shows the conventions from README.
describe('Login validation', () => {
  beforeEach(() => {
    homePage.open();
    header.openLoginPopup();
  });

  it('C200 Authorization with empty fields', () => {
    authPopup.submit();
    authPopup.getFieldErrors().should('have.length', 2).each(($el) => {
      cy.wrap($el).should('have.text', AUTH_MESSAGES.required);
    });
    authPopup.getLoginInput().invoke('attr', 'class').should('include', ERROR_INPUT_CLASS);
    authPopup.getPasswordInput().invoke('attr', 'class').should('include', ERROR_INPUT_CLASS);
    authPopup.getRoot().should('be.visible');
  });

  it('shows an error for a non-existent account', () => {
    cy.intercept('POST', LOGIN_API).as('login');
    authPopup.login(faker.internet.email(), faker.internet.password({ length: 10 }));
    cy.wait('@login').its('response.statusCode').should('eq', 400);
    authPopup.getFormError().should('have.text', AUTH_MESSAGES.invalidCredentials);
    authPopup.getRoot().should('be.visible');
  });
});
