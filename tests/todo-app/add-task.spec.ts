// spec: specs/todo-app.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Task Operations', () => {
  test('Add a new task successfully', async ({ page }) => {
    // Navigate to http://localhost:4200/
    await page.goto('http://localhost:4200/');

    // Type 'Buy groceries' into the input field
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Buy groceries');

    // Click the 'Add' button
    await page.getByRole('button', { name: 'Add' }).click();

    // Verify the task appears in the list below the input
    await expect(page.getByText('Buy groceries')).toBeVisible();
  });
});
