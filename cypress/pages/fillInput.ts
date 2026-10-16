/**
 * The one way to fill an input in page objects: waits until the field is visible,
 * clears it, and types only when the value is not empty (so "" leaves the field empty).
 * Pass { log: false } for secrets such as passwords.
 */
export function fillInput(selector: string, value: string, options?: { log?: boolean }): void {
  cy.get(selector).should('be.visible').clear();
  if (value !== '') cy.get(selector).type(value, options);
}
