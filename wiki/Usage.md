# Usage

This page covers how to use itch-dl with various command-line options and examples.

## Basic Usage

```bash
itch-dl <url_or_path> [options]
```

Where `<url_or_path>` can be:
- An itch.io URL (game, jam, collection, etc.)
- Path to a game jam entries JSON file
- Path to a text file with URLs (one per line)

## Required Setup

You need an itch.io API key to use itch-dl. Get one from [itch.io API keys page](https://itch.io/user/settings/api-keys).

Provide your API key using one of these methods:
1. Command line: `--api-key YOUR_KEY`
2. Environment variable: `export ITCH_API_KEY=YOUR_KEY`
3. Configuration file (see [Configuration](Configuration.md))

## Basic Examples

### Download a Game Jam
```bash
itch-dl https://itch.io/jam/brackeys-12 --api-key YOUR_API_KEY
```

### Download Your Library
```bash
itch-dl https://itch.io/my-purchases --api-key YOUR_API_KEY
```

### Download a Collection
```bash
itch-dl https://itch.io/c/4187503/test-collection --api-key YOUR_API_KEY
```

### Download All Games from a Creator
```bash
itch-dl https://kiseff.itch.io/ --api-key YOUR_API_KEY
# or
itch-dl https://itch.io/profile/pancelor --api-key YOUR_API_KEY
```

### Download Individual Games
```bash
itch-dl https://maddymakesgamesinc.itch.io/celeste --api-key YOUR_API_KEY
```

## Command-Line Options

### Authentication
- `--api-key <key>` - Your itch.io API key
- `--user-agent <agent>` - Custom user agent for HTTP requests

### Download Control
- `--download-to <path>` - Directory to save downloads (default: current directory)
- `--parallel <number>` - Number of parallel downloads (default: 1)
- `--urls-only` - Print URLs without downloading

### Content Options
- `--mirror-web` - Download web assets (images, CSS, etc.) from game pages

### File Filtering

#### Platform Filtering
```bash
--filter-files-platform <platforms...>
```

Supported platforms:
- `windows` (or `win`)
- `linux` (or `lin`) 
- `mac` (or `osx`, `darwin`)
- `android` (or `and`)
- `native` - Downloads for your current platform

Examples:
```bash
# Windows games only
itch-dl https://itch.io/jam/gmtk-2023 --filter-files-platform windows

# Multiple platforms
itch-dl https://itch.io/jam/gmtk-2023 --filter-files-platform windows linux mac

# Native platform
itch-dl https://itch.io/jam/gmtk-2023 --filter-files-platform native
```

#### File Type Filtering
```bash
--filter-files-type <types...>
```

Common file types:
- `default` - Executable/game files
- `soundtrack` - Music files
- `book` - Documentation/books
- `video` - Video files
- `mod` - Game modifications
- `p_windows`, `p_linux`, `p_osx`, `p_android` - Platform-specific files

#### Pattern Filtering
```bash
# Glob pattern (shell-style wildcards)
--filter-files-glob "*.zip"

# Regular expression
--filter-files-regex "\.exe$"
```

### URL Filtering
```bash
# Filter URLs with glob pattern
--filter-urls-glob "*gmtk*"

# Filter URLs with regex
--filter-urls-regex "brackeys"
```

### Configuration
- `--profile <profile>` - Use a specific configuration profile
- `--verbose` - Enable verbose logging

## Advanced Examples

### Download with Multiple Filters
```bash
# Windows ZIP files only from a jam
itch-dl https://itch.io/jam/gmtk-2023 \
  --filter-files-platform windows \
  --filter-files-glob "*.zip" \
  --api-key YOUR_API_KEY
```

### Parallel Downloads
```bash
# Download with 3 parallel threads
itch-dl https://itch.io/jam/brackeys-12 \
  --parallel 3 \
  --api-key YOUR_API_KEY
```

### Just List URLs
```bash
# Get URLs without downloading
itch-dl https://itch.io/jam/brackeys-12 \
  --urls-only \
  --api-key YOUR_API_KEY > urls.txt
```

### Download to Specific Directory
```bash
itch-dl https://itch.io/jam/gmtk-2023 \
  --download-to "/path/to/games" \
  --api-key YOUR_API_KEY
```

### Mirror Web Content
```bash
# Download games plus web assets
itch-dl https://itch.io/jam/brackeys-12 \
  --mirror-web \
  --api-key YOUR_API_KEY
```

## Input File Formats

### Game Jam JSON
Download the entries JSON directly:
```bash
# If you have the jam ID (e.g., 123456)
curl https://itch.io/jam/123456/entries.json > jam.json
itch-dl jam.json --api-key YOUR_API_KEY
```

### URL List File
Create a text file with URLs (one per line):
```
https://game1.itch.io/awesome-game
https://creator.itch.io/another-game
https://itch.io/jam/cool-jam
```

Then use it:
```bash
itch-dl urls.txt --api-key YOUR_API_KEY
```

## Output Structure

Downloaded games are organized as:
```
download-directory/
├── creator1/
│   └── game1/
│       ├── metadata.json
│       ├── site.html
│       ├── cover.jpg
│       ├── files/
│       │   ├── game.zip
│       │   └── soundtrack.mp3
│       └── screenshots/
│           ├── screenshot1.png
│           └── screenshot2.png
└── creator2/
    └── game2/
        └── ...
```

## Error Handling

itch-dl will:
- Skip already downloaded games
- Report failed downloads at the end
- List external download URLs that need manual downloading
- Continue with other games if one fails

Check the output for any manual steps needed after bulk downloading.

## Tips

1. **Start Small**: Test with `--urls-only` first for large jams
2. **Use Parallel Downloads**: Speed up with `--parallel 2-4` (don't overload itch.io)
3. **Filter Early**: Use filters to avoid downloading unwanted content
4. **Save API Key**: Use configuration files to avoid typing your API key repeatedly
5. **Check Logs**: Enable `--verbose` for debugging issues