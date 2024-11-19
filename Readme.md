
# QA Automation Repository for RMMS and BookingEngine

This repository contains **Playwright-based test automation scripts** for two websites: **RMMS** and **BookingEngine**. These scripts are designed to ensure the reliability and performance of key functionalities, including booking flows, user authentication, and overall system stability.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Environment Variables](#environment-variables)
- [Branch Structure](#branch-structure)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Setup

1. **Clone the repository:**

    ```sh
    git clone https://github.com/Life-House/QA-Automation.git
    cd QA-Automation
    ```

2. **Install dependencies:**

    ```sh
    yarn
    ```

3. **Install Playwright:**

    ```sh
    yarn playwright install
    ```

4. **Add Your `.env` File with Credentials:**

    Create a `.env` file in the project root and add the following:

    ```env
    TEST_EMAIL="Your RMMS Email"
    TEST_PASSWORD="Your RMMS Password"
    ```

## Running Tests

### Option 1: Using the Playwright Test Runner Extension

1. Install the **Playwright Test Runner** extension for your code editor (e.g., VSCode).
2. Open the test files and run them directly using the extension's interface.

### Option 2: Running Tests via Command Line

To run the Playwright tests with the UI, execute the following command:

```sh
yarn playwright test --ui
```

For headless execution:

```sh
yarn playwright test
```

Generate a report:

```sh
yarn playwright show-report
```

## Environment Variables

The `.env` file allows you to set up test credentials and other configurations. Below are the required variables:

- `TEST_EMAIL`: Your RMMS login email.
- `TEST_PASSWORD`: Your RMMS login password.

## Branch Structure

- **`main`**: Contains stable and tested automation scripts.
- **`dev`**: Active development branch for new test cases and features.
- **Feature-specific branches**: Used for implementing and testing individual features before merging into `dev`.

## Contribution Guidelines

1. Fork the repository and create a new branch for your changes.
2. Write and test your scripts thoroughly before submitting a pull request.
3. Ensure your code follows the repository's structure and conventions.
4. Add meaningful comments and descriptions for your changes.

---

By following these steps, you can ensure a smooth setup and execution of tests for RMMS and BookingEngine. Happy testing! 🎉
