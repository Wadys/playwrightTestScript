const {test, expect, request} = require("@playwright/test");
const{ApiUtils} = require("./utils/APIUtils");
const loginpayload = {userEmail: "testemail@testmail.com", userPassword: "3Fm9nmp@t#xW.Hq"};
const orderpayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
// const orderId;
let token;
let response;
test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginpayload);
    response = await apiUtils.createOrder(orderpayload);
});

test.only("Client API Test", async ({page}) =>{
    const apiUtils = new ApiUtils(page, loginpayload);
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for(let i =0; i<await rows.count(); ++i)
    {
        const rowOrderId =await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails =await page.locator(".col-text").textContent();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();

    
});