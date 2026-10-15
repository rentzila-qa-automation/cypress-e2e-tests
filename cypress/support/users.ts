/**
 * Test accounts. Values come from cypress.env.json (not committed).
 * Copy cypress.env.example.json to cypress.env.json and fill it in.
 *
 * user          private person registered by email (most tests, C561)
 * phoneUser     account registered by phone number (C202, C333, C386)
 * admin         superuser for /admin pages
 * tenderOwner   ФОП or Юридична особа that creates tenders (C231)
 * tenderBidder  another ФОП or Юридична особа that makes offers (C246, C247)
 */
export type Role = 'user' | 'phoneUser' | 'admin' | 'tenderOwner' | 'tenderBidder';

export interface Credentials {
  /** Email or phone number, as typed into the "E-mail або номер телефону" field. */
  login: string;
  password: string;
}

export function getUser(role: Role): Credentials {
  const users = (Cypress.env('users') ?? {}) as Partial<Record<Role, Credentials>>;
  const creds = users[role];
  if (!creds?.login || !creds?.password) {
    throw new Error(
      `No credentials for "${role}". Fill users.${role} in cypress.env.json (see cypress.env.example.json).`,
    );
  }
  return creds;
}
