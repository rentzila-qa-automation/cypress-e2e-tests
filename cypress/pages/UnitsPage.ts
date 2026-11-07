import BasePage from './BasePage';

const SEL = {
  selectedCategory: '[class*="ResetFilters_selectedCategory"]',
};

class UnitsPage extends BasePage {
  protected readonly path = '/products/';

  getSelectedCategory() {
    return cy.get(SEL.selectedCategory);
  }
}

export default new UnitsPage();