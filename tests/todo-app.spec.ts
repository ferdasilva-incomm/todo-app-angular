import { test, expect, Page } from '@playwright/test';

test.describe('Todo App', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:4200/');
    });

    test('add one task', async ({ page }) => {
        await page.getByRole('textbox').fill('Task 1');
        await page.getByRole('button').click();
        await page.getByRole('checkbox').check();

        // Check if the Task 1 is visible in the list
        await expect(page.getByText('Task 1')).toBeVisible();
    });
});