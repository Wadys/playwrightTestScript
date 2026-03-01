const {test, expect, page} = require('@playwright/test');
const url = "https://rahulshettyacademy.com/loginpagePractise/";
const userName = "rahulshettyacademy";
const password = "Learning@830$3mK2";

test('First Playwright Test', async ({browser}) =>{
//Chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage()
    const userNameLocator =  page.locator("#username")
    const passwordLocator = page.locator("#password")
    const signInBtnLocator = page.locator("#signInBtn")
    const cardTitlesLocator = page.locator(".card-body a");
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

test('UI Controls', async ({page}) => {
    const dropdownLocator = page.locator("select.form-control");
    const checkbox = page.locator("#terms");
    const radioBtn = page.locator(".radiotextsty");
    const documentsLink = page.locator("a[href*='documents-request']");
    await page.goto(url);
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
    expect(await checkbox.isChecked()).toBeFalsy();
    console.log(await checkbox.isChecked());
    await expect(documentsLink).toHaveAttribute("class", "blinkingText");
    // await page.pause(); Waits and create a pause
});

test('Child Window Handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto(url);
    const documentsLink = page.locator("a[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent("page"), //listens for the new page event and returns the new page object, pending, rejected, fulfilled
        documentsLink.click(), 
    ]);//New page will open after clicking the link and we are waiting for that page to open before moving to the next line of code 
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});