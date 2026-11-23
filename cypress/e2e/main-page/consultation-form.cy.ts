import homePage, { CONSULTATION_ERROR_CLASS } from '../../pages/HomePage';
import { generateName, generateValidPhone, generateInvalidPhones } from '../../utils/ConsultationData';

const MESSAGES = {
  required: 'Поле не може бути порожнім',
  invalidPhone: 'Телефон не пройшов валідацію',
};

function verifyNameErrorState(hasError: boolean): void {
  homePage.getConsultationNameInput()
    .invoke('attr', 'class')
    .should(hasError ? 'include' : 'not.include', CONSULTATION_ERROR_CLASS);
}

function verifyPhoneErrorState(hasError: boolean): void {
  homePage.getConsultationPhoneInput()
    .invoke('attr', 'class')
    .should(hasError ? 'include' : 'not.include', CONSULTATION_ERROR_CLASS);
}

describe('Consultation form', () => {
  it('C226: Verify "У Вас залишилися питання?" form', () => {
    const name = generateName();
    const validPhone = generateValidPhone();
    const invalidPhones = generateInvalidPhones();
    cy.log(`Test data: name "${name}", valid phone "${validPhone}", invalid phones "${invalidPhones.join('", "')}"`);

    homePage.open();

    homePage.getConsultationForm().scrollIntoView().should('be.visible');

    homePage.clickConsultationSubmit();
    verifyNameErrorState(true);
    verifyPhoneErrorState(true);
    homePage.getConsultationNameError().should('have.text', MESSAGES.required);
    homePage.getConsultationPhoneError().should('have.text', MESSAGES.required);

    homePage.fillConsultationName(name);
    homePage.clickConsultationSubmit();
    verifyNameErrorState(false);
    verifyPhoneErrorState(true);

    homePage.getConsultationPhoneInput().click().should('have.value', '+380');

    homePage.fillConsultationPhone(validPhone);
    homePage.fillConsultationName('');
    homePage.clickConsultationSubmit();
    verifyNameErrorState(true);
    verifyPhoneErrorState(false);

    homePage.fillConsultationName(name);
    invalidPhones.forEach((phone) => {
      homePage.fillConsultationPhone(phone);
      homePage.clickConsultationSubmit();
      verifyNameErrorState(false);
      verifyPhoneErrorState(true);
      homePage.getConsultationPhoneError().should('have.text', MESSAGES.invalidPhone);
    });

    // 7-9. Not automated.
    // 7-8. Submit a valid phone, check the success modal and close it with "Ok" (needs the modal locators).
    //      Note: this creates a real feedback on the environment.
    // 9. Check the feedback in the admin panel (needs the admin page and the credentials from the environment variables,
    //    do not hardcode the password from the test case in the repository).
  });
});