export function fillInput(selector: string, value: string, options?: { log?: boolean }): void {
  cy.get(selector).should('be.visible').clear();
  if (value !== '') cy.get(selector).type(value, options);
}
