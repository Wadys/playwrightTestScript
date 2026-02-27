const {test, expect, page} = require('@playwright/test');
const url = "https://rahulshettyacademy.com/loginpagePractise/";
const userName = "rahulshettyacademy";
const password = "Learning@830$3mK2";
// const userNameLocator =  page.locator("#username")
    // const passwordLocator = page.locator("#password")
    // const signInBtnLocator = page.locator("#signInBtn")
    // const cardTitlesLocator = page.locator(".card-body a");
test('First Playwright Test', async ({browser}) =>{
//Chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage()
    
  //Chrome - plugins/ cookies
    await page.goto(url);
    // css, xpath, text, id, class    
    await userNameLocator.fill(userName);
    await passwordLocator.fill("Learning");//Wrong Password
    await signInBtnLocator.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await userNameLocator.fill("");
    await userNameLocator.fill(userName);
    await passwordLocator.fill(password);
    await signInBtnLocator.click();
    console.log(await cardTitlesLocator.first().textContent()); //first Element
    console.log(await cardTitlesLocator.nth(0).textContent()); //first and nth(0) are same
    console.log(await cardTitlesLocator.last().textContent()); //last Element
    const allTitles = await cardTitlesLocator.allTextContents(); //this onnly works because we ask for
    // the previouse element if we handnt asked for the previouse element it will give us an error 
    // because it will not know which element we are talking about do to timeout
    console.log(allTitles);
});

test('Page Playwright Test', async ({page}) =>{
//By using page object we can directly use the page without creating context and browser
    await page.goto("https://www.google.com/");
    //get tittle - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test.only('UI Controls', async ({page}) => {
    const userNameLocator = page.locator("#username");
    const passwordLocator = page.locator("#password");
    const signInBtnLocator = page.locator("#signInBtn");
    const dropdownLocator = page.locator("select.form-control");
    const checkbox = page.locator("#terms");
    const radioBtn = page.locator(".radiotextsty");
    await page.goto(url);
    await userNameLocator.fill(userName);
    await passwordLocator.fill(password);
    await dropdownLocator.selectOption("consult");
    await radioBtn.last().click();
    await page.locator("#okayBtn").click();
    console.log(await radioBtn.last().isChecked());
    await expect(radioBtn.last()).toBeChecked();//Assertion for checkbox
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    console.log(await checkbox.isChecked());
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    console.log(await checkbox.isChecked());
    
    // await signInBtn.click();
    // await page.pause(); Waits and create a pause
});