const {test, expect} = require('@playwright/test');

test.only('First Playwright Test', async ({browser}) =>{
//Chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // css, xpath, text, id, class
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("[type = 'password']").fill("Learning@830$3mK");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    // text = validateText("Incorrect username/password.");
});

test('Page Playwright Test', async ({page}) =>{
//By using page object we can directly use the page without creating context and browser
    await page.goto("https://www.google.com/");
    //get tittle - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});0