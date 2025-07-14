<div align="center">

# 📖 Usage Guide

**Master itch-dl with comprehensive examples and command reference**

_From basic downloads to advanced filtering and automation_

---

</div>

## 🚀 Quick Reference

### ⚡ Essential Commands

```bash
# Basic download
itch-dl <URL> --api-key YOUR_KEY

# List URLs only (no download)
itch-dl <URL> --urls-only --api-key YOUR_KEY

# Download with filters
itch-dl <URL> --filter-files-platform windows --api-key YOUR_KEY

# Fast parallel downloads
itch-dl <URL> --parallel 3 --api-key YOUR_KEY
```

### 📋 Input Formats

- 🔗 **itch.io URLs** - Games, jams, collections, profiles
- 📄 **JSON files** - Game jam entries, exported data
- 📝 **Text files** - Lists of URLs (one per line)

---

## 🎯 Basic Examples

### 🏆 Game Jams

```bash
# Download all submissions from a game jam
itch-dl https://itch.io/jam/brackeys-12 --api-key YOUR_KEY

# Popular game jams
itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_KEY
itch-dl https://itch.io/jam/ludum-dare-54 --api-key YOUR_KEY
itch-dl https://itch.io/jam/mini-jam-150 --api-key YOUR_KEY
```

### 📚 Your Library

```bash
# Download everything you own
itch-dl https://itch.io/my-purchases --api-key YOUR_KEY

# Combined with filters for organization
itch-dl https://itch.io/my-purchases \
  --filter-files-platform windows \
  --download-to "/games/windows" \
  --api-key YOUR_KEY
```

### 📂 Collections

```bash
# Public collection
itch-dl https://itch.io/c/4187503/cool-indie-games --api-key YOUR_KEY

# Your personal collection
itch-dl https://itch.io/c/123456/favorites --api-key YOUR_KEY
```

### 👨‍💻 Creator Pages

```bash
# All games from a specific creator
itch-dl https://dani-games.itch.io/ --api-key YOUR_KEY
itch-dl https://maddy.itch.io/ --api-key YOUR_KEY

# Profile page format
itch-dl https://itch.io/profile/pancelor --api-key YOUR_KEY
```

### 🔥 Browse Pages

```bash
# Popular games
itch-dl https://itch.io/games/popular --api-key YOUR_KEY

# Newest releases
itch-dl https://itch.io/games/newest --api-key YOUR_KEY

# Games by tag
itch-dl https://itch.io/games/tag-puzzle --api-key YOUR_KEY
itch-dl https://itch.io/games/tag-platformer --api-key YOUR_KEY
```

### 🎮 Individual Games

```bash
# Single game download
itch-dl https://maddymakesgamesinc.itch.io/celeste --api-key YOUR_KEY
itch-dl https://finji.itch.io/night-in-the-woods --api-key YOUR_KEY
```

---

## 🎯 File Filtering

### 🖥️ Platform Filtering

Filter downloads by target platform:

```bash
# Single platform
itch-dl URL --filter-files-platform windows --api-key YOUR_KEY
itch-dl URL --filter-files-platform linux --api-key YOUR_KEY
itch-dl URL --filter-files-platform mac --api-key YOUR_KEY
itch-dl URL --filter-files-platform android --api-key YOUR_KEY

# Multiple platforms
itch-dl URL --filter-files-platform windows linux mac --api-key YOUR_KEY

# Native platform (auto-detects your OS)
itch-dl URL --filter-files-platform native --api-key YOUR_KEY
```

**Platform aliases supported:**

- `windows`, `win` → Windows
- `linux`, `lin` → Linux
- `mac`, `osx`, `darwin` → macOS
- `android`, `and` → Android
- `native` → Your current platform

### 📁 File Type Filtering

Filter by itch.io file categories:

```bash
# Game executables only
itch-dl URL --filter-files-type default --api-key YOUR_KEY

# Soundtracks only
itch-dl URL --filter-files-type soundtrack --api-key YOUR_KEY

# Documentation/books
itch-dl URL --filter-files-type book --api-key YOUR_KEY

# Video content
itch-dl URL --filter-files-type video --api-key YOUR_KEY

# Game modifications
itch-dl URL --filter-files-type mod --api-key YOUR_KEY

# Multiple types
itch-dl URL --filter-files-type default soundtrack --api-key YOUR_KEY
```

### 🔍 Pattern Filtering

#### Glob Patterns (Shell-style wildcards)

```bash
# Only ZIP files
itch-dl URL --filter-files-glob "*.zip" --api-key YOUR_KEY

# Only executable files
itch-dl URL --filter-files-glob "*.exe" --api-key YOUR_KEY

# Multiple patterns (ZIP or RAR)
itch-dl URL --filter-files-glob "*.{zip,rar}" --api-key YOUR_KEY

# Exclude certain files
itch-dl URL --filter-files-glob "!*.txt" --api-key YOUR_KEY
```

