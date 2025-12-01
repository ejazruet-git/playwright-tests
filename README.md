## 🚀 CI/CD Status
[![Playwright Tests](https://github.com/ejazruet-git/playwright-tests/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/ejazruet-git/playwright-tests/actions/workflows/playwright.yml)

## ✔ Successful CI/CD Run (Includes Artifacts)
[View CI/CD Run with Artifacts](https://github.com/ejazruet-git/playwright-tests/actions/runs/19803091653)


## 📝 Notes on Test Data, Retry Logic, and Known Limitations

### Test Data
- The tests use sample/dummy values (e.g., example login data).
- No production data is used.
- URLs and inputs are stored directly in the test files for simplicity.

### Retry Logic
- CI uses `retries: 2` to reduce flaky failures.
- Retries are applied only in GitHub Actions, not during local execution.
- This ensures more stable CI runs even with minor network delays.

### Known Limitations
- Tests currently run only on Chromium.
- Trace and video files are generated only on test failure.
- The test suite is small and does not yet cover all user flows.
- Some UI elements depend on network speed, which may cause timing issues in CI.
