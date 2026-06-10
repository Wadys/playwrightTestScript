// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 70 * 1000,
  expect:{
    timeout: 7000,
  },
  reporter: 'html',
  /*Shared settings for all the projects see https://playwright.dev/docs/test-configuration */
  use: {
    // browserName: 'chromium'
    // browserName: 'chromium',
    browserName: 'firefox',
    // browserName: 'webkit',
    screenshot: 'on',//'only-on-failure',
    trace: 'on',//'retain-on-failure',
    headless: false, //True no UI :: False with UI
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },
  
});
module.exports = config
