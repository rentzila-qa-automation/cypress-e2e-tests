// Collected from dev.rentzilla.com.ua (desktop, 1440px).
const SEL = {
  root: 'header',
  logo: 'header [data-testid="logo"]',
  linkUnits: 'header a[href="/products/"]',
  linkRequests: 'header a[href="/requests-map/"]',
  linkTenders: 'header a[href="/tenders-map/"]',
  addUnitButton: 'header a[href="/create-unit/"]',
  searchInput: 'header [data-testid="searchInput"]',
  loginButton: '[class*="NavbarAuthBlock_buttonEnter"]',
};

// Visible only to a logged-in user. TODO (when test accounts are issued):
// collect these on the site and replace null with the selector.
const SEL_LOGGED_IN: Record<'userIcon' | 'userDropdown' | 'userDropdownEmail' | 'adminIcon', string | null> = {
  userIcon: null,
  userDropdown: null,
  userDropdownEmail: null,
  adminIcon: null,
};

function loggedIn(key: keyof typeof SEL_LOGGED_IN): string {
  const selector = SEL_LOGGED_IN[key];
  if (!selector) {
    throw new Error(`Header locator "${key}" is not collected yet (needs a test account). See Header.ts.`);
  }
  return selector;
}

const TEXT = {
  myProfile: 'Мій профіль',
  myUnits: 'Мої оголошення',
  logout: 'Вихід',
};

class Header {
  getRoot() {
    return cy.get(SEL.root);
  }

  getLogo() {
    return cy.get(SEL.logo);
  }

  getLoginButton() {
    return cy.get(SEL.loginButton);
  }

  getAddUnitButton() {
    return cy.get(SEL.addUnitButton);
  }

  getSearchInput() {
    return cy.get(SEL.searchInput);
  }

  getUserIcon() {
    return cy.get(loggedIn('userIcon'));
  }

  getDropdownEmail() {
    return cy.get(loggedIn('userDropdownEmail'));
  }

  clickLogo(): void {
    this.getLogo().click();
  }

  goToUnits(): void {
    cy.get(SEL.linkUnits).click();
  }

  goToRequests(): void {
    cy.get(SEL.linkRequests).click();
  }

  goToTenders(): void {
    cy.get(SEL.linkTenders).click();
  }

  clickAddUnit(): void {
    this.getAddUnitButton().click();
  }

  openLoginPopup(): void {
    this.getLoginButton().should('be.visible').click();
  }

  openUserMenu(): void {
    this.getUserIcon().should('be.visible').click();
  }

  goToMyProfile(): void {
    this.openUserMenu();
    cy.contains(loggedIn('userDropdown'), TEXT.myProfile).click();
  }

  goToMyUnits(): void {
    this.openUserMenu();
    cy.contains(loggedIn('userDropdown'), TEXT.myUnits).click();
  }

  logout(): void {
    this.openUserMenu();
    cy.contains(loggedIn('userDropdown'), TEXT.logout).click();
  }

  openAdminPanel(): void {
    cy.get(loggedIn('adminIcon')).click();
  }
}

export default new Header();
