import { faker } from '@faker-js/faker';

const OPERATOR_CODES = ['50', '63', '95', '96'];

export function generateName(): string {
  return faker.person.firstName();
}

export function generateValidPhone(): string {
  return `+380${faker.helpers.arrayElement(OPERATOR_CODES)}${faker.string.numeric(7)}`;
}

export function generateInvalidPhones(): string[] {
  return [`+380${faker.string.numeric(5)}`, `+1 ${faker.string.numeric(13)}`];
}