import homePage from '../../pages/HomePage';
import mapPage, { MAP_TEXT } from '../../pages/MapPage';

describe('Map interaction', () => {
  beforeEach(() => {
    homePage.open();
    homePage.openMap();
    mapPage.getMap().should('be.visible');
  });

  it('C481: Switching from map to list', () => {
    mapPage.getShowListButton().should('be.visible').and('have.text', MAP_TEXT.showList);
    mapPage.showList();
    mapPage.getGridIcon().should('be.visible');
    mapPage.getMap().should('not.exist');
    mapPage.getShowMapButton().should('be.visible').and('have.text', MAP_TEXT.showMap);
    mapPage.showMap();
    mapPage.getMap().should('be.visible');
    mapPage.getShowListButton().should('be.visible').and('have.text', MAP_TEXT.showList);
  });

  it('C516: Drag and drop the map', () => {
    mapPage.getMapPaneOffsetX().then((before) => {
      mapPage.dragMap();
      mapPage.getMapPaneOffsetX().should((after) => {
        expect(Math.abs(after - before)).to.be.greaterThan(200);
      });
    });
  });

  it('C501: Zoom in and out on the map', () => {
    mapPage.getZoomLevel().then((initial) => {
      mapPage.scrollZoomIn();
      mapPage.shouldHaveZoomAbove(initial);
    });
    mapPage.getZoomLevel().then((zoomedIn) => {
      mapPage.scrollZoomOut();
      mapPage.shouldHaveZoomBelow(zoomedIn);
    });
    mapPage.getZoomLevel().then((current) => {
      mapPage.zoomIn();
      mapPage.shouldHaveZoomLevel(current + 1);
      mapPage.getZoomOutButton().should('have.attr', 'aria-disabled', 'false');
      mapPage.zoomOut();
      mapPage.shouldHaveZoomLevel(current);
      mapPage.getZoomOutButton().should('have.attr', 'aria-disabled', 'true');
    });
  });
});
