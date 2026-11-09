import homePage from '../../pages/HomePage';
import header from '../../pages/components/Header';
import unitsPage from '../../pages/UnitsPage';

const EXPECTED_ITEMS_COUNT = 7;
const FIRST_ITEM_CATEGORY = 'Посівна та садильна техніка';

describe('Main page: equipment section', () => {
  it('C213: Checking "Спецтехніка" section on the main page', () => {
    homePage.open();

    homePage.getEquipmentTabs().first().scrollIntoView().should('be.visible').and('contain.text', 'Популярна');
    homePage.getEquipmentItems().should('have.length', EXPECTED_ITEMS_COUNT).and('be.visible');

    homePage.getEquipmentItems().first().click();
    unitsPage.verifyUrl();
    unitsPage.getSelectedCategory().should('be.visible').and('contain.text', FIRST_ITEM_CATEGORY);
    header.clickLogo();
    cy.location('pathname').should('eq', '/');

    homePage.getEquipmentTabs().its('length').then((tabsCount) => {
      Cypress._.times(tabsCount, (tabIndex) => {
        homePage.getEquipmentTabs().eq(tabIndex).click();
        homePage.getEquipmentItems().should('have.length.greaterThan', 0);

        homePage.getEquipmentItems().its('length').then((itemsCount) => {
          Cypress._.times(itemsCount, (itemIndex) => {

            homePage.getEquipmentTabs().eq(tabIndex).click();
            homePage.getEquipmentItems().eq(itemIndex).click();
            unitsPage.verifyUrl();
            unitsPage.getSelectedCategory().should('be.visible');

            header.clickLogo();
            cy.location('pathname').should('eq', '/');
          });
        });
      });
    });
  });
});