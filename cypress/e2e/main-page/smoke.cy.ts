import HomePage from '../../pages/HomePage';
import Header from '../../pages/components/Header';
import Footer from '../../pages/components/Footer';

describe('Smoke', () => {
  it('opens the home page with header, sections and footer', () => {
    HomePage.open();
    Header.getLogo().should('be.visible');
    Header.getLoginButton().should('be.visible');
    HomePage.getServiceItems().should('have.length.greaterThan', 0);
    HomePage.getEquipmentItems().should('have.length.greaterThan', 0);
    Footer.getCopyright().should('contain', 'Rentzila');
  });
});
