// spec: specs/todo-app.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Task Operations', () => {
  test('Mark a task as complete', async ({ page }) => {
    // Navigate to http://localhost:4200/
    await page.goto('http://localhost:4200/');

    // Add a task 'Read a book' using the input and Add button
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Read a book');
    await page.getByRole('button', { name: 'Add' }).click();

    // Click the checkbox to mark the task as complete
    await page.getByRole('listitem').filter({ hasText: 'Read a bookRemove Task' }).getByRole('checkbox').click();

    // Verify the checkbox is checked
    await expect(page.getByRole('listitem').filter({ hasText: 'Read a bookRemove Task' }).getByRole('checkbox')).toBeChecked();
  });
});
