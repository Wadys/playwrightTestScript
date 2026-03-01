const {test, expect, request} = require("@playwright/test");
const{ApiUtils} = require("./utils/APIUtils");
const loginpayload = {userEmail: "testemail@testmail.com", userPassword: "3Fm9nmp@t#xW.Hq"};
const orderpayload = {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]}
const url = "https://rahulshettyacademy.com/client/";
// const orderId;
let token;
test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginpayload);
    await apiUtils.createOrder(orderpayload);
    token = await apiUtils.getToken();
});

test.only("Client API Test", async ({page}) =>{
    const apiUtils = new ApiUtils(page, loginpayload);
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, token);
    await page.goto(url);
    await page.pause();
});