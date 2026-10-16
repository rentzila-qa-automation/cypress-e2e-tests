/**
 * Generic actions shared by every page object.
 * Locators are passed in as strings and resolved on each call,
 * so nothing goes stale after a re-render.
 */
export default abstract class BasePage {
  protected abstract readonly path: string;

  open(): void {
    cy.visit(this.path);
  }

  protected el(selector: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(selector);
  }

  protected byText(selector: string, text: string | RegExp): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(selector, text);
  }

  verifyUrl(part: string = this.path): void {
    cy.location('pathname').should('include', part);
  }
}
