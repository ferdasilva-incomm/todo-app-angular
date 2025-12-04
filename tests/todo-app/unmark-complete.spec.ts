// spec: specs/todo-app.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Task Operations', () => {
  test('Unmark a completed task', async ({ page }) => {
    // Navigate to http://localhost:4200/
    await page.goto('http://localhost:4200/');

    // Add a task and mark it as complete
    await page.getByRole('textbox', { name: 'Add a new task' }).fill('Test task');
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Test taskRemove Task' }).getByRole('checkbox').click();

    // Click the checkbox again to unmark the task
    await page.getByRole('listitem').filter({ hasText: 'Test taskRemove Task' }).getByRole('checkbox').click();

    // Verify the checkbox is now unchecked
    await expect(page.getByRole('listitem').filter({ hasText: 'Test taskRemove Task' }).getByRole('checkbox')).not.toBeChecked();
  });
});
