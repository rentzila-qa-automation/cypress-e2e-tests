// Collected from dev.rentzilla.com.ua.
const SEL = {
  root: '[class*="Footer_footer"]',
  aboutTitle: '[data-testid="content"]',
  privacyPolicy: '[data-testid="politika-konfidenciinosti"] a',
  cookiePolicy: '[data-testid="pravila-vikoristannya-failiv-cookie"] a',
  termsConditions: '[data-testid="umovi-dostupu-ta-koristuvannya"] a',
  units: '[data-testid="ogoloshennya"] a',
  tenders: '[data-testid="tenderi"] a',
  requests: '[data-testid="zapiti-na-robotu"] a',
  email: '[class*="Footer_footer"] a[href^="mailto:"]',
  logo: '[class*="Footer_footer"] [data-testid="logo"]',
  copyright: '[data-testid="copyright"]',
};

export type FooterLink = 'privacyPolicy' | 'cookiePolicy' | 'termsConditions' | 'units' | 'tenders' | 'requests';

class Footer {
  getRoot() {
    return cy.get(SEL.root);
  }

  getLink(link: FooterLink) {
    return cy.get(SEL[link]);
  }

  getEmail() {
    return cy.get(SEL.email);
  }

  getLogo() {
    return cy.get(SEL.logo);
  }

  getCopyright() {
    return cy.get(SEL.copyright);
  }

  clickLink(link: FooterLink): void {
    this.getLink(link).click();
  }
}

export default new Footer();
