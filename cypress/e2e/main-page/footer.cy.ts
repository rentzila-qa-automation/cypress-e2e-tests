import HomePage from '../../pages/HomePage';
import Header from '../../pages/components/Header';
import Footer from '../../pages/components/Footer';
import TendersPage from '../../pages/TendersPage';
import UnitsPage from '../../pages/UnitsPage';
import { privacyPolicyPage, cookiePolicyPage, termsPage } from '../../pages/PolicyPage';

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
  unitsSearchPlaceholder: 'Пошук оголошень або послуг',
  tendersSearchPlaceholder: 'Пошук тендера за ключовими словами',
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
    privacyPolicyPage.verifyUrl();
    privacyPolicyPage.getTitle().should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('cookiePolicy');
    cookiePolicyPage.verifyUrl();
    cookiePolicyPage.getTitle().should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('termsConditions');
    termsPage.verifyUrl();
    termsPage.getTitle().should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('units');
    UnitsPage.verifyUrl();
    Header.getSearchInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', TEXT.unitsSearchPlaceholder);

    Header.clickLogo();
    cy.location('pathname').should('eq', '/');
    HomePage.getHeroTitle().should('be.visible');

    Footer.getRoot().scrollIntoView();
    Footer.clickLink('tenders');
    TendersPage.verifyUrl();
    TendersPage.getSearchInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', TEXT.tendersSearchPlaceholder);

    Header.clickLogo();
    cy.location('pathname').should('eq', '/');

    Footer.getRoot().scrollIntoView();
    Footer.getEmail().should('have.attr', 'href', `mailto:${EMAIL}`);
  });
});