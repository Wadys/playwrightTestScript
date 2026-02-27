const {test} = require("@playwright/test");

const url = "https://rahulshettyacademy.com/client/";
const userName = "testemail@testmail.com";
const password = "3Fm9nmp@t#xW.Hq";

test("UI Practice Test", async ({page}) => {
    // const context = await browser.newContext();
    // const page = await context.newPage()
    const userNameLocator = page.locator("#userEmail")
    const passwordLocator = page.locator("#userPassword")
    const loginBtn = page.locator("#login")
    const cardTitles = page.locator(".card-body b");

    await page.goto(url);
    await userNameLocator.fill(userName);
    await passwordLocator.fill(password);
    await loginBtn.click();
    await cardTitles.first().waitFor();
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
})

