import HomePage from '../../pages/HomePage';
import Header from '../../pages//components/Header';
import Footer from '../../pages/components/Footer';
import TendersPage from '../../pages/TendersPage';

const TEXT = {
  about: 'Про нас',
  privacyPolicy: 'Політика конфіденційності',
  cookiePolicy: 'Правила використання файлів cookie',
  termsConditions: 'Умови доступу та користування',
  users: 'Користувачам',
  units: 'Оголошення',
  tenders: 'Тендери',
  contacts: 'Контакти',
  copyright: 'Усі права захищені',
  privacyTitle: 'Політика конфіденційності',
  cookieTitle: 'Політика використання файлів cookie',
  termsTitle: 'Угода користувача',
  unitsSearchPlaceholder: 'Пошук оголошень або послуг',
  tendersSearchPlaceholder: 'Пошук тендера за ключовими словами',
  mainPageText: 'Сервіс пошуку послуг спецтехніки',
};

const PATH = {
  privacyPolicy: '/privacy-policy/',
  cookiePolicy: '/cookie-policy/',
  termsConditions: '/terms-conditions/',

  units: '/products/',
  tenders: '/tenders-map/',
};

const EMAIL = 'info@rentzila.com.ua';

describe('Footer', () => {
  it('C214: Verify that all elements on the footer are displayed and all links are clickable', () => {
    HomePage.open();

    Footer.getRoot().scrollIntoView().should('be.visible');
    Footer.getLogo().should('be.visible').parents('a').should('not.exist');

    Footer.getRoot().contains(TEXT.about).should('be.visible');

    Footer.getLink('privacyPolicy').should('be.visible').and('contain.text', TEXT.privacyPolicy);
    Footer.getLink('cookiePolicy').should('be.visible').and('contain.text', TEXT.cookiePolicy);
    Footer.getLink('termsConditions').should('be.visible').and('contain.text', TEXT.termsConditions);

    Footer.getRoot().contains(TEXT.users).should('be.visible');
    Footer.getLink('units').should('be.visible').and('contain.text', TEXT.units);
    Footer.getLink('tenders').should('be.visible').and('contain.text', TEXT.tenders);

    Footer.getRoot().contains(TEXT.contacts).should('be.visible');
    Footer.getEmail().should('be.visible').and('contain.text', EMAIL);

    Footer.getLogo().should('be.visible');
    Footer.getCopyright().should('be.visible').and('contain.text', TEXT.copyright);

    Footer.clickLink('privacyPolicy');
    HomePage.verifyUrl(PATH.privacyPolicy);
    cy.contains('h1, h2', TEXT.privacyTitle).should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('cookiePolicy');
    HomePage.verifyUrl(PATH.cookiePolicy);
    cy.contains('h1, h2', TEXT.cookieTitle).should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('termsConditions');
    HomePage.verifyUrl(PATH.termsConditions);
    cy.contains('h1, h2', TEXT.termsTitle).should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('units');
    HomePage.verifyUrl(PATH.units);
    Header.getSearchInput().should('be.visible').and('have.attr', 'placeholder', TEXT.unitsSearchPlaceholder);

    Header.clickLogo();
    cy.location('pathname').should('eq', '/');
    cy.contains(TEXT.mainPageText).should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('tenders');
    HomePage.verifyUrl(PATH.tenders);
    TendersPage.getSearchInput().should('be.visible').and('have.attr', 'placeholder', TEXT.tendersSearchPlaceholder);

    Header.clickLogo();
    cy.location('pathname').should('eq', '/');

    Footer.getRoot().scrollIntoView();
    Footer.getEmail().should('have.attr', 'href', `mailto:${EMAIL}`);
  });
});
