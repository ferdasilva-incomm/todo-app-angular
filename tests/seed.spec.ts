import { test, expect } from '@playwright/test';

test.describe('Test todo-app', () => {
  test('access todo-app', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  });
});
