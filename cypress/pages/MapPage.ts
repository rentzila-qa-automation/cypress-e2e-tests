import BasePage from './BasePage';

const SEL = {
  map: '#map',
  showListButton: '[class*="MapListSwitcher_switch"]',
  gridIcon: '[data-testid="gridIcon"]',
  showMapButton: '[data-testid="switch"] button',
};

export const MAP_TEXT = {
  showList: 'Показати список',
  showMap: 'Показати на мапі',
};

class MapPage extends BasePage {
  protected readonly path = '/products/';

  getMap() {
    return cy.get(SEL.map);
  }

  getShowListButton() {
    return cy.get(SEL.showListButton);
  }

  getGridIcon() {
    return cy.get(SEL.gridIcon);
  }

  getShowMapButton() {
    return cy.get(SEL.showMapButton);
  }

  showList(): void {
    this.getShowListButton().click();
  }

  showMap(): void {
    this.getShowMapButton().click();
  }
}

export default new MapPage();
