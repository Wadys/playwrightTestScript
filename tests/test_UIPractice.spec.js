const {test, expect} = require("@playwright/test");

const url = "https://rahulshettyacademy.com/client/";
const userName = "testemail@testmail.com";
const password = "3Fm9nmp@t#xW.Hq";

test.only("UI Practice Test", async ({page}) => {
    const userNameLocator = page.locator("#userEmail")
    const passwordLocator = page.locator("#userPassword")
    const loginBtn = page.locator("#login")
    const cardTitles = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const checkOutBtn = page.locator("text=Checkout")

    await page.goto(url);
    await userNameLocator.fill(userName);
    await passwordLocator.fill(password);
    await loginBtn.click();
    await cardTitles.first().waitFor();
    // const allTitles = await cardTitles.allTextContents();
    // console.log(allTitles);
    const count = await products.count();
    for(let i=0; i<count; i++){
        if (await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('" + productName + "')").isVisible();
    expect(bool).toBeTruthy();
    await checkOutBtn.click();
    await page.locator("[placeholder*='Country']").pressSequentially("cost");
    const dropwDown = page.locator(".ta-results")
    await dropwDown.waitFor();
    const dropDownCount = await dropwDown.locator("button").count();
    for(let i=0; i<dropDownCount; i++){
        const text = await dropwDown.nth(i).textContent();
        if (text.trim() === "Costa Rica"){
            await dropwDown.nth(i).locator('button').click();
            break;
        }   
    }
    await page.pause();
});
