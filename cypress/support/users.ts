export type Role = 'user' | 'phoneUser' | 'admin' | 'tenderOwner' | 'tenderBidder';

export interface Credentials {
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
