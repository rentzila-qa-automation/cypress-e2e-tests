import BasePage from './BasePage';

export class PolicyPage extends BasePage {
  constructor(
    protected readonly path: string,
    private readonly title: string,
  ) {
    super();
  }

  getTitle() {
    return cy.contains('h1, h2', this.title);
  }
}

export const privacyPolicyPage = new PolicyPage('/privacy-policy/', 'Політика конфіденційності');
export const cookiePolicyPage = new PolicyPage('/cookie-policy/', 'Політика використання файлів cookie');
export const termsPage = new PolicyPage('/terms-conditions/', 'Угода користувача');