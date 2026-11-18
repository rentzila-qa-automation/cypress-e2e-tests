import profilePage, { PROFILE_TEXT } from '../../pages/ProfilePage';

const FIELD_LIMITS = {
  fullName: 25,
  telegram: 30,
  legalEntityCode: 8,
  taxNumber: 10,
};

const longString = 'A'.repeat(Math.max(...Object.values(FIELD_LIMITS)) + 1);
const longDigits = '3'.repeat(FIELD_LIMITS.taxNumber + 1);

describe('Profile: Basic Information', () => {
  beforeEach(() => {
    cy.loginAs('user');
    profilePage.open();
  });

  describe('Field length limits', () => {
    it("C357: Verify that user is unable to input more than 25 letters in Прізвище/Ім'я/По-батькові fields", () => {
      [PROFILE_TEXT.surname, PROFILE_TEXT.middleName, PROFILE_TEXT.name].forEach((fieldName) => {
        profilePage
          .getFieldInput(fieldName)
          .clear()
          .type(longString)
          .should('have.value', longString.slice(0, FIELD_LIMITS.fullName));
      });
    });

    it("C358: Verify that user unable to input more than 30 symbols in 'Telegram' field", () => {
      profilePage
        .getFieldInput(PROFILE_TEXT.telegram)
        .clear()
        .type(longString)
        .should('have.value', longString.slice(0, FIELD_LIMITS.telegram));
    });

    it("C361: Verify that user unable to input more than 8 digits in 'ЄДРПОУ для юридичних осіб' field", () => {
      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.legalEntity);
      profilePage
        .getFieldInput(PROFILE_TEXT.legalEntityCode)
        .clear()
        .type(longDigits)
        .should('have.value', longDigits.slice(0, FIELD_LIMITS.legalEntityCode));
    });

    it("C362: Verify that user unable to input more than 10 digits in 'РНОКПП (ІПН)' field", () => {
      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.privatePerson);
      profilePage
        .getFieldInput(PROFILE_TEXT.taxNumber)
        .clear()
        .type(longDigits)
        .should('have.value', longDigits.slice(0, FIELD_LIMITS.taxNumber));
    });
  });
});
