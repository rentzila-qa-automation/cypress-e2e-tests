import BasePage from './BasePage';

const SEL = {
  fieldWrapper: '[data-testid="customInputWrapper"]',
  fieldInput: '[data-testid="custom-input"]',
  personTypeWrapper: '[class*="OwnerProfileLegalType_type__"]',
  customSelect: '[data-testid="div_CustomSelect"]',
  selectOption: '[data-testid="item-customSelect"]',
};

export const PROFILE_TEXT = {
  surname: 'Прізвище',
  name: "Ім'я",
  middleName: 'По-батькові',
  telegram: 'Telegram',
  personType: 'Тип особи, до якої належите',
  legalEntity: 'Юридична особа',
  legalEntityCode: 'ЄДРПОУ для юридичних осіб',
  privatePerson: 'Приватна особа',
  taxNumber: 'РНОКПП (ІПН)',
};

class ProfilePage extends BasePage {
  protected readonly path = '/owner-cabinet/';

  getFieldInput(title: string) {
    return cy.contains(SEL.fieldWrapper, title).find(SEL.fieldInput);
  }

  fillField(title: string, value: string) {
    this.getFieldInput(title).should('be.visible').clear().type(value);
  }

  getSelect(title: string) {
    return cy.contains(SEL.personTypeWrapper, title).find(SEL.customSelect);
  }

  selectOption(title: string, option: string) {
    this.getSelect(title).click();
    cy.contains(SEL.selectOption, option).click();
  }
}

export default new ProfilePage();
