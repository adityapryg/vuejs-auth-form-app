import { test, expect } from '@playwright/test';

const credentials = {
  username: 'admin',
  password: 'SuperSecretPassword!',
};

const formData = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  jobTitle: 'Mathematician',
  education: 'Grad School',
  sex: 'Female',
  experience: '5-9',
  date: '2025-10-29',
};

test.describe('Auth and Form experience', () => {
  test('allows login, form submission, and logout', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveURL(/\/login$/);

    await page.fill('#username', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('button[type="submit"]');

    await page.waitForURL('**/dashboard');
    await expect(page.locator('.welcome-card')).toContainText(credentials.username);

    await page.getByRole('link', { name: /Fill Complete Form/ }).click();
    await page.waitForURL('**/form');

    await page.fill('#firstName', formData.firstName);
    await page.fill('#lastName', formData.lastName);
    await page.fill('#jobTitle', formData.jobTitle);
    await page.getByLabel(formData.education).check();
    await page.getByLabel(formData.sex).check();
    await page.selectOption('#experience', formData.experience);
    await page.fill('#date', formData.date);

    await page.click('button[type="submit"]');
    await expect(page.locator('.submission-result')).toContainText('Form Submitted Successfully!');
    await expect(page.locator('.submission-result')).toContainText(formData.firstName);
    await expect(page.locator('.submission-result')).toContainText(formData.lastName);

    await page.getByRole('button', { name: 'Logout' }).click();
    await page.waitForURL('**/login');
    await expect(page.locator('.login-card')).toContainText('Login Page');
  });
});
