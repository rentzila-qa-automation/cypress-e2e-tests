import profilePage, { PROFILE_TEXT } from '../../pages/ProfilePage';
import { fieldLimits } from '../../fixtures/profile.json';

const longString = 'A'.repeat(Math.max(...Object.values(fieldLimits)) + 1);
const longDigits = '3'.repeat(fieldLimits.taxNumber + 1);

describe('Profile: Basic Information', () => {
  beforeEach(() => {
    cy.loginAs('user');
    profilePage.open();
  });

  describe('Field length limits', () => {
    it("C357: Verify that user is unable to input more than 25 letters in Прізвище/Ім'я/По-батькові fields", () => {
      [PROFILE_TEXT.surname, PROFILE_TEXT.middleName, PROFILE_TEXT.name].forEach((fieldName) => {
        profilePage.fillField(fieldName, longString);
        profilePage.getFieldInput(fieldName).should('have.value', longString.slice(0, fieldLimits.fullName));
      });
    });

    it("C358: Verify that user unable to input more than 30 symbols in 'Telegram' field", () => {
      profilePage.fillField(PROFILE_TEXT.telegram, longString);
      profilePage.getFieldInput(PROFILE_TEXT.telegram).should('have.value', longString.slice(0, fieldLimits.telegram));
    });

    it("C361: Verify that user unable to input more than 8 digits in 'ЄДРПОУ для юридичних осіб' field", () => {
      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.legalEntity);
      profilePage.fillField(PROFILE_TEXT.legalEntityCode, longDigits);
      profilePage
        .getFieldInput(PROFILE_TEXT.legalEntityCode)
        .should('have.value', longDigits.slice(0, fieldLimits.legalEntityCode));
    });

    it("C362: Verify that user unable to input more than 10 digits in 'РНОКПП (ІПН)' field", () => {
      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.privatePerson);
      profilePage.fillField(PROFILE_TEXT.taxNumber, longDigits);
      profilePage
        .getFieldInput(PROFILE_TEXT.taxNumber)
        .should('have.value', longDigits.slice(0, fieldLimits.taxNumber));
    });
  });
});
