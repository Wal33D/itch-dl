# Installation

This guide covers how to install itch-dl TypeScript implementation on your system.

## Prerequisites

- **Node.js 18+** and **npm** - Download from [nodejs.org](https://nodejs.org/)
- An **itch.io account** with an [API key](https://itch.io/user/settings/api-keys)

## Install from npm (Recommended)

The easiest way to install itch-dl is through npm:

```bash
npm install -g itch-dl
```

After installation, you can use the `itch-dl` command globally:

```bash
itch-dl --help
```

## Install from Source

If you want to contribute or use the latest development version:

```bash
# Clone the repository
git clone https://github.com/Wal33D/itch-dl.git
cd itch-dl

# Install dependencies
npm install

# Build the project
npm run build

# Run locally
node build/src/index.js --help
```

### Development Scripts

When working with the source code:

```bash
# Build the project
npm run build

# Run tests
npm test

# Clean build artifacts
npm run clean

# Prepare for publishing
npm run prepare
```

## Verify Installation

Test that itch-dl is working correctly:

```bash
itch-dl --version
```

This should display the current version of itch-dl.

## Next Steps

1. **Get your API key**: Visit [itch.io API keys page](https://itch.io/user/settings/api-keys)
2. **Configure itch-dl**: See [Configuration](Configuration.md) for setup options
3. **Start downloading**: Check [Usage](Usage.md) for examples

## Troubleshooting

### Permission Issues on macOS/Linux

If you get permission errors when installing globally:

```bash
# Use npx instead of global install
npx itch-dl --help

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Node.js Version Issues

Make sure you're using Node.js 18 or higher:

```bash
node --version
```

If you need to upgrade Node.js, download the latest version from [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm).

### Build Issues from Source

If you encounter build errors:

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```