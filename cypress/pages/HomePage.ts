import BasePage from './BasePage';
import { fillInput } from './fillInput';

const SEL = {
  searchInput: 'main [data-testid="searchInput"]',
  mapButton: '[data-testid="mapButton"]',
  serviceTabs: '[data-testid^="services__"]',
  serviceItems: '[data-testid^="service__"]',
  equipmentTabs: '[data-testid^="specialEquipment__"]',
  equipmentItems: '[data-testid^="category__"]',
  telegramBannerClose: '[data-testid="crossButton"]',
  consultationName: 'input[name="name"]',
  consultationPhone: '#mobile',
  consultationSubmit: 'form[class*="ConsultationForm_form"] button',
};

class HomePage extends BasePage {
  protected readonly path = '/';

  getSearchInput() {
    return cy.get(SEL.searchInput);
  }

  getServiceTabs() {
    return cy.get(SEL.serviceTabs);
  }

  getServiceItems() {
    return cy.get(SEL.serviceItems);
  }

  getEquipmentTabs() {
    return cy.get(SEL.equipmentTabs);
  }

  getEquipmentItems() {
    return cy.get(SEL.equipmentItems);
  }

  getConsultationNameInput() {
    return cy.get(SEL.consultationName);
  }

  getConsultationPhoneInput() {
    return cy.get(SEL.consultationPhone);
  }

  selectServiceTab(id: string): void {
    cy.get(`[data-testid="services__${id}"]`).click();
  }

  selectEquipmentTab(id: string): void {
    cy.get(`[data-testid="specialEquipment__${id}"]`).click();
  }

  search(text: string): void {
    this.getSearchInput().clear().type(`${text}{enter}`);
  }

  openMap(): void {
    cy.get(SEL.mapButton).click();
  }

  closeTelegramBanner(): void {
    cy.get(SEL.telegramBannerClose).click();
  }

  submitConsultation(name: string, phone: string): void {
    fillInput(SEL.consultationName, name);
    fillInput(SEL.consultationPhone, phone);
    cy.get(SEL.consultationSubmit).click();
  }
}

export default new HomePage();
