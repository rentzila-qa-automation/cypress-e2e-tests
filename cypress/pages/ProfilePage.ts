import BasePage from './BasePage';
import { fillInput } from './fillInput';

const SEL = {
  fieldWrapper: '[data-testid="customInputWrapper"]',
  fieldInput: '[data-testid="custom-input"]',
  fieldStar: '[data-testid="customInputStar"]',
  personTypeWrapper: '[class*="OwnerProfileLegalType_type__"]',
  selectTitleStar: '[class*="OwnerProfileLegalType_title"] span',
  customSelect: '[data-testid="div_CustomSelect"]',
  selectOption: '[data-testid="item-customSelect"]',
  saveButton: '[data-testid="nextButton"]',
  fieldError: '[data-testid="descriptionError"]',
  fieldInputError: '[data-testid="custom-input"][class*="CustomInput_inputError"]',
  phoneInput: '[data-testid="input_OwnerProfileNumber"]',
  phoneError: '[data-testid="phoneError_OwnerProfileNumber"]',
  phoneInputError: '[data-testid="input_OwnerProfileNumber"][class*="OwnerProfileNumber_error"]',
};

export const PROFILE_TEXT = {
  surname: 'Прізвище',
  name: "Ім'я",
  middleName: 'По-батькові',
  telegram: 'Telegram',
  personType: 'Тип особи, до якої належите',
  legalEntity: 'Юридична особа',
  legalEntityType: 'Тип юридичної особи',
  legalEntityCode: 'ЄДРПОУ для юридичних осіб',
  privatePerson: 'Приватна особа',
  taxNumber: 'РНОКПП (ІПН)',
  fop: 'ФОП',
  fopTaxNumber: 'РНОКПП (ІПН) для ФОП',
  legalEntityName: 'Назва юридичної особи',
  city: 'Місто',
};

export const PROFILE_ERRORS = {
  legalEntityCodeTooShort: 'Код ЄДРПОУ не може бути коротше 8 символів',
  taxNumberTooShort: 'Код ІПН не може бути коротше 10 символів',
  surnameLettersOnly: 'Прізвище має містити лише літери',
  nameLettersOnly: "Ім'я має містити лише літери",
  middleNameLettersOnly: 'По-батькові має містити лише літери',
  invalidPhone: 'Некоректний номер телефону',
  required: 'Це поле обов’язкове',
  invalidCity: 'Некоректно введена назва населеного пункту',
  phoneNotVerified: 'Спочатку верифікуйте номер телефону',
};

class ProfilePage extends BasePage {
  protected readonly path = '/owner-cabinet/';

  getFieldInput(title: string) {
    return cy.contains(SEL.fieldWrapper, title).find(SEL.fieldInput);
  }

  fillField(title: string, value: string) {
    this.getFieldInput(title).should('be.visible').clear().type(value);
  }

  clearField(title: string) {
    this.getFieldInput(title).should('be.visible').clear();
  }

  getFieldStar(title: string) {
    return cy.contains(SEL.fieldWrapper, title).find(SEL.fieldStar);
  }

  getFieldError(title: string) {
    return cy.contains(SEL.fieldWrapper, title).find(SEL.fieldError);
  }

  getFieldInError(title: string) {
    return cy.contains(SEL.fieldWrapper, title).find(SEL.fieldInputError);
  }

  fillPhone(value: string) {
    fillInput(SEL.phoneInput, value);
  }

  getPhoneError() {
    return cy.get(SEL.phoneError);
  }

  getPhoneInError() {
    return cy.get(SEL.phoneInputError);
  }

  clickSave() {
    cy.get(SEL.saveButton).click();
  }

  getSelect(title: string) {
    return cy.contains(SEL.personTypeWrapper, title).find(SEL.customSelect);
  }

  getSelectStar(title: string) {
    return cy.contains(SEL.personTypeWrapper, title).find(SEL.selectTitleStar);
  }

  selectOption(title: string, option: string) {
    this.getSelect(title).click();
    cy.contains(SEL.selectOption, option).click();
  }
}

export default new ProfilePage();
