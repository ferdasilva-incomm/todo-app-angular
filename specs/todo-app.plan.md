# Todo App Test Plan

## Application Overview

The Todo App is a simple Angular-based task management application that allows users to add, complete, and delete tasks. The app features a clean interface with an input field for entering new tasks, an "Add" button to submit tasks, and a list displaying all tasks with checkboxes for marking completion and remove buttons for deletion. The app demonstrates basic CRUD operations with real-time UI updates and task persistence.

## Test Scenarios

### 1. Basic Task Operations

**Seed:** `tests/seed.spec.ts`

#### 1.1. Add a new task successfully

**File:** `tests/todo-app/add-task.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Locate the 'Add a new task' input field
  3. Type 'Buy groceries' into the input field
  4. Click the 'Add' button
  5. Verify the task appears in the list below the input

**Expected Results:**
  - The task 'Buy groceries' is displayed in the todo list
  - The input field is cleared after adding the task
  - The task has an associated checkbox and remove button
  - Console logs 'Current Todo List' indicating the task was added

#### 1.2. Mark a task as complete

**File:** `tests/todo-app/mark-complete.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add a task 'Read a book' using the input and Add button
  3. Locate the checkbox next to 'Read a book'
  4. Click the checkbox to mark the task as complete
  5. Observe the visual state change of the task

**Expected Results:**
  - The checkbox becomes checked/selected
  - The task remains visible in the list
  - Console logs 'Toggling completion' to indicate state change
  - The task is marked as complete in the internal state

#### 1.3. Unmark a completed task

**File:** `tests/todo-app/unmark-complete.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add a task and mark it as complete
  3. Click the checkbox again to unmark the task
  4. Observe the visual state change

**Expected Results:**
  - The checkbox becomes unchecked
  - The task returns to incomplete state
  - The task remains in the list
  - Console logs toggling action

#### 1.4. Remove a task from the list

**File:** `tests/todo-app/remove-task.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add a task 'Buy groceries'
  3. Locate the 'Remove Task' button for the added task
  4. Click the 'Remove Task' button
  5. Verify the task is removed from the list

**Expected Results:**
  - The task is removed from the list immediately
  - The list updates without page reload
  - Console logs 'Deleted task with id'
  - The empty list is displayed if no other tasks exist

### 2. Input Validation and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 2.1. Attempt to add an empty task

**File:** `tests/todo-app/empty-task-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Leave the input field empty
  3. Click the 'Add' button
  4. Observe the application behavior

**Expected Results:**
  - No task is added to the list
  - The list remains empty or unchanged
  - No error message is displayed (current behavior allows empty submission)
  - The application remains stable

#### 2.2. Attempt to add a task with only whitespace

**File:** `tests/todo-app/whitespace-validation.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Type only spaces '   ' into the input field
  3. Click the 'Add' button
  4. Observe the application behavior

**Expected Results:**
  - The application treats whitespace-only input as empty
  - No task is added to the list
  - The list remains in its previous state
  - The application remains stable

#### 2.3. Add a task with very long text

**File:** `tests/todo-app/long-text-task.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Type a long task name: 'A very long task name that exceeds normal expectations for a todo item to check how the UI handles overflow or long text'
  3. Click the 'Add' button
  4. Observe how the UI renders the long text

**Expected Results:**
  - The long task is successfully added to the list
  - The task text is fully displayed or properly wrapped
  - The UI remains stable without breaking layout
  - The remove button is still visible and functional
  - The checkbox remains accessible

#### 2.4. Add duplicate tasks

**File:** `tests/todo-app/duplicate-tasks.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add a task 'Read a book'
  3. Add the same task 'Read a book' again
  4. Verify both tasks appear in the list
  5. Remove one duplicate task and verify only one remains

**Expected Results:**
  - Duplicate tasks are allowed (no deduplication)
  - Both tasks appear as separate items in the list
  - Each task has a unique identifier
  - Removing one duplicate only removes that specific instance
  - The other duplicate task remains in the list

#### 2.5. Handle special characters in task names

