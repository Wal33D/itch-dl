# itch-dl

[![npm version](https://img.shields.io/npm/v/itch-dl)](https://www.npmjs.com/package/itch-dl)

Bulk download games from [itch.io](https://itch.io/) - TypeScript implementation

📚 **[Complete Documentation](https://github.com/Wal33D/itch-dl/wiki)** | 🚀 **[Quick Start](#quick-start)** | 💾 **[Installation](#installation)**

## Features

- **Game Jams** - Download all submissions from [itch.io jams](https://itch.io/jams)
- **Browse Pages** - Download from [popular](https://itch.io/games), newest, or tag-based browse pages
- **Collections** - Download [your collections](https://itch.io/my-collections) or public collections
- **Your Library** - Download [all games you own](https://itch.io/my-purchases)
- **Creator Pages** - Download all games from specific developers
- **Individual Games** - Download single games or titles

### Currently NOT Supported
- Access restricted games ([#16](https://github.com/Wal33D/itch-dl/issues/16))
- Bundles ([#11](https://github.com/Wal33D/itch-dl/issues/11)) - **Workaround:**
  - Use [this userscript](https://gist.github.com/lats/c920866caf9c0cb04e82abba411e1bb9) or [Emersont1/itchio](https://github.com/Emersont1/itchio) to add bundle games to your library
  - Then use `itch-dl https://itch.io/my-purchases` to download everything

> [!WARNING]
> This tool does not let you download paid games for free. You must own games in [your library](https://itch.io/my-purchases) to download them.

## Quick Start

1. **Install**: `npm install -g itch-dl`
2. **Get API Key**: [Generate one here](https://itch.io/user/settings/api-keys)
3. **Download**: `itch-dl https://itch.io/jam/yourjamhere --api-key YOUR_KEY`

## Installation

### Prerequisites
- Node.js 18+ and npm

### Install from npm (Recommended)
```bash
npm install -g itch-dl
```

### Install from source
```bash
git clone https://github.com/Wal33D/itch-dl.git
cd itch-dl
npm install
npm run build
```

For detailed installation instructions, see **[Installation Guide](https://github.com/Wal33D/itch-dl/wiki/Installation)**.

## Usage

### Basic Examples
```bash
# Download a game jam
itch-dl https://itch.io/jam/brackeys-12 --api-key YOUR_API_KEY

# Download your library  
itch-dl https://itch.io/my-purchases --api-key YOUR_API_KEY

# Download with filters (Windows games only)
itch-dl https://itch.io/jam/gmtk-2023 --filter-files-platform windows --api-key YOUR_API_KEY

# Just list URLs without downloading
itch-dl https://itch.io/jam/brackeys-12 --urls-only --api-key YOUR_API_KEY
```

### Complete Documentation
📖 **[Usage Guide](https://github.com/Wal33D/itch-dl/wiki/Usage)** - All command-line options and examples  
🔑 **[API Keys](https://github.com/Wal33D/itch-dl/wiki/API-Keys)** - How to get and use your itch.io API key  
⚙️ **[Configuration](https://github.com/Wal33D/itch-dl/wiki/Configuration)** - Config files and profiles

### Help & Options
```bash
itch-dl --help  # See all available options
```

## Development

### Building & Testing
```bash
npm run build    # Build TypeScript to JavaScript
npm test         # Run tests  
npm run clean    # Clean build artifacts
```

### Running from Source
```bash
npm run build
node build/src/index.js --help
```

## Advanced Usage

### Game Jam JSON Files
You can use jam entries JSON files directly:
1. Find jam ID from page source
2. Download `https://itch.io/jam/ID/entries.json`
3. Use with itch-dl: `itch-dl jam-entries.json --api-key YOUR_KEY`

### Input Formats Supported
- itch.io URLs (games, jams, collections, libraries, creator pages)  
- Game jam entries JSON files
- Text files with URLs (one per line)

### Download Behavior
- **Skips existing**: Already downloaded games are skipped
- **Reports failures**: Failed downloads are listed at the end
- **External URLs**: Links to external hosts (Google Drive, etc.) are reported for manual download
- **Web mirroring**: Use `--mirror-web` to download page assets (experimental)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/itch-dl.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Test: `npm test`
6. Build: `npm run build`
7. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Credits & Acknowledgments

- **Original Python implementation**: [Wal33D](https://github.com/Wal33D/itch-dl)
- **TypeScript port**: [Wal33D](https://github.com/Wal33D)
- **Community contributions**: See [Contributors](https://github.com/Wal33D/itch-dl/graphs/contributors)

## Links

- 📚 **[Complete Wiki Documentation](https://github.com/Wal33D/itch-dl/wiki)**
- 🐛 **[Report Issues](https://github.com/Wal33D/itch-dl/issues)**
- 💬 **[Discussions](https://github.com/Wal33D/itch-dl/discussions)**
- 📦 **[npm Package](https://www.npmjs.com/package/itch-dl)**