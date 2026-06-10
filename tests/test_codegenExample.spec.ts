import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await expect(page.getByText('Protractor Tutorial by')).toBeVisible();
    await expect(page.locator('h5')).toContainText('This is a demo eCommerce web appplication developed using Angular 5 to help QAClick Academy students learn Protractor framework for testing Angular applications.');
    await expect(page.locator('form-comp')).toMatchAriaSnapshot(`
        - heading "Protractor Tutorial" [level=1]
        - heading "by QAClick Academy" [level=4]
        - heading "This is a demo eCommerce web appplication developed using Angular 5 to help QAClick Academy students learn Protractor framework for testing Angular applications." [level=5]
        - heading "Be assured that product you ordered in this site will never arrive, Instead we hope your takeaway will be in learning Protractor!" [level=6]
        `);
    await page.getByText('Protractor Tutorial by').click();
    await page.locator('form input[name="name"]').click();
    await page.locator('form input[name="name"]').fill('Wady');
    await page.locator('input[name="email"]').click();
    await page.locator('input[name="email"]').fill('wady+test@gmail.com');
    await page.locator('input[name="email"]').press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('Dog123');
    await page.getByRole('checkbox', { name: 'Check me out if you Love' }).check();
    await page.getByRole('radio', { name: 'Employed' }).check();
    await page.locator('input[name="bday"]').fill('1981-01-10');
    await page.getByRole('heading', { name: 'Two-way Data Binding example' }).getByRole('textbox').click();
    await page.getByRole('heading', { name: 'Two-way Data Binding example' }).getByRole('textbox').click();
    await page.getByRole('heading', { name: 'Two-way Data Binding example' }).getByRole('textbox').fill('Willl');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
});