**File:** `tests/todo-app/special-characters.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Type special characters into the input: '<script>alert('xss')</script>'
  3. Click the 'Add' button
  4. Verify the task is added safely without executing scripts

**Expected Results:**
  - The special characters are safely displayed as plain text
  - No JavaScript is executed (XSS protection)
  - The task appears with the literal text including angle brackets
  - The application remains stable
  - The task can be removed normally

### 3. Task List Management

**Seed:** `tests/seed.spec.ts`

#### 3.1. Maintain multiple tasks in the list

**File:** `tests/todo-app/multiple-tasks.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add three different tasks: 'Task 1', 'Task 2', 'Task 3'
  3. Verify all three tasks appear in the list
  4. Mark 'Task 2' as complete
  5. Verify all tasks remain visible in their correct state

**Expected Results:**
  - All three tasks are displayed in the list
  - Tasks maintain their order of addition
  - 'Task 2' shows as completed (checked checkbox)
  - 'Task 1' and 'Task 3' show as incomplete
  - Each task has independent completion state

#### 3.2. Remove tasks from a populated list

**File:** `tests/todo-app/remove-from-list.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add three tasks: 'Buy milk', 'Write email', 'Call mom'
  3. Remove the middle task 'Write email'
  4. Verify 'Buy milk' and 'Call mom' remain in the list
  5. Remove 'Buy milk' and verify 'Call mom' remains

**Expected Results:**
  - Only the specified task is removed each time
  - Other tasks maintain their position and state
  - The list updates correctly after each removal
  - Task IDs/references are properly managed
  - No orphaned or duplicate tasks appear

#### 3.3. Clear all tasks by removing them individually

**File:** `tests/todo-app/clear-all-tasks.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add multiple tasks
  3. Remove each task one by one using the Remove Task button
  4. Continue until all tasks are removed

**Expected Results:**
  - Each task is successfully removed
  - The list becomes empty after removing all tasks
  - The empty list state is displayed correctly
  - The input field remains ready for new tasks
  - New tasks can be added after clearing the list

### 4. User Interface and Interaction

**Seed:** `tests/seed.spec.ts`

#### 4.1. Input field remains accessible after adding tasks

**File:** `tests/todo-app/input-accessibility.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add a task 'First task'
  3. Verify the input field is visible and empty
  4. Type a new task into the input field
  5. Click Add to verify the new task is added

**Expected Results:**
  - The input field maintains focus capability
  - The input field clears after each successful addition
  - Multiple tasks can be added sequentially
  - The placeholder text 'Add a new task' is visible
  - The input field functions after each operation

#### 4.2. Add button remains functional throughout interactions

**File:** `tests/todo-app/button-functionality.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add multiple tasks using the Add button
  3. Mark tasks as complete
  4. Remove tasks
  5. Add more tasks after removals
  6. Verify the Add button works consistently

**Expected Results:**
  - The Add button is always clickable
  - The button responds to clicks immediately
  - No visual or functional degradation occurs
  - The button style updates appropriately (active state shown)
  - Tasks are added reliably on every click

#### 4.3. Task items display all interactive elements

**File:** `tests/todo-app/task-elements.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add a task 'Test task'
  3. Inspect the task item in the list
  4. Verify all interactive elements are present

**Expected Results:**
  - Each task item displays the task text
  - A checkbox is present for marking completion
  - A 'Remove Task' button is present
  - All elements are properly aligned and visible
  - All elements are interactive and responsive

### 5. Application State and Persistence

**Seed:** `tests/seed.spec.ts`

#### 5.1. Application maintains state during interactions

**File:** `tests/todo-app/state-persistence.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Add tasks 'Task A', 'Task B', 'Task C'
  3. Mark 'Task B' as complete
  4. Remove 'Task A'
  5. Verify the list shows 'Task B' (completed) and 'Task C' (incomplete)

**Expected Results:**
  - All tasks maintain their correct state
  - Completed tasks show checked checkboxes
  - Incomplete tasks show unchecked checkboxes
  - Removed tasks are permanently gone from the list
  - The internal todo list is updated correctly

#### 5.2. Console logging for debugging

**File:** `tests/todo-app/console-logging.spec.ts`

**Steps:**
  1. Navigate to http://localhost:4200/
  2. Open browser console
  3. Add a task
  4. Mark it as complete
  5. Remove the task
  6. Check console for logging messages

**Expected Results:**
  - Console logs 'Current Todo List: [Object]' when adding tasks
  - Console logs 'Toggling completion for index: true' when marking complete
  - Console logs 'Deleted task with id: [number]' when removing tasks
  - Logs help developers debug application state
