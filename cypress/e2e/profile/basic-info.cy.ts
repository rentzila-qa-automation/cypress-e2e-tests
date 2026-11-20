import profilePage, { PROFILE_ERRORS, PROFILE_TEXT } from '../../pages/ProfilePage';
import { fieldLimits, invalidValues } from '../../fixtures/profile.json';

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

  describe('Validation messages', () => {
    const checkRequiredFieldsShown = (fields: string[]) => {
      fields.forEach((field) => {
        profilePage.getFieldInput(field).should('be.visible');
        profilePage.getFieldStar(field).should('have.text', '*');
      });
    };

    const checkLegalEntityFieldsShown = () => {
      profilePage.getSelect(PROFILE_TEXT.legalEntityType).should('be.visible');
      profilePage.getSelectStar(PROFILE_TEXT.legalEntityType).should('have.text', '*');
      checkRequiredFieldsShown([PROFILE_TEXT.legalEntityCode, PROFILE_TEXT.legalEntityName]);
    };

    it("C350: Verify that validation message 'Код ЄДРПОУ не може бути коротше 8 символів' appears when user input less than 8 digits", () => {
      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.legalEntity);
      checkLegalEntityFieldsShown();

      profilePage.fillField(PROFILE_TEXT.legalEntityCode, invalidValues.shortLegalEntityCode);
      profilePage.getFieldInput(PROFILE_TEXT.legalEntityCode).should('have.value', invalidValues.shortLegalEntityCode);

      profilePage.clickSave();

      profilePage.getFieldInError(PROFILE_TEXT.legalEntityCode).should('be.visible');
      profilePage
        .getFieldError(PROFILE_TEXT.legalEntityCode)
        .should('have.text', PROFILE_ERRORS.legalEntityCodeTooShort);
    });

    it("C351: Verify that validation message 'Код ІПН не може бути коротше 10 символів' appears when user input less than 10 digits", () => {
      [
        { personType: PROFILE_TEXT.fop, field: PROFILE_TEXT.fopTaxNumber },
        { personType: PROFILE_TEXT.privatePerson, field: PROFILE_TEXT.taxNumber },
      ].forEach(({ personType, field }) => {
        profilePage.selectOption(PROFILE_TEXT.personType, personType);
        profilePage.fillField(field, invalidValues.shortTaxNumber);
        profilePage.clickSave();
        profilePage.getFieldInError(field).should('be.visible');
        profilePage.getFieldError(field).should('have.text', PROFILE_ERRORS.taxNumberTooShort);
      });
    });

    it("C352: Verify that validation messages appear when user inputs symbols in 'Прізвище', 'Ім'я', 'По-батькові' fields", () => {
      [
        { field: PROFILE_TEXT.surname, error: PROFILE_ERRORS.surnameLettersOnly },
        { field: PROFILE_TEXT.name, error: PROFILE_ERRORS.nameLettersOnly },
        { field: PROFILE_TEXT.middleName, error: PROFILE_ERRORS.middleNameLettersOnly },
      ].forEach(({ field, error }) => {
        invalidValues.nonLetters.forEach((value) => {
          profilePage.fillField(field, value);
          profilePage.getFieldError(field).should('not.exist');
          profilePage.clickSave();
          profilePage.getFieldInError(field).should('be.visible');
          profilePage.getFieldError(field).should('have.text', error);
        });
      });
    });

    it("C355: Verify that validation message 'Некоректний номер телефону' appears when user inputs less than 9 digits after '+380' and non-existent operator code", () => {
      [invalidValues.shortPhone, invalidValues.unknownOperatorPhone].forEach((phone) => {
        profilePage.fillPhone(phone);
        profilePage.getPhoneInError().should('be.visible');
        profilePage.getPhoneError().should('have.text', PROFILE_ERRORS.invalidPhone);
      });
    });

    it("C349: Verify that validation message 'Це поле обов'язкове' appears when user clicks 'Зберегти' with empty mandatory fields", () => {
      const saveAndCheckRequired = (fields: string[]) => {
        profilePage.clickSave();
        fields.forEach((field) => {
          profilePage.getFieldInError(field).should('be.visible');
          profilePage.getFieldError(field).should('have.text', PROFILE_ERRORS.required);
        });
      };

      [PROFILE_TEXT.surname, PROFILE_TEXT.name].forEach((field) => profilePage.clearField(field));
      saveAndCheckRequired([PROFILE_TEXT.surname, PROFILE_TEXT.name]);

      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.fop);
      checkRequiredFieldsShown([PROFILE_TEXT.fopTaxNumber]);
      profilePage.clearField(PROFILE_TEXT.fopTaxNumber);
      saveAndCheckRequired([PROFILE_TEXT.fopTaxNumber]);

      profilePage.selectOption(PROFILE_TEXT.personType, PROFILE_TEXT.legalEntity);
      checkLegalEntityFieldsShown();
      [PROFILE_TEXT.legalEntityCode, PROFILE_TEXT.legalEntityName].forEach((field) => profilePage.clearField(field));
      saveAndCheckRequired([PROFILE_TEXT.legalEntityCode, PROFILE_TEXT.legalEntityName]);
    });

    it("C359: Verify that 'Некоректно введена назва населеного пункту' appears when user fills 'Населений пункт' with random input", () => {
      invalidValues.invalidCities.forEach((city) => {
        profilePage.fillField(PROFILE_TEXT.city, city);
        profilePage.getFieldInput(PROFILE_TEXT.city).should('have.value', city);
        profilePage.clickSave();
        profilePage.getFieldInError(PROFILE_TEXT.city).should('be.visible');
        profilePage.getFieldError(PROFILE_TEXT.city).should('have.text', PROFILE_ERRORS.invalidCity);

        cy.reload();
        profilePage.getFieldInput(PROFILE_TEXT.surname).should('not.have.value', '');
        profilePage.getFieldInput(PROFILE_TEXT.city).should('not.have.value', city);
      });
    });

    it("C525: Verify validation message when a user clicks 'Зберегти' without a confirmed phone number", () => {
      profilePage.clearField(PROFILE_TEXT.surname);
      profilePage.fillPhone(invalidValues.unverifiedPhone);
      profilePage.clickSave();
      profilePage.getPhoneInError().should('be.visible');
      profilePage.getPhoneError().should('have.text', PROFILE_ERRORS.phoneNotVerified);
    });
  });
});
