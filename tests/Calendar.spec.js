const {test, expect} = require('@playwright/test');
const url = "https://rahulshettyacademy.com/seleniumPractise/#/offers";

test('Calendar Validations', async({page}) => 
{
    const monthNumber = 12;
    const date = 15;
    const year = "2027";  
    await page.goto(url);
    await page.locator(".react-date-picker__inputGroup__year").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber-1).click();
    await page.locator(".react-calendar__month-view__days__day").nth(date+1).click();
    await expect(page.getByText(monthNumber + " / " + date + " / " + year)).toBeVisible();
})