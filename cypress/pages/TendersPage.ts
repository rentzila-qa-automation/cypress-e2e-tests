import BasePage from './BasePage';

const SEL = {
  searchInput: '[data-testid="search"]',
};

class TendersPage extends BasePage {
  protected readonly path = '/tenders-map/';

  getSearchInput() {
    return cy.get(SEL.searchInput);
  }
}

export default new TendersPage();
