# Playwright Automation Testing

Learning how to use Playwright with TypeScript for end-to-end automation testing.

## Course

**Playwright JS/TS Automation Testing from Scratch & Framework**
- Platform: Udemy
- Link: [Playwright JS/TS Automation Testing from Scratch & Framework](https://www.udemy.com/share/106cXG3@BCnM5MbGLDQpWMXu-duiSBLtf010xyuvHOI3MIbk4stz3w3fMlVlbnNzrGEcXZtmVA==/)

## Technologies

- [Playwright](https://playwright.dev/)
- TypeScript
- Node.js

## Getting Started

### Prerequisites

- Node.js installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/example.spec.ts

# Run tests with UI mode
npx playwright test --ui

# Run tests headed (visible browser)
npx playwright test --headed
```

## Project Structure

```
playwright/
├── tests/          # Test files
├── pages/          # Page Object Models
├── playwright.config.ts  # Playwright configuration
└── README.md
```
