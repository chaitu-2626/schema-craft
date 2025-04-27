# 🚀 GitHub Workflows for This Project

This folder contains GitHub Actions workflow files, which define **automated tasks** that run when certain events happen in this repository — such as pushing code or opening a pull request.

## 📄 `ci.yml` — Continuous Integration (CI)

This workflow is responsible for checking your code quality and building the app using [TurboRepo](https://turbo.build/). It ensures your code is clean, type-safe, and doesn't break the build before it's merged or deployed.

---

## 🔧 What the CI Workflow Does

The `ci.yml` file performs the following steps automatically on **every push or pull request** to the `main` branch:

1. **Checkout the Code**
   - Downloads the latest version of your repo to the GitHub Actions runner.

2. **Set Up Node.js**
   - Installs Node.js version 18 (or whichever version you configure).

3. **Set Up PNPM**
   - Installs PNPM as your package manager (faster and Turbo-friendly).

4. **Install Dependencies**
   - Runs `pnpm install` with strict frozen lockfile to make sure nothing has changed unintentionally.

5. **Run Turbo Tasks**
   - Executes the following tasks using `turbo run`:
     - `lint`: Lints the code for formatting and errors.
     - `check-types`: Runs TypeScript type checks.
     - `build`: Builds the application (usually using Next.js, etc.).

---

## 📦 About TurboRepo

TurboRepo is a high-performance build system for monorepos. It speeds up builds and intelligently caches output to avoid redundant work.  
In your case, it helps coordinate builds across multiple packages or apps in your monorepo.

---

## 🧪 Why You Need This

- **Automated checks** mean no broken code gets into `main`.
- **Faster development** since errors are caught early.
- **Consistency** in builds across developers and environments.
- **Foundation for future CD (deployments)**.


