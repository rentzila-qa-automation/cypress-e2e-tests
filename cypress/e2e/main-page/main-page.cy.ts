import HomePage from '../../pages/HomePage';
import Header from '../../pages/components/Header';

const EXPECTED_ITEMS_COUNT = 7;
const UNITS_PATH = '/products/';

describe('Main page: equipment section', () => {
  it('C213: Checking "Спецтехніка" section on the main page', () => {
    HomePage.open();
    HomePage.getEquipmentTabs().first().scrollIntoView().should('be.visible').and('contain.text', 'Популярна');
    HomePage.getEquipmentItems().should('have.length', EXPECTED_ITEMS_COUNT).and('be.visible');

    HomePage.getEquipmentItems().first().click();
    HomePage.verifyUrl(UNITS_PATH);

    Header.clickLogo();
    cy.location('pathname').should('eq', '/');
    HomePage.getEquipmentTabs()
      .its('length')
      .then((tabsCount) => {
        Cypress._.times(tabsCount, (tabIndex) => {
          HomePage.getEquipmentTabs().eq(tabIndex).click();
          HomePage.getEquipmentItems().should('have.length.greaterThan', 0);

          HomePage.getEquipmentItems()
            .its('length')
            .then((itemsCount) => {
              Cypress._.times(itemsCount, (itemIndex) => {
                HomePage.getEquipmentTabs().eq(tabIndex).click();
                HomePage.getEquipmentItems().eq(itemIndex).click();
                HomePage.verifyUrl(UNITS_PATH);

                Header.clickLogo();
                cy.location('pathname').should('eq', '/');
              });
            });
        });
      });
  });
});
