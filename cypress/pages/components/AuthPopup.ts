import { fillInput } from '../fillInput';

export const AUTH_MESSAGES = {
  required: 'Поле не може бути порожнім',
  invalidCredentials: 'Невірний e-mail або пароль',
  invalidFormat: 'Неправильний формат email або номера телефону',
};

const SEL = {
  root: '[data-testid="loginPopup"]',
  title: '[data-testid="authorizationTitle"]',
  closeButton: '[data-testid="authClose"]',
  loginInput: '#email',
  registrationEmailInput: '#login',
  passwordInput: '#password',
  showPasswordIcon: '[data-testid="reactHookButton"]',
  submitButton: '[data-testid="loginPopup"] button[type="submit"]',
  googleButton: '[class*="AuthorizationGoogle_button"]',
  switcher: '[data-testid="switcher"]',
  agreementCheckbox: '#registration',
  fieldError: '[class*="CustomReactHookInput_error_message"]',
  formError: '[data-testid="errorMessage"]',
};

export const ERROR_INPUT_CLASS = 'CustomReactHookInput_error_input';

class AuthPopup {
  getRoot() {
    return cy.get(SEL.root);
  }

  getTitle() {
    return cy.get(SEL.title);
  }

  getLoginInput() {
    return cy.get(SEL.loginInput);
  }

  getRegistrationEmailInput() {
    return cy.get(SEL.registrationEmailInput);
  }

  getPasswordInput() {
    return cy.get(SEL.passwordInput);
  }

  getSubmitButton() {
    return cy.get(SEL.submitButton);
  }

  getFieldErrors() {
    return cy.get(SEL.fieldError);
  }

  getFormError() {
    return cy.get(SEL.formError);
  }

  fillLogin(value: string): void {
    fillInput(SEL.loginInput, value);
  }

  fillRegistrationEmail(value: string): void {
    fillInput(SEL.registrationEmailInput, value);
  }

  fillPassword(value: string): void {
    fillInput(SEL.passwordInput, value, { log: false });
  }

  submit(): void {
    this.getSubmitButton().click();
  }

  login(login: string, password: string): void {
    this.fillLogin(login);
    this.fillPassword(password);
    this.submit();
  }

  togglePasswordVisibility(): void {
    cy.get(SEL.showPasswordIcon).click();
  }

  switchForm(): void {
    cy.get(SEL.switcher).click();
  }

  acceptAgreement(): void {
    cy.get(SEL.agreementCheckbox).check();
  }

  clickForgotPassword(): void {
    cy.get(SEL.root).contains('Забули пароль?').click();
  }

  clickGoogle(): void {
    cy.get(SEL.googleButton).click();
  }

  close(): void {
    cy.get(SEL.closeButton).click();
  }
}

export default new AuthPopup();
