# 🧪 Playwright Test Automation Framework (TypeScript)

This is an end-to-end (E2E) test automation framework built using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/), designed for testing modern web applications with high performance, reliability, and scalability.

---

## 🚀 Tech Stack

- ✅ [Playwright](https://playwright.dev/)
- ✅ [TypeScript](https://www.typescriptlang.org/)
- ✅ [Playwright Test Runner](https://playwright.dev/docs/test-intro)
- ✅ [Allure Reporting (optional)](https://docs.qameta.io/allure/)
- ✅ Custom Fixtures, Page Object Model, Environment Management

---

## 📁 Project Structure
├── tests/ # Test specs
├── pages/ # Page Object Models
├── fixtures(e.g., loginPage, checkoutPage,...)
├── utils/ # Helpers: env, date-utils, expect-utils, locator-utils, price-utils, price-utils, style-utils.
├── data/ # billing-error-messages, departments, payment-methods, sort-type
├── config/ # Playwright config files
├── .env # Environment variables
├── playwright.config.ts # Main Playwright config
└── README.md

---

## 🛠 Installation

```bash
git clone https://github.com/tiennguyen-48319/Playwright.git
cd Playwright
npm install
```

## Run all tests: `npx playwright test`

## Run a specific test file: `npx playwright test tests/test-case-1.spec.ts`

## Run with headed browser: `npx playwright test --headed`

## Run with UI mode: `npx playwright test --ui`

# 🔐 Environment Setup
BASE_URL=https://demo.testarchitect.com/
DEFAULT_USER=garrus.amajae@fsitip.com
DEFAULT_PASSWORD=tienphucnguyen12345
PHONE_NUMBER=0901231567

# 📄 License
MIT

