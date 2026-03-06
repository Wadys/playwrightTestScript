const {test, expect, request} = require("@playwright/test");
const urlLogin = "https://rahulshettyacademy.com/api/ecom/auth/login";
const urlAddToCart = "https://rahulshettyacademy.com/api/ecom/user/add-to-cart";
const urlCreateOrder = "https://rahulshettyacademy.com/api/ecom/user/create-order";
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const response = await apiContext.post(urlLogin, {
        data:{userEmail: "testemail@testmail.com", userPassword: "3Fm9nmp@t#xW.Hq"}
    });
    const responseJson = await response.json();
    expect(response.status()).toBe(200);
    token = responseJson.token;
});

test("Login API Test", async () => {
    expect(token).toBeTruthy() ;
    console.log(token);
});

test("add to cart API test", async ({request}) => {
    const response = await request.post(urlAddToCart, {
        headers: {
            "Authorization": token
        },
        data: {_id:"69a1cc4a415d779f9b4a09d8",product:{"_id":"6960ea76c941646b7a8b3dd5",productName:"iphone 13 pro",productCategory:"electronics",productSubCategory:"mobiles",productPrice:55000,productDescription:"Apple phone",productImage:"https://rahulshettyacademy.com/api/ecom/uploads/productImage_1767959158182.jpg",productRating:"0",productTotalOrders:"0",productStatus:true,productFor:"women",productAddedBy:"admin",__v:0}}
    });
    expect(response.status()).toBe(200);
    console.log(await response.json());
});

test("get cart prodcts API test", async ({request}) => {
    const response = await request.get("https://rahulshettyacademy.com/api/ecom/user/get-cart-products", {
        headers: {
            "Authorization": token}
    });
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    console.log(responseJson);
});
test("Create order API test", async ({request}) => {
    const response = await request.post(urlCreateOrder, {
        headers: {
            "Authorization": token
        },
            data:{"orders":[{
                country:"Czech Republic",
                productOrderedId:"6960ea76c941646b7a8b3dd5"}]
            }}
    );
    expect(response.status()).toBe(201);
    const responseJson = await response.json();
    console.log(responseJson);
});

test("Delete order API test", async ({request}) => {

});

test("Get order API test", async ({request}) => {
    const response = await request.get("https://rahulshettyacademy.com/api/ecom/user/get-orders", {
        headers: {
            "Authorization": token
        }
    });
    expect(response.status()).toBe(200);
    const responseJson = await response.json();
    console.log(responseJson);
});