#### Regular Expressions

```bash
# Files ending in .exe or .zip
itch-dl URL --filter-files-regex "\.(exe|zip)$" --api-key YOUR_KEY

# Files containing "windows" in name
itch-dl URL --filter-files-regex "windows" --api-key YOUR_KEY

# Version numbers (v1.0, v2.1, etc.)
itch-dl URL --filter-files-regex "v\d+\.\d+" --api-key YOUR_KEY
```

### 🔗 URL Filtering

Filter which game URLs to process:

```bash
# Only URLs containing "gmtk"
itch-dl URL --filter-urls-glob "*gmtk*" --api-key YOUR_KEY

# URLs matching regex pattern
itch-dl URL --filter-urls-regex "brackeys|gmtk|ludum" --api-key YOUR_KEY

# Exclude certain creators
itch-dl URL --filter-urls-glob "!*badcreator*" --api-key YOUR_KEY
```

---

## ⚡ Advanced Usage

### 🚀 Performance Options

```bash
# Parallel downloads (faster, but don't overload itch.io)
itch-dl URL --parallel 3 --api-key YOUR_KEY

# Custom download directory
itch-dl URL --download-to "/external/drive/games" --api-key YOUR_KEY

# Verbose logging for debugging
itch-dl URL --verbose --api-key YOUR_KEY

# Custom user agent
itch-dl URL --user-agent "MyBot/1.0" --api-key YOUR_KEY
```

### 🌐 Web Content

```bash
# Download game page assets (images, CSS, etc.)
itch-dl URL --mirror-web --api-key YOUR_KEY

# Useful for preserving complete game pages
itch-dl https://maddy.itch.io/celeste --mirror-web --api-key YOUR_KEY
```

### 📋 Dry Run & Planning

```bash
# List all URLs without downloading
itch-dl URL --urls-only --api-key YOUR_KEY

# Save URL list to file
itch-dl URL --urls-only --api-key YOUR_KEY > game_urls.txt

# Count how many games will be downloaded
itch-dl URL --urls-only --api-key YOUR_KEY | wc -l
```

---

## ⚙️ Configuration & Profiles

### 📄 Using Config Files

Instead of typing options every time, save them to config files:

```bash
# Use default config file
itch-dl URL  # API key and options from config

# Use specific profile
itch-dl URL --profile windows-only
itch-dl URL --profile soundtracks-only
```

See [Configuration Guide](Configuration.md) for setup details.

### 🔐 API Key Management

```bash
# Environment variable (recommended for scripts)
export ITCH_API_KEY="your-key-here"
itch-dl URL

# Command line (quick testing)
itch-dl URL --api-key YOUR_KEY

# Config file (best for regular use)
# Set "apiKey": "your-key" in config.json
itch-dl URL
```

---

## 📁 File Input Methods

### 📄 Game Jam JSON Files

Download jam entries JSON directly:

```bash
# Method 1: Let itch-dl fetch it
itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_KEY

# Method 2: Download JSON manually
curl "https://itch.io/jam/123456/entries.json" > jam.json
itch-dl jam.json --api-key YOUR_KEY
```

### 📝 URL List Files

Create text files with URLs (one per line):

```txt
# games.txt
https://maddy.itch.io/celeste
https://finji.itch.io/night-in-the-woods
https://dani-games.itch.io/crab-game
```

```bash
# Use the file
itch-dl games.txt --api-key YOUR_KEY
```

---

## 📊 Output & Organization

### 📂 Download Structure

Downloaded games are organized like this:

```
download-directory/
├── creator1/
│   └── game1/
│       ├── metadata.json      # Game info & ratings
│       ├── site.html          # Game page HTML
│       ├── cover.jpg          # Cover art
│       ├── files/             # Downloadable files
│       │   ├── game.zip
│       │   ├── soundtrack.mp3
│       │   └── manual.pdf
│       └── screenshots/       # Game screenshots
│           ├── screenshot1.png
│           └── screenshot2.png
└── creator2/
    └── game2/
        └── ...
```

### 📋 Download Reports

itch-dl provides detailed reports after completion:

```bash
# Successful downloads show summary
Download complete!
Found 42 URL(s) total.
Will process 39 URL(s) after filtering and deduplication.

# Failed downloads are listed with reasons
Download failed for https://example.itch.io/game:
- File size mismatch: expected 1024MB, got 512MB
- External download URL (download manually!): https://drive.google.com/...

# External URLs require manual download
Notes for https://creator.itch.io/game:
- External download URL: https://dropbox.com/s/abc123/game.zip
```

---

## 🔧 Troubleshooting

### 🚨 Common Issues

<details>
<summary><strong>❌ "You did not provide an API key"</strong></summary>

