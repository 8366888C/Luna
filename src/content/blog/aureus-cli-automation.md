---
draft: false
date: "30-05-2026"
title: "Aureus - A CLI for Repository Automation"
description: "How Aureus bootstraps projects, enforces conventional commits, and automates semantic versioning across all major package managers"
category: "devlog"
tags: ["aureus", "cli", "automation", "typescript", "npm", "open-source", "devtools", "ryze"]
author: "Subhashis Hansda"
---

## What Is Aureus?

Repository compliance is often an afterthought - bolted on with brittle shell scripts that work on one machine and fail silently on another. Manual setup of Git hooks, Commitlint, and semantic release tooling is error-prone: team members diverge in local configurations, and a single malformed commit breaks the changelog pipeline.

Aureus is a CLI tool that wraps all of this into a single, idempotent command. It scaffolds project conventions, enforces commit standards, and automates versioning and changelog generation - across npm, pnpm, yarn, and bun.


## Get Started

Aureus is open source under the MIT license:

- **GitHub**: [github.com/A58361/aureus](https://github.com/A58361/aureus)
- **npm**: [npmjs.com/package/aureus](https://npmjs.com/package/aureus)

```bash
npx aureus init my-project
```

## Installation

```bash
npm install -g aureus
```

Or run it without installing:

```bash
npx aureus init my-project
```

**Requirements**: Node.js 18 or newer, Git, and optionally the [GitHub CLI](https://cli.github.com) for repository creation features.

## Core Commands

### `aureus init [folder]`

Scaffolds a complete repository setup in the specified folder (defaults to the current directory). This is the main entry point - it walks you through a few prompts and generates everything you need.

### `aureus create <component>`

Add individual components to an existing project on demand:

| Component | What it does |
|-----------|--------------|
| `license` | Generates a license file (MIT, GPL-3.0, Apache-2.0, etc.) |
| `gitignore` | Adds a `.gitignore` for your project type |
| `pull-request` | Creates a PR template in `.github/` |
| `issue` | Creates bug report and feature request templates |
| `code-of-conduct` | Generates a Contributor Covenant v2.0 |
| `husky-hooks` | Wires up `commit-msg` and `pre-push` hooks |
| `github-actions` | Adds a release workflow |
| `github-repo` | Creates a GitHub repository via `gh` CLI |

### `aureus view <component>`

Preview templates and configuration before creating them. Useful for seeing what will be generated without writing any files.

### `aureus commit`

An interactive TUI for writing conventional commits. It guides you through selecting a commit type, adding an optional scope, writing the message, and flagging breaking changes - no need to remember conventional commit syntax.

Supported types:

| Type | Purpose |
|------|---------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `refactor` | Code rewrites or restructuring |
| `build` | Changes affecting build components |
| `chore` | Changes that don't modify app logic |
| `test` | Adding or correcting tests |
| `ops` | Changes to operational components |
| `revert` | Reverts a previous commit |

## Automatic Versioning

### `aureus bump [--dry-run]`

This is where Aureus shines. It analyses all commits since the last git tag, determines the correct semantic version bump (major / minor / patch), updates `package.json`, generates a changelog entry, and creates a git tag - all in one step.

```bash
# Preview what would change
aureus bump --dry-run

# Apply the bump
aureus bump
```

The commit analysis follows the conventional commits spec:

- Commits with breaking changes or `feat:` that include `BREAKING CHANGE` trigger a **major** bump
- `feat:` commits trigger a **minor** bump
- `fix:` and other commits trigger a **patch** bump

This is typically wired into a `pre-push` Husky hook so that versioning and changelog stay in sync automatically - every push bumps the version and updates the changelog before the code leaves your machine.

## Git Hooks Workflow

When you run `aureus create husky-hooks` (or select Husky support during `aureus init`), two hooks are configured:

- **`commit-msg`** - runs `aureus verify` on the commit message to enforce conventional commit format. Non-compliant messages are rejected before the commit completes.
- **`pre-push`** - runs `aureus bump` to bump the version, update `CHANGELOG.md`, and create a git tag before pushing.

Existing hook files are preserved and extended when possible - Aureus won't overwrite custom hooks you already have.

## Configuration

Aureus stores user preferences in `~/.aureus/config.json` and reuses them across runs:

| Key | Description | Default |
|-----|-------------|---------|
| `author_name` | Default author name | - |
| `package_manager` | Preferred package manager | `pnpm` |
| `license` | Default license | `mit` |
| `gitignore` | Default .gitignore template | `node` |
| `github_repo_visibility` | GitHub repo visibility | `public` |
| `github_remote_protocol` | Git remote protocol | `ssh` |
| `github_username` | Your GitHub username | - |
| `contact` | Contact email for code of conduct | - |

Configuration is read from `~/.aureus/config.json` and can be overridden per-project via a `.aureusrc` file or `package.json` extensions key.

## Architecture

Aureus is built with a modular orchestration engine at its core:

- **Async child-process pooling** with configurable concurrency limits and per-step timeout guards ensures scaffold operations run in parallel where possible and fail gracefully.
- **Config-driven scaffolding layers** read from a declarative spec - either a `.aureusrc` file or `package.json` extensions - to determine which modules to activate. The resolution algorithm prioritises explicit config over convention, with sensible defaults for each detected project type.
- Each pipeline step (hook init, commitlint config, semantic release setup) is an isolated module that emits structured events, making it easy to add new components without touching existing code.

The CLI itself is written in TypeScript, built with [tsup](https://tsup.egoist.dev), and uses [Commander.js](https://github.com/tj/commander.js) for argument parsing and [Enquirer](https://github.com/enquirer/enquirer) for the interactive TUI prompts.

## Real Usage: Ryze

This very site uses Aureus. The `.husky/` directory in the Ryze repository was scaffolded with Aureus and the hooks are managed by it:

- `.husky/commit-msg` runs `aureus verify` to ensure every commit follows conventional commits
- `.husky/pre-push` runs `aureus bump` to auto-version before pushing

Every release you see in the Ryze changelog was generated by Aureus. The tool eats its own dogfood.
