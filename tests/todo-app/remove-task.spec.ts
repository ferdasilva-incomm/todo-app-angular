// spec: specs/todo-app.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Task Operations', () => {
  test('Remove a task from the list', async ({ page }) => {
    // Navigate to http://localhost:4200/
    await page.goto('http://localhost:4200/');

    // Add a task 'Buy groceries'
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();

    // Click the 'Remove Task' button
    await page.getByRole('listitem').filter({ hasText: 'Buy groceriesRemove Task' }).getByRole('button', { name: 'Remove Task' }).click();

    // Verify the task is removed from the list
    await expect(page.getByText('Buy groceries')).not.toBeVisible();
  });
});
