# Kiro Agent Hooks - 90s Website Generator

This directory contains automated hooks that help maintain code quality and workflow consistency.

## 📋 Available Hooks

### 1. **Run Tests on Save** ✅ (Existing)
- **Trigger**: When any `.ts` or `.tsx` file is saved
- **Action**: Runs `npm test`
- **Purpose**: Catch issues immediately during development
- **Status**: Enabled

### 2. **Validate Before Commit** 🔍 (New)
- **Trigger**: Manual (click to run)
- **Action**: Runs tests + TypeScript type checking
- **Purpose**: Ensure code quality before committing
- **Usage**: Click the hook button before running `git commit`
- **Status**: Enabled

### 3. **Update Spec on Requirements Change** 📋 (New)
- **Trigger**: When `requirements.md` is edited
- **Action**: Sends reminder message
- **Purpose**: Ensure design and tasks stay in sync with requirements
- **Reminds you to**:
  - Review design document
  - Update correctness properties
  - Adjust tasks if needed
- **Status**: Enabled

### 4. **Run Property Tests on Test Change** 🧪 (New)
- **Trigger**: When test files are edited
- **Action**: Runs all tests with `--run` flag
- **Purpose**: Ensure property tests pass with 100 iterations
- **Status**: Enabled

### 5. **Check Convex Schema on Change** 🗄️ (New)
- **Trigger**: When `convex/schema.ts` is edited
- **Action**: Sends reminder message
- **Purpose**: Ensure types and tests stay in sync with schema
- **Reminds you to**:
  - Update TypeScript types
  - Update mutations/queries
  - Run tests
  - Update property tests
- **Status**: Enabled

### 6. **Security Check on User Input** 🔒 (New)
- **Trigger**: When components, site-generator, or convex files are edited
- **Action**: Sends security checklist
- **Purpose**: Remind about input sanitization and security
- **Checks**:
  - HTML escaping
  - Input validation
  - Injection prevention
  - XSS protection
- **Status**: Enabled

### 7. **Task Completion Reminder** ✅ (New)
- **Trigger**: When `tasks.md` is edited
- **Action**: Sends completion checklist
- **Purpose**: Ensure proper task tracking
- **Reminds you to**:
  - Mark completed tasks
  - Update PBT status
  - Run tests
  - Create PR
- **Status**: Enabled

## 🎯 Benefits

### Automated Quality Checks
- ✅ Tests run automatically on save
- ✅ Type checking before commits
- ✅ Security reminders when handling user input

### Workflow Consistency
- ✅ Spec-driven development reminders
- ✅ Task tracking prompts
- ✅ Schema change notifications

### Early Issue Detection
- ✅ Catch bugs immediately
- ✅ Prevent broken commits
- ✅ Maintain test coverage

## 🔧 Managing Hooks

### View All Hooks
Open the **Agent Hooks** section in Kiro's explorer view

### Enable/Disable Hooks
Edit the `.kiro.hook` file and set `"enabled": true/false`

### Create New Hooks
Use the command palette: **"Open Kiro Hook UI"**

### Trigger Manual Hooks
Click the button next to manual hooks in the Agent Hooks view

## 💡 Recommended Workflow

### During Development
1. **Edit code** → Tests run automatically (Hook #1)
2. **Edit tests** → Property tests run (Hook #4)
3. **Edit schema** → Get reminder to update types (Hook #5)

### Before Committing
1. **Click "Validate Before Commit"** (Hook #2)
2. **Ensure all tests pass**
3. **Commit with confidence**

### When Working on Specs
1. **Edit requirements** → Get design sync reminder (Hook #3)
2. **Update tasks** → Get completion checklist (Hook #7)
3. **Stay organized**

## 🚀 Advanced Usage

### Custom Hooks for This Project

You can create additional hooks for:
- **Deployment checks**: Run before deploying to Vercel
- **Documentation updates**: Remind to update README when features change
- **Performance tests**: Run performance benchmarks on critical paths
- **Accessibility checks**: Validate WCAG compliance

### Hook Patterns

**On File Save:**
```json
"when": {
  "type": "fileEdited",
  "patterns": ["**/*.ts"]
}
```

**Manual Trigger:**
```json
"when": {
  "type": "manual"
}
```

**Run Command:**
```json
"then": {
  "type": "runCommand",
  "command": "npm test"
}
```

**Send Message:**
```json
"then": {
  "type": "sendMessage",
  "message": "Your reminder here"
}
```

## 📚 Resources

- [Kiro Hooks Documentation](https://docs.kiro.ai/hooks)
- [Agent Hooks Best Practices](https://docs.kiro.ai/hooks/best-practices)
- [Hook Examples](https://docs.kiro.ai/hooks/examples)

---

**Note**: Hooks are workspace-specific and stored in `.kiro/hooks/`. They're automatically loaded when you open the workspace in Kiro.
