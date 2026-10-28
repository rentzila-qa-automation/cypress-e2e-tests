import BasePage from './BasePage';

const SEL = {
  map: '#map',
  showListButton: '[class*="MapListSwitcher_switch"]',
  gridIcon: '[data-testid="gridIcon"]',
  showMapButton: '[data-testid="switch"] button',
  mapPane: '.leaflet-map-pane',
  zoomInButton: '.leaflet-control-zoom-in',
  zoomOutButton: '.leaflet-control-zoom-out',
  mapTiles: '.leaflet-tile',
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

  getMapPane() {
    return cy.get(SEL.mapPane);
  }

  getShowListButton() {
    return cy.get(SEL.showListButton);
  }

  getZoomInButton() {
    return cy.get(SEL.zoomInButton);
  }

  getZoomOutButton() {
    return cy.get(SEL.zoomOutButton);
  }

  getMapTiles() {
    return cy.get(SEL.mapTiles);
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

  zoomIn(): void {
    this.getMapPane().should('not.have.class', 'leaflet-zoom-anim');
    this.getZoomInButton().click();
  }

  zoomOut(): void {
    this.getMapPane().should('not.have.class', 'leaflet-zoom-anim');
    this.getZoomOutButton().click();
  }

  scrollZoomIn(): void {
    this.getMapPane().should('not.have.class', 'leaflet-zoom-anim');
    this.getMap().trigger('wheel', 'center', { eventConstructor: 'WheelEvent', deltaY: -100 });
  }

  scrollZoomOut(): void {
    this.getMapPane().should('not.have.class', 'leaflet-zoom-anim');
    this.getMap().trigger('wheel', 'center', { eventConstructor: 'WheelEvent', deltaY: 100 });
  }

  dragMap(): void {
    this.getMap().trigger('mousedown', 'center', { eventConstructor: 'MouseEvent', button: 0 });
    this.getMap().trigger('mousemove', 100, 100, { eventConstructor: 'MouseEvent', button: 0 });
    this.getMap().trigger('mouseup', 100, 100, { eventConstructor: 'MouseEvent', button: 0 });
  }

  getMapPaneOffsetX() {
    return this.getMapPane()
      .invoke('attr', 'style')
      .then((style) => {
        const match = String(style).match(/translate3d\((-?[\d.]+)px/);
        return Number(match?.[1]);
      });
  }

  getZoomLevel() {
    return this.getMapTiles()
      .first()
      .invoke('attr', 'src')
      .then((src) => {
        const match = String(src).match(/\/256\/(\d+)\//);
        return Number(match?.[1]);
      });
  }
}

export default new MapPage();
