const {test, expect} = require('@playwright/test');

test('First Playwright Test', async ({browser}) =>{
//Chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage()
    const userName = page.locator("#username")
    const signInBtn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // css, xpath, text, id, class
    await userName.fill("rahulshettyacademy");
    await page.locator("[type = 'password']").fill("Learning");//Wrong Password
    await signInBtn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await page.locator("[type = 'password']").fill("Learning@830$3mK2");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent()); //first Element
    console.log(await cardTitles.nth(0).textContent()); //first and nth(0) are same
    console.log(await cardTitles.last().textContent()); //last Element
    const allTitles = await cardTitles.allTextContents(); //this onnly works because we ask for
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