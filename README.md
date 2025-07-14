<div align="center">

# 🎮 itch-dl

[![npm version](https://img.shields.io/npm/v/itch-dl)](https://www.npmjs.com/package/itch-dl)
[![npm downloads](https://img.shields.io/npm/dm/itch-dl)](https://www.npmjs.com/package/itch-dl)
[![GitHub license](https://img.shields.io/github/license/Wal33D/itch-dl)](https://github.com/Wal33D/itch-dl/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/node/v/itch-dl)](https://nodejs.org/)

**Bulk download games from [itch.io](https://itch.io/) with ease**

_TypeScript implementation for modern Node.js environments_

[🚀 Quick Start](#-quick-start) •
[📖 Documentation](https://github.com/Wal33D/itch-dl/wiki) •
[💾 Installation](#-installation) • [🎯 Examples](#-usage-examples)

</div>

---

## ✨ Features

### 🎯 What You Can Download

- 🏆 **Game Jams** - All submissions from any
  [itch.io game jam](https://itch.io/jams)
- 🔥 **Browse Pages** - Popular games, newest releases, or games by specific
  tags
- 📂 **Collections** - Your personal collections or any public collection
- 📚 **Your Library** - Everything you own from
  [your purchases](https://itch.io/my-purchases)
- 👨‍💻 **Creator Pages** - Complete catalogues from specific developers
- 🎮 **Individual Games** - Single games or specific titles

### 🛠️ Powerful Features

- ⚡ **Parallel Downloads** - Speed up bulk downloads with concurrent processing
- 🎯 **Smart Filtering** - Filter by platform, file type, or custom patterns
- 📋 **Multiple Input Formats** - URLs, JSON files, or plain text lists
- 🔄 **Resume Support** - Skip already downloaded games automatically
- 🌐 **Web Mirroring** - Optionally download game page assets
- ⚙️ **Configuration Profiles** - Save settings for different use cases

---

## 🚀 Quick Start

### 1️⃣ Install globally via npm

```bash
npm install -g itch-dl
```

### 2️⃣ Get your itch.io API key

Visit [itch.io API Keys](https://itch.io/user/settings/api-keys) and generate a
new key

### 3️⃣ Start downloading!

```bash
# Download a game jam
itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_API_KEY

# Download your entire library
itch-dl https://itch.io/my-purchases --api-key YOUR_API_KEY
```

> 💡 **Tip**: Save your API key in a
> [config file](https://github.com/Wal33D/itch-dl/wiki/Configuration) to avoid
> typing it every time!

---

## 💾 Installation

### Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **itch.io account** with [API key](https://itch.io/user/settings/api-keys)

### 📦 Install from npm (Recommended)

```bash
npm install -g itch-dl
```

### 🔧 Install from source

```bash
git clone https://github.com/Wal33D/itch-dl.git
cd itch-dl
npm install && npm run build
```

📚 **Need help?** Check the
[Installation Guide](https://github.com/Wal33D/itch-dl/wiki/Installation) for
detailed instructions.

---

## 🎯 Usage Examples

### Basic Downloads

```bash
# Game jam with all submissions
itch-dl https://itch.io/jam/brackeys-12 --api-key YOUR_KEY

# Your entire game library
itch-dl https://itch.io/my-purchases --api-key YOUR_KEY

# Specific creator's games
itch-dl https://dani-games.itch.io/ --api-key YOUR_KEY

# Public collection
itch-dl https://itch.io/c/123456/cool-games --api-key YOUR_KEY
```

### Filtered Downloads

```bash
# Only Windows games
itch-dl https://itch.io/jam/gmtk-2023 --filter-files-platform windows --api-key YOUR_KEY

# Only ZIP files
itch-dl https://itch.io/jam/brackeys-12 --filter-files-glob "*.zip" --api-key YOUR_KEY

# Multiple platforms
itch-dl https://itch.io/my-purchases --filter-files-platform windows mac linux --api-key YOUR_KEY
```

### Advanced Usage

```bash
# Fast parallel downloads (3 threads)
itch-dl https://itch.io/jam/gmtk-2023 --parallel 3 --api-key YOUR_KEY

# Just list URLs without downloading
itch-dl https://itch.io/jam/brackeys-12 --urls-only --api-key YOUR_KEY

# Download to specific directory
itch-dl https://itch.io/my-purchases --download-to "/games/itch" --api-key YOUR_KEY

# Mirror web assets (images, etc.)
itch-dl https://some-game.itch.io/game --mirror-web --api-key YOUR_KEY
```

### Using Configuration Files

```bash
# Use a specific profile
itch-dl https://itch.io/jam/gmtk-2023 --profile windows-only

# See all options
itch-dl --help
```

---

## 📚 Documentation

| 📖 Guide                                                              | Description                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| [Usage Guide](https://github.com/Wal33D/itch-dl/wiki/Usage)           | Complete command-line reference with examples          |
| [API Keys](https://github.com/Wal33D/itch-dl/wiki/API-Keys)           | How to get and securely use your itch.io API key       |
| [Configuration](https://github.com/Wal33D/itch-dl/wiki/Configuration) | Config files, profiles, and environment variables      |
| [Installation](https://github.com/Wal33D/itch-dl/wiki/Installation)   | Detailed installation instructions and troubleshooting |

---

## ⚠️ Important Notes

### ✅ What This Tool Does

- Downloads games you **legitimately own** or have access to
- Respects itch.io's terms of service and rate limits
- Provides the same access as the official itch.io app

### ❌ What This Tool Does NOT Do

- Download paid games for free (you must own them)
- Bypass access restrictions or DRM
- Download from bundles directly
  ([workaround available](https://github.com/Wal33D/itch-dl/wiki/Usage#bundles))

### 🚧 Current Limitations

- **Access-restricted games** - Not supported
  ([#16](https://github.com/Wal33D/itch-dl/issues/16))
- **Bundles** - Requires workaround
  ([#11](https://github.com/Wal33D/itch-dl/issues/11))

---

## 🔧 Development

### Building & Testing

```bash
git clone https://github.com/Wal33D/itch-dl.git
cd itch-dl
npm install

# Development commands
npm run build        # Compile TypeScript
npm test            # Run test suite
npm run clean       # Clean build artifacts
```

### Running from Source

```bash
npm run build
node build/src/index.js --help
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. 💻 **Make** your changes
4. ✅ **Test** your changes: `npm test`
5. 📝 **Commit** your changes: `git commit -m 'Add amazing feature'`
6. 🚀 **Push** to your branch: `git push origin feature/amazing-feature`
7. 🔄 **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE)
file for details.

---

## 🙏 Credits & Acknowledgments

- **Author**: [Wal33D](https://github.com/Wal33D)
- **Contributors**:
  [See all contributors](https://github.com/Wal33D/itch-dl/graphs/contributors)
- **Inspired by**: The original Python implementation concept

---

## 🔗 Links & Resources

<div align="center">

[![Documentation](https://img.shields.io/badge/📚_Documentation-Wiki-blue?style=for-the-badge)](https://github.com/Wal33D/itch-dl/wiki)
[![npm Package](https://img.shields.io/badge/📦_Package-npm-red?style=for-the-badge)](https://www.npmjs.com/package/itch-dl)
[![Issues](https://img.shields.io/badge/🐛_Issues-GitHub-green?style=for-the-badge)](https://github.com/Wal33D/itch-dl/issues)
[![Discussions](https://img.shields.io/badge/💬_Discussions-GitHub-purple?style=for-the-badge)](https://github.com/Wal33D/itch-dl/discussions)

</div>

---

<div align="center">

**Made with ❤️ for the itch.io community**

_If this tool helped you, consider ⭐ starring the repository!_

</div>
