# itch-dl Wiki

Welcome to the **itch-dl** TypeScript implementation wiki! This tool allows you to bulk download games from [itch.io](https://itch.io/).

## Quick Start

1. Install: `npm install -g itch-dl`
2. Get your [itch.io API key](https://itch.io/user/settings/api-keys)
3. Run: `itch-dl https://itch.io/jam/yourjamhere --api-key YOUR_API_KEY`

For detailed information, see:

- **[Installation](Installation.md)** - How to install itch-dl
- **[Usage](Usage.md)** - Command-line options and examples
- **[Configuration](Configuration.md)** - Configuration files and profiles
- **[API Keys](API-Keys.md)** - How to obtain and use itch.io API keys

## What itch-dl Can Download

- **Game Jams** - Download all submissions from itch.io game jams
- **Browse Pages** - Popular games, newest releases, games by tag
- **Collections** - Your personal collections or public collections
- **Your Library** - All games you own
- **Creator Pages** - All games from a specific developer
- **Individual Games** - Single game downloads

## What's NOT Supported

- Access restricted games
- Bundles (workaround: use userscripts to add bundle games to your library first)

## Getting Help

- Use `itch-dl --help` for command-line help
- Check the [README](../README.md) for quick setup
- Browse the wiki sidebar for detailed documentation

## TypeScript Implementation

This is a TypeScript port of the original Python [itch-dl](https://github.com/Wal33D/itch-dl) by Wal33D. The TypeScript version provides the same functionality with improved performance and Node.js ecosystem integration.