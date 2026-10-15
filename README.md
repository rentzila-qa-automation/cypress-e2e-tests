# Rentzila Cypress E2E Tests

End-to-end test automation for [Rentzila](https://rentzila.com.ua/) built with Cypress and TypeScript.
Team project of the Luxe Quality trainee program.

## Tech stack

- [Cypress](https://www.cypress.io/)
- TypeScript
- Node.js
- [@faker-js/faker](https://fakerjs.dev/) for test data

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- npm (comes with Node.js)
- Git

## Getting started

```bash
git clone https://github.com/rentzila-qa-automation/cypress-e2e-tests.git
cd cypress-e2e-tests
npm install
cp cypress.env.example.json cypress.env.json   # then fill in test accounts
npm run cy:open
```

`cypress.env.json` is in `.gitignore`. Never commit credentials.

## Test accounts

Fill `users` in `cypress.env.json`. `login` is an email or a phone number, as typed into the login form.

| Role | Account | Used in |
|---|---|---|
| `user` | Private person, registered by email | Most tests |
| `phoneUser` | Registered by phone number | C202, C333, C386 |
| `admin` | Superuser | Admin pages |
| `tenderOwner` | ФОП or Юридична особа | Creating tenders (C231) |
| `tenderBidder` | Another ФОП or Юридична особа | Offers (C246, C247) |

In a test:

```ts
beforeEach(() => {
  cy.loginAs('user');
  cy.visit('/owner-cabinet/');
});
```

A missing account fails the test with a message saying which role to fill in.

**Waiting for test accounts:**
- Header elements for a logged-in user (avatar, profile menu, admin icon) are `null` in `Header.ts`. Calling them fails with a clear message until they are collected.
- `cy.loginAs` logs in through the UI. Switch to `cy.request` once we see where the app stores the token.

## Scripts

| Command | What it does |
|---|---|
| `npm run cy:open` | Opens the Cypress runner |
| `npm run cy:run` | Runs all specs headless |
| `npm run typecheck` | Checks TypeScript types |

## Project structure

```
cypress/
  e2e/                 specs, one folder per test group
    auth/  main-page/  create-unit/  my-units/
    map-search/  tenders/  profile/  admin/
  pages/               page objects
    BasePage.ts        shared actions (open, click, fill, verifyUrl)
    components/        parts used on many pages (Header, AuthPopup, Footer)
  fixtures/            static test data
  support/
    users.ts           test account roles, getUser(role)
    commands.ts        cy.loginAs(role), cy.logout()
cypress.config.ts      baseUrl, timeouts, retries
```

Example spec with all conventions: `cypress/e2e/auth/login-validation.cy.ts`

## Conventions

**Locators**
- Locators live only in page objects, never in spec files.
- Keep them as constants at the top of the page object file and resolve them inside methods.
- Priority: `data-testid` > `id` / `name` / `href` > class > text (`cy.contains`). Avoid long CSS chains.
- Some `data-testid` repeat on a page (`logo`, `searchInput` exist in both header and footer/main). Scope them: `header [data-testid="logo"]`.
- Class names have a generated hash (`NavbarAuthBlock_buttonEnter__c9siH`) that changes on rebuild. Match only the stable part: `[class*="NavbarAuthBlock_buttonEnter"]`.
- If a spec needs an element for an assertion, add a `getXxx()` method to the page object.

**Specs**
- One test case = one `it`, with the TestRail ID in the title: `it('C201 Authorization with valid email and password', ...)`.
- Use `cy.loginAs(role)` instead of logging in through the UI in every test (except auth tests).
- Use faker for non-critical data (names, emails, descriptions).
- No `cy.wait(<ms>)`. Wait for elements, or for requests with `cy.intercept(...).as('x')` + `cy.wait('@x')`.
- Tests must not depend on each other. Create the data a test needs (unit, tender) in `beforeEach` and clean it up after.

**Cypress commands**
- Page interactions go into page objects. `support/commands.ts` is only for helpers that do not belong to one page (login, API data setup).

## Workflow

- The `main` branch is protected: direct pushes are not allowed.
- Create a separate branch for each task.
- Branch naming: `<your-name>/<group>-<short-name>`, for example `hryhorii/auth-login-tests`.
- When your work is ready, open a Pull Request to `main` and fill in the PR template (description + link to the task).
- Every Pull Request needs at least **1 approval** from a teammate before merging.
- If new commits are pushed after approval, the approval is dismissed and a new review is required.

## Team

- Bohdan - [@havrybo](https://github.com/havrybo)
