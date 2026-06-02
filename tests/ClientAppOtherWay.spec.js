const {test, expect} = require('@playwright/test');


test('@Webs Client App login', async ({page}) => {
    //js file- Login js, DashboardPage
    const email = "testemail@testmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("3Fm9nmp@t#xW.Hq");
    await page.getByRole("button", {name: "Login"}).click();
//Loads Page after Login
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body").first().waitFor();
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"})
    .getByRole("button", {name: "Add To Cart"}).click();
    await page.getByRole('listitem').getByRole('button',{name: "Cart"}).click();
//Loads Cart Page
    await page.locator('div li').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole('button', {name: "Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("costa");
    await page.getByRole("button", {name: "Costa Rica"}).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText("THANKYOU FOR THE ORDER.")).toBeVisible();
});