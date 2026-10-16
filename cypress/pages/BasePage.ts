export default abstract class BasePage {
  protected abstract readonly path: string;

  open(): void {
    cy.visit(this.path);
  }

  verifyUrl(part: string = this.path): void {
    cy.location('pathname').should('include', part);
  }
}
