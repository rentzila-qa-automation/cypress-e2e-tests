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
    mapPage.getZoomLevel().then((before) => {
      mapPage.scrollZoomIn();
      mapPage
        .getMapTiles()
        .first()
        .invoke('attr', 'src')
        .should('include', `/256/${before + 1}/`);
      mapPage.scrollZoomOut();
      mapPage.getMapTiles().first().invoke('attr', 'src').should('include', `/256/${before}/`);
      mapPage.zoomIn();
      mapPage
        .getMapTiles()
        .first()
        .invoke('attr', 'src')
        .should('include', `/256/${before + 1}/`);
      mapPage.getZoomOutButton().should('have.attr', 'aria-disabled', 'false');
      mapPage.zoomOut();
      mapPage.getMapTiles().first().invoke('attr', 'src').should('include', `/256/${before}/`);
      mapPage.getZoomOutButton().should('have.attr', 'aria-disabled', 'true');
    });
  });
});
