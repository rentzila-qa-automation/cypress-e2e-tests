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

  protected click(selector: string): void {
    this.el(selector).should('be.visible').click();
  }

  protected fill(selector: string, value: string): void {
    this.el(selector).should('be.visible').clear();
    if (value !== '') this.el(selector).type(value);
  }

  verifyUrl(part: string = this.path): void {
    cy.location('pathname').should('include', part);
  }
}
