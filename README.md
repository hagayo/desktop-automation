# Desktop Automation

Cross-platform desktop automation app for personal use on a local computer.

## V1 scope

- Desktop UI built with Tauri
- Create, edit, enable, disable, and run scheduled tasks
- Run local commands and scripts
- Run desktop macro tasks against opened local apps
- Run browser automation tasks in a managed isolated browser profile
- Reuse sessions when possible
- Auto re-login using securely stored local credentials when needed
- Store execution history and logs locally
- Close the UI after setup and let the OS scheduler run tasks later

## Main use cases

- Run Python scripts on a daily, weekly, or monthly schedule
- Launch local programs and execute a sequence of actions
- Open a managed browser, log in to a website, and perform repeated actions
- Automate personal workflows on the same computer and screen layout

## Architecture

- Tauri desktop app for task management UI
- Windows Task Scheduler and macOS launchd for scheduling
- Small local runner/helper launched by the scheduler
- SQLite database for tasks and execution history
- Secure local credential storage using OS-native facilities
- Managed browser profiles for browser tasks

## Notes

- The UI does not need to stay open after tasks are configured
- Browser session reuse is a convenience layer, not the only login mechanism
- For long-gap schedules, the runner should detect logged-out state and re-login when possible
- Username and password are not stored in plain text
- TOTP-based MFA can be supported later, but non-TOTP MFA may still require manual intervention

## Planned task types

### 1. Local command task
Run:
- `.exe`
- `.bat`
- `.sh`
- Python scripts
- other command-line tools

### 2. Desktop macro task
Actions such as:
- launch app
- wait for window
- focus window
- click relative coordinates
- type text
- send hotkeys
- wait

### 3. Browser task
Actions such as:
- open managed browser profile
- navigate to URL
- detect logged-in state
- log in if needed
- click, fill, wait, extract, download

## Initial goal

Build a solid V1 for personal desktop automation first, then expand carefully.
