import HomePage, { CONSULTATION_ERROR_CLASS } from '../../pages/HomePage';

const MESSAGES = {
  required: 'Поле не може бути порожнім',
  invalidPhone: 'Телефон не пройшов валідацію',
};

const VALID_PHONE = '+380506743060';
const INVALID_PHONES = ['+38063 111 111', '+1 1111111111111'];

function verifyNameErrorState(hasError: boolean): void {
  HomePage.getConsultationNameInput()
    .invoke('attr', 'class')
    .should(hasError ? 'include' : 'not.include', CONSULTATION_ERROR_CLASS);
}

function verifyPhoneErrorState(hasError: boolean): void {
  HomePage.getConsultationPhoneInput()
    .invoke('attr', 'class')
    .should(hasError ? 'include' : 'not.include', CONSULTATION_ERROR_CLASS);
}

describe('Consultation form', () => {
  it('C226: Verify "У Вас залишилися питання?" form', () => {
    HomePage.open();

    HomePage.getConsultationForm().scrollIntoView().should('be.visible');

    HomePage.clickConsultationSubmit();
    verifyNameErrorState(true);
    verifyPhoneErrorState(true);
    HomePage.getConsultationNameError().should('have.text', MESSAGES.required);
    HomePage.getConsultationPhoneError().should('have.text', MESSAGES.required);

    HomePage.getConsultationNameInput().clear().type('Test');
    HomePage.clickConsultationSubmit();
    verifyNameErrorState(false);
    verifyPhoneErrorState(true);

    HomePage.getConsultationPhoneInput().click().should('have.value', '+380');

    HomePage.getConsultationPhoneInput().clear().type(VALID_PHONE);
    HomePage.getConsultationNameInput().clear();
    HomePage.clickConsultationSubmit();
    verifyNameErrorState(true);
    verifyPhoneErrorState(false);

    HomePage.getConsultationNameInput().clear().type('Test');
    INVALID_PHONES.forEach((phone) => {
      HomePage.getConsultationPhoneInput().clear().type(phone);
      HomePage.clickConsultationSubmit();
      verifyNameErrorState(false);
      verifyPhoneErrorState(true);
      HomePage.getConsultationPhoneError().should('have.text', MESSAGES.invalidPhone);
    });

    // 7-9. Not automated.
    // 7-8. Submit a valid phone, check the success modal and close it with "Ok" (needs the modal locators).
    //      Note: this creates a real feedback on the environment.
    // 9. Check the feedback in the admin panel (needs the admin page and the credentials from the environment variables,
    //    do not hardcode the password from the test case in the repository).
  });
});
