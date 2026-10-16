import homePage from '../../pages/HomePage';
import header from '../../pages/components/Header';
import footer from '../../pages/components/Footer';

describe('Smoke', () => {
  it('opens the home page with header, sections and footer', () => {
    homePage.open();
    header.getLogo().should('be.visible');
    header.getLoginButton().should('be.visible');
    homePage.getServiceItems().should('have.length.greaterThan', 0);
    homePage.getEquipmentItems().should('have.length.greaterThan', 0);
    footer.getCopyright().should('contain', 'Rentzila');
  });
});
