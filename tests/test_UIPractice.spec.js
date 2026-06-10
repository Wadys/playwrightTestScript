const {test, expect} = require("@playwright/test");

const url = "https://rahulshettyacademy.com/client/";
const userName = "testemail@testmail.com";
const password = "3Fm9nmp@t#xW.Hq";

test("UI Practice Test", async ({page}) => {
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
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    const count = await products.count();
    for(let i=0; i<count; i++){
        if ((await products.nth(i).locator("b").textContent()).trim() === productName){
            await products.nth(i).getByRole("button", {name: "Add To Cart"}).click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('" + productName + "')").isVisible();
    expect(bool).toBeTruthy();
    await checkOutBtn.click();
    await page.locator("[placeholder*='Country']").pressSequentially("cost",{delay:150});
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
    expect(page.locator(".user__name [type='text']").first()).toHaveText(userName);
    await page.locator(".action__submit").click();
    
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i=0; i<await rows.count(); i++){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    await page.locator(".col-text").waitFor();
    const orderIdDetails = await page.locator(".col-text").textContent();
    console.log(expect(orderId.includes(orderIdDetails)).toBeTruthy());
    console.log(orderIdDetails);

    
});
