# Changelog

All notable changes to this project will be documented in this file.

## [0.6.4] - 2025-07-15

### Fixed

- Fixed TypeError when owned_keys API returns empty object instead of array
  - Resolved issue preventing downloads when user has no owned games
  - Added proper handling for both array and object responses from itch.io API

## [0.6.3] - 2025-07-14

### Changed

- Downgraded commander to v12 to support Node.js 18+

## [0.6.2] - 2025-07-14

### Added

- Complete CI/CD pipeline with cross-platform testing
- Auto-formatting workflow with Prettier and ESLint
- Comprehensive test suite (22 tests)
- Security auditing with audit-ci
- Professional release automation

### Fixed

- Windows compatibility issues in tests and file globbing
- ESLint configuration with TypeScript support
- Cross-platform test failures (Linux XDG_CONFIG_HOME, Windows timing)
- All linting warnings for perfect code quality

### Changed

- Streamlined CI from 9 jobs to 2 jobs (77% reduction)
- Improved repository organization (removed redundant wiki files)
- Enhanced error handling and type safety

### Infrastructure

- GitHub Actions workflows for CI/CD, auto-formatting, and releases
- Cross-platform testing on Ubuntu and Windows
- Automated code quality checks and security audits

## [0.6.1] - Previous Release

### Added

- TypeScript implementation of itch-dl
- Comprehensive wiki documentation
- npm package publishing
- Basic CI/CD setup

---

## Format

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
format.
