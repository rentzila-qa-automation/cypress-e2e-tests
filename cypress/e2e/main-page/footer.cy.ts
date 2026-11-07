import homePage from '../../pages/HomePage';
import header from '../../pages/components/Header';
import footer from '../../pages/components/Footer';
import tendersPage from '../../pages/TendersPage';
import unitsPage from '../../pages/UnitsPage';
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
    homePage.open();

    footer.getRoot().scrollIntoView().should('be.visible');
    footer.getLogo().should('be.visible').parents('a').should('not.exist');

    footer.getRoot().contains(TEXT.about).should('be.visible');

    footer.getLink('privacyPolicy').should('be.visible').and('contain.text', TEXT.privacyPolicy);
    footer.getLink('cookiePolicy').should('be.visible').and('contain.text', TEXT.cookiePolicy);
    footer.getLink('termsConditions').should('be.visible').and('contain.text', TEXT.termsConditions);

    footer.getRoot().contains(TEXT.users).should('be.visible');
    footer.getLink('units').should('be.visible').and('contain.text', TEXT.units);
    footer.getLink('tenders').should('be.visible').and('contain.text', TEXT.tenders);

    footer.getRoot().contains(TEXT.contacts).should('be.visible');
    footer.getEmail().should('be.visible').and('contain.text', EMAIL);

    footer.getLogo().should('be.visible');
    footer.getCopyright().should('be.visible').and('contain.text', TEXT.copyright);

    footer.clickLink('privacyPolicy');
    privacyPolicyPage.verifyUrl();
    privacyPolicyPage.getTitle().should('be.visible');

    footer.getRoot().scrollIntoView();
    footer.clickLink('cookiePolicy');
    cookiePolicyPage.verifyUrl();
    cookiePolicyPage.getTitle().should('be.visible');

    footer.getRoot().scrollIntoView();
    footer.clickLink('termsConditions');
    termsPage.verifyUrl();
    termsPage.getTitle().should('be.visible');

    footer.getRoot().scrollIntoView();
    footer.clickLink('units');
    unitsPage.verifyUrl();
    header.getSearchInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', TEXT.unitsSearchPlaceholder);

    header.clickLogo();
    cy.location('pathname').should('eq', '/');
    homePage.getHeroTitle().should('be.visible');

    footer.getRoot().scrollIntoView();
    footer.clickLink('tenders');
    tendersPage.verifyUrl();
    tendersPage.getSearchInput()
      .should('be.visible')
      .and('have.attr', 'placeholder', TEXT.tendersSearchPlaceholder);

    header.clickLogo();
    cy.location('pathname').should('eq', '/');

    footer.getRoot().scrollIntoView();
    footer.getEmail().should('have.attr', 'href', `mailto:${EMAIL}`);
  });
});