const {test, expect} = require('@playwright/test');
const url = "https://rahulshettyacademy.com/seleniumPractise/#/offers";

test('Calendar Validations', async({page}) => 
{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber, date, year];  
    await page.goto(url);
    await page.locator(".react-date-picker__inputGroup__year").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(monthNumber-1).click();
    await page.locator(".react-calendar__month-view__days__day").nth(date).click();
    
    const inputs = page.locator('.react-date-picker__inputGroup__input');
    
    for (let i=0; i<expectedList.length; i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
})