**Solutions:**

```bash
# Check if API key is set
echo $ITCH_API_KEY

# Set environment variable
export ITCH_API_KEY="your-key"

# Use command line option
itch-dl URL --api-key YOUR_KEY

# Check config file
cat ~/.config/itch-dl/config.json  # Linux
cat ~/Library/Application\ Support/itch-dl/config.json  # macOS
```

</details>

<details>
<summary><strong>❌ "API key appears to be invalid"</strong></summary>

**Solutions:**

```bash
# Test API key manually
curl "https://api.itch.io/profile?api_key=YOUR_KEY"

# Generate new key at: https://itch.io/user/settings/api-keys
# Make sure you copied the entire key
```

</details>

<details>
<summary><strong>❌ "No URLs to download"</strong></summary>

**Causes & Solutions:**

- **All filtered out**: Check your filter settings
- **Already downloaded**: Use `--verbose` to see skipped files
- **Invalid URL**: Verify the itch.io URL is correct
- **Empty jam**: Some jams might have no submissions

```bash
# Debug with verbose output
itch-dl URL --verbose --api-key YOUR_KEY

# Try without filters first
itch-dl URL --api-key YOUR_KEY

# Check if URLs are found
itch-dl URL --urls-only --api-key YOUR_KEY
```

</details>

<details>
<summary><strong>❌ "Download failed" for specific games</strong></summary>

**Common reasons:**

- **External files**: Hosted on Google Drive, Dropbox, etc.
- **Size mismatch**: Download interrupted or corrupted
- **Access restricted**: Need special permissions
- **File moved**: Creator updated/removed files

**Solutions:**

- Check the error report for external URLs
- Try downloading again (may be temporary)
- Contact creator for external downloads
</details>

### 🔍 Debug Mode

Get detailed information about what itch-dl is doing:

```bash
# Enable verbose logging
itch-dl URL --verbose --api-key YOUR_KEY

# This shows:
# - Configuration loading
# - URL processing steps
# - API requests
# - File download progress
# - Error details
```

---

## 🎯 Real-World Examples

### 🏆 Complete Game Jam Archive

```bash
# Download entire GMTK 2023 jam
itch-dl https://itch.io/jam/gmtk-2023 \
  --download-to "/archives/gmtk-2023" \
  --parallel 2 \
  --mirror-web \
  --api-key YOUR_KEY
```

### 🖥️ Platform-Specific Collection

```bash
# Windows games only to specific drive
itch-dl https://itch.io/my-purchases \
  --filter-files-platform windows \
  --download-to "D:/Games/itch-windows" \
  --parallel 3 \
  --api-key YOUR_KEY
```

### 🎵 Soundtrack Collection

```bash
# Only download music files
itch-dl https://itch.io/my-purchases \
  --filter-files-type soundtrack \
  --download-to "/music/game-soundtracks" \
  --api-key YOUR_KEY
```

### 📱 Mobile Games Archive

```bash
# Android games with APK files
itch-dl https://itch.io/games/platform-android \
  --filter-files-platform android \
  --filter-files-glob "*.apk" \
  --download-to "/mobile/android-games" \
  --api-key YOUR_KEY
```

### 🔍 Filtered Creator Archive

```bash
# Specific creator, Windows executables only
itch-dl https://dani-games.itch.io/ \
  --filter-files-platform windows \
  --filter-files-glob "*.{exe,zip}" \
  --download-to "/games/dani" \
  --api-key YOUR_KEY
```

---

## 📚 Advanced Topics

### 🔄 Automation & Scripting

```bash
#!/bin/bash
# Automated backup script

JAMS=(
  "https://itch.io/jam/gmtk-2023"
  "https://itch.io/jam/brackeys-12"
  "https://itch.io/jam/ludum-dare-54"
)

for jam in "${JAMS[@]}"; do
  echo "Downloading: $jam"
  itch-dl "$jam" \
    --download-to "/backup/$(basename $jam)" \
    --parallel 2 \
    --api-key "$ITCH_API_KEY"
done
```

### 📊 Bulk Operations

```bash
# Generate download statistics
itch-dl https://itch.io/jam/gmtk-2023 --urls-only --api-key YOUR_KEY | \
  wc -l > game_count.txt

# Create filtered URL lists
itch-dl https://itch.io/jam/gmtk-2023 --urls-only --api-key YOUR_KEY | \
  grep "windows" > windows_games.txt

# Download from pre-filtered list
itch-dl windows_games.txt --api-key YOUR_KEY
```

---

<div align="center">

## 🎮 Ready to Download!

**Pro tip**: Start with a small jam (like `--urls-only`) to test your setup
before downloading large collections.

Need more help? Check [Configuration](Configuration.md) or
[API Keys](API-Keys.md) guides.

---

**Happy archiving!** 📦

</div>
