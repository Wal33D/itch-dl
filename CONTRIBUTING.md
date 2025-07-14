# Contributing to itch-dl

Thank you for your interest in contributing! This guide will help you get
started.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork**: `git clone https://github.com/YOUR_USERNAME/itch-dl.git`
3. **Install dependencies**: `npm install`
4. **Run tests**: `npm test`
5. **Create a branch**: `git checkout -b feature/your-feature-name`

## 🧪 Development Workflow

### Prerequisites

- Node.js 18+ (recommend Node 20 LTS)
- npm (included with Node.js)
- Git

### Setup

```bash
# Install dependencies
npm install

# Run the full CI pipeline locally
npm run ci

# Start development
npm run build
npm test
```

### Available Scripts

- `npm run build` - Compile TypeScript
- `npm test` - Run test suite
- `npm run lint` - Run ESLint with auto-fix
- `npm run lint:check` - Check linting without fixes
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run ci` - Run complete CI pipeline locally

## 📝 Code Standards

### Code Quality

- **TypeScript**: All code must be properly typed
- **ESLint**: Code must pass linting checks
- **Prettier**: Code must be properly formatted
- **Tests**: New features should include tests

### Testing

- Write tests for new functionality
- Ensure all tests pass: `npm test`
- Tests should work across platforms (Ubuntu, Windows, macOS)

### Commit Messages

Follow conventional commit format:

```
type(scope): description

feat(downloader): add support for new file format
fix(config): resolve Windows path handling
docs(readme): update installation instructions
test(handlers): add test for URL filtering
```

## 🔧 Making Changes

### Before You Start

1. Check existing [issues](https://github.com/Wal33D/itch-dl/issues)
2. Open an issue to discuss major changes
3. Fork the repository

### Development Process

1. Create a feature branch from `main`
2. Make your changes
3. Add/update tests as needed
4. Run the full CI pipeline: `npm run ci`
5. Commit with descriptive messages
6. Push to your fork
7. Open a Pull Request

### Pull Request Guidelines

- **Clear title**: Describe what the PR does
- **Description**: Explain the changes and why they're needed
- **Tests**: Ensure all tests pass
- **Documentation**: Update docs if needed
- **Small PRs**: Keep changes focused and reviewable

## 🐛 Bug Reports

When reporting bugs, please include:

- **Environment**: OS, Node.js version, package version
- **Steps to reproduce**: Exact commands and inputs
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Error messages**: Full error output if applicable

## ✨ Feature Requests

For new features:

- Check if it's already requested in issues
- Explain the use case and benefit
- Consider if it fits the project scope
- Be open to feedback and discussion

## 📦 Project Structure

```
├── src/                 # Source code
│   └── index.ts        # Main entry point
├── tests/              # Test files
├── .github/            # GitHub Actions workflows
├── *.ts                # Core library files
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── .eslintrc.json      # ESLint configuration
└── .prettierrc.json    # Prettier configuration
```

## 🎯 Areas for Contribution

- **Bug fixes**: Check open issues
- **Performance improvements**: Optimize download speed or memory usage
- **Platform support**: Improve cross-platform compatibility
- **Documentation**: Improve README, wiki, or code comments
- **Tests**: Increase test coverage
- **CI/CD**: Improve automation and workflows

## 💡 Getting Help

- **Issues**: [GitHub Issues](https://github.com/Wal33D/itch-dl/issues)
- **Discussions**:
  [GitHub Discussions](https://github.com/Wal33D/itch-dl/discussions)
- **Wiki**: [Project Wiki](https://github.com/Wal33D/itch-dl/wiki)

## 📄 License

By contributing, you agree that your contributions will be licensed under the
MIT License.
