<div align="center">

# ⚙️ Configuration Guide

**Optimize itch-dl with config files, profiles, and environment variables**

*Save time and customize your workflow*

---

</div>

## 🚀 Quick Start

### ⚡ Basic Setup
```bash
# 1. Create config directory (auto-created on first run)
itch-dl --help

# 2. Add your API key to config
echo '{"apiKey": "YOUR_API_KEY"}' > ~/.config/itch-dl/config.json  # Linux
echo '{"apiKey": "YOUR_API_KEY"}' > ~/Library/Application\ Support/itch-dl/config.json  # macOS

# 3. Use without typing API key every time
itch-dl https://itch.io/jam/gmtk-2023
```

### 🎯 Why Use Configuration?
- ✅ **No more typing** `--api-key` every time
- ✅ **Save common settings** (download paths, filters, etc.)
- ✅ **Multiple profiles** for different use cases
- ✅ **Environment variables** for CI/automation

---

## 📂 Configuration File Locations

itch-dl follows platform conventions for config files:

<table>
<tr>
<td width="20%"><strong>🐧 Linux</strong></td>
<td><code>~/.config/itch-dl/config.json</code></td>
</tr>
<tr>
<td width="20%"><strong>🍎 macOS</strong></td>
<td><code>~/Library/Application Support/itch-dl/config.json</code></td>
</tr>
<tr>
<td width="20%"><strong>🪟 Windows</strong></td>
<td><code>%APPDATA%/itch-dl/config.json</code></td>
</tr>
</table>

### 🔍 Find Your Config Path
```bash
# The config directory is created automatically
itch-dl --help  # Creates directory structure

# Check if config file exists
ls ~/.config/itch-dl/config.json  # Linux
ls ~/Library/Application\ Support/itch-dl/config.json  # macOS
dir %APPDATA%\itch-dl\config.json  # Windows
```

---

## 📝 Basic Configuration

### 🎯 Essential Settings

Create a `config.json` file with your most-used settings:

```json
{
  "apiKey": "your-itch-io-api-key-here",
  "downloadTo": "/path/to/your/games",
  "parallel": 2,
  "verbose": false
}
```

### 📋 All Available Options

Here's every setting you can configure:

```json
{
  "apiKey": "string",                    // Your itch.io API key
  "userAgent": "string",                 // Custom user agent
  "downloadTo": "string",                // Default download directory
  "mirrorWeb": false,                    // Download web assets
  "urlsOnly": false,                     // List URLs without downloading
  "parallel": 1,                         // Number of parallel downloads
  "filterFilesPlatform": ["windows"],    // Platform filter
  "filterFilesType": ["default"],        // File type filter
  "filterFilesGlob": "string",          // Glob pattern filter
  "filterFilesRegex": "string",         // Regex pattern filter
  "filterUrlsGlob": "string",           // URL glob filter
  "filterUrlsRegex": "string",          // URL regex filter
  "verbose": false                       // Enable verbose logging
}
```

---

## 🎯 Configuration Examples

### 💾 Basic User Config
Perfect for most users:

```json
{
  "apiKey": "your-api-key-here",
  "downloadTo": "/Users/yourname/Games/itch",
  "parallel": 3,
  "verbose": false
}
```

### 🖥️ Windows Gamer Config
Optimized for Windows gaming:

```json
{
  "apiKey": "your-api-key-here",
  "downloadTo": "D:/Games/itch-io",
  "parallel": 2,
  "filterFilesPlatform": ["windows"],
  "filterFilesType": ["default"],
  "verbose": true
}
```

### 🎵 Music Collector Config
Focus on soundtracks and audio:

```json
{
  "apiKey": "your-api-key-here",
  "downloadTo": "/Music/GameSoundtracks",
  "parallel": 4,
  "filterFilesType": ["soundtrack"],
  "filterFilesGlob": "*.{mp3,wav,ogg,flac}",
  "mirrorWeb": false
}
```

### 🔧 Developer Config
For testing and development:

```json
{
  "apiKey": "your-api-key-here",
  "downloadTo": "/tmp/itch-dl-test",
  "parallel": 1,
  "verbose": true,
  "urlsOnly": true
}
```

### 📦 Archival Config
Complete preservation setup:

```json
{
  "apiKey": "your-api-key-here",
  "downloadTo": "/Archives/itch-io",
  "parallel": 2,
  "mirrorWeb": true,
  "verbose": true,
  "userAgent": "itch-dl-archiver/1.0"
}
```

---

## 🎭 Configuration Profiles

Profiles let you save multiple configurations for different scenarios.

### 📁 Creating Profiles

Profiles are stored in the `profiles/` subdirectory:

<table>
<tr>
<td width="20%"><strong>🐧 Linux</strong></td>
<td><code>~/.config/itch-dl/profiles/</code></td>
</tr>
<tr>
<td width="20%"><strong>🍎 macOS</strong></td>
<td><code>~/Library/Application Support/itch-dl/profiles/</code></td>
</tr>
<tr>
<td width="20%"><strong>🪟 Windows</strong></td>
<td><code>%APPDATA%/itch-dl/profiles/</code></td>
</tr>
</table>

### 🎯 Example Profile Setup

```bash
# Create profiles directory
mkdir -p ~/.config/itch-dl/profiles  # Linux/macOS
mkdir %APPDATA%\itch-dl\profiles     # Windows
```

**Profile: `windows-only`**
```json
{
  "filterFilesPlatform": ["windows"],
  "downloadTo": "/games/windows-only",
  "parallel": 3
}
```

**Profile: `soundtracks`**
```json
{
  "filterFilesType": ["soundtrack"],
  "downloadTo": "/music/game-soundtracks",
  "filterFilesGlob": "*.{mp3,wav,ogg,flac}",
  "parallel": 4
}
```

**Profile: `mobile`**
```json
{
  "filterFilesPlatform": ["android"],
  "filterFilesGlob": "*.apk",
  "downloadTo": "/mobile/android-games"
}
```

**Profile: `testing`**
```json
{
  "urlsOnly": true,
  "verbose": true,
  "parallel": 1
}
```

### 🔄 Using Profiles

```bash
# Use a specific profile
itch-dl https://itch.io/jam/gmtk-2023 --profile windows-only
itch-dl https://itch.io/my-purchases --profile soundtracks
itch-dl https://itch.io/games/platform-android --profile mobile

# Test before downloading
itch-dl https://itch.io/jam/brackeys-12 --profile testing
```

---

## 🌍 Environment Variables

### 🔐 API Key via Environment

Perfect for CI/CD, scripts, or shared computers:

```bash
# Set environment variable
export ITCH_API_KEY="your-api-key-here"

# Now you can use itch-dl without --api-key
itch-dl https://itch.io/jam/gmtk-2023

# Make it permanent (add to ~/.bashrc, ~/.zshrc, etc.)
echo 'export ITCH_API_KEY="your-api-key-here"' >> ~/.bashrc
```

### 🪟 Windows Environment Variables

```cmd
# Command Prompt
set ITCH_API_KEY=your-api-key-here

# PowerShell
$env:ITCH_API_KEY = "your-api-key-here"

# Permanent (System Properties > Environment Variables)
# Variable: ITCH_API_KEY
# Value: your-api-key-here
```

### 🐋 Docker/Container Usage

```dockerfile
# Dockerfile
ENV ITCH_API_KEY=your-api-key-here

# docker run
docker run -e ITCH_API_KEY=your-key your-image
```

---

## 🔄 Configuration Priority

Settings are applied in this order (later overrides earlier):

1. **🏗️ Built-in defaults** - itch-dl's default settings
2. **📄 Main config file** - `config.json`
3. **🎭 Profile settings** - `profiles/profile-name` (if `--profile` used)
4. **🌍 Environment variables** - `ITCH_API_KEY`
5. **⌨️ Command line options** - `--api-key`, `--parallel`, etc.

### 📊 Example Priority Resolution

```bash
# config.json
{
  "parallel": 2,
  "downloadTo": "/games"
}

# profiles/fast
{
  "parallel": 5
}

# Command
itch-dl URL --profile fast --parallel 1

# Result: parallel=1 (command line wins)
#         downloadTo="/games" (from config.json)
```

---

## ✅ Configuration Validation

itch-dl validates your configuration and provides helpful error messages:

### 🚨 Common Validation Errors

<details>
<summary><strong>❌ Invalid JSON syntax</strong></summary>

```json
{
  "apiKey": "test"  // Missing comma
  "parallel": 2
}
```

**Error**: `SyntaxError: Unexpected token`  
**Fix**: Use proper JSON syntax with commas between properties
</details>

<details>
<summary><strong>❌ Wrong data types</strong></summary>

```json
{
  "parallel": "3",    // Should be number, not string
  "verbose": "true"   // Should be boolean, not string
}
```

**Error**: `Settings.parallel has invalid type 'string', expected 'number'`  
**Fix**: Use correct data types (numbers, booleans, arrays)
</details>

<details>
<summary><strong>❌ Unknown settings</strong></summary>

```json
{
  "apiKey": "test",
  "paralell": 3,     // Typo: should be "parallel"
  "unknownSetting": true
}
```

**Warning**: `Settings contain an unknown item, ignoring: 'paralell'`  
**Fix**: Check spelling and refer to valid setting names
</details>

### ✅ Validate Your Config

```bash
# Test configuration loading
itch-dl --help --verbose

# This will show:
# - Which config file was loaded
# - Any validation warnings
# - Final merged settings
```

---

## 🔧 Advanced Configuration

### 🎭 Dynamic Profile Selection

Create profiles for different scenarios:

```bash
# Work profile (conservative settings)
itch-dl URL --profile work

# Home profile (fast downloads)
itch-dl URL --profile home

# Archive profile (everything + web assets)
itch-dl URL --profile archive
```

### 📝 Configuration Templates

Save these as starting points:

**Minimal Config** (`minimal.json`):
```json
{
  "apiKey": "your-key-here"
}
```

**Complete Config** (`complete.json`):
```json
{
  "apiKey": "your-key-here",
  "userAgent": "itch-dl-custom/1.0",
  "downloadTo": "/path/to/games",
  "mirrorWeb": false,
  "urlsOnly": false,
  "parallel": 3,
  "filterFilesPlatform": null,
  "filterFilesType": null,
  "filterFilesGlob": null,
  "filterFilesRegex": null,
  "filterUrlsGlob": null,
  "filterUrlsRegex": null,
  "verbose": false
}
```

### 🔄 Configuration Management

```bash
# Backup your config
cp ~/.config/itch-dl/config.json ~/.config/itch-dl/config.backup

# Copy config to another machine
scp ~/.config/itch-dl/config.json user@host:~/.config/itch-dl/

# Version control your profiles (exclude API keys!)
git add ~/.config/itch-dl/profiles/
# Never add config.json with real API keys to git!
```

---

## 🛠️ Troubleshooting Configuration

### 🔍 Debug Configuration Loading

```bash
# See which config files are loaded
itch-dl --verbose --help

# Output shows:
# Found config file: /path/to/config.json
# Found profile: /path/to/profiles/profile-name
# Final settings: {...}
```

### 🚨 Common Issues

<details>
<summary><strong>❌ Config file not found</strong></summary>

**Problem**: itch-dl can't find your config file

**Solutions**:
```bash
# Check if directory exists
ls ~/.config/itch-dl/  # Linux
ls ~/Library/Application\ Support/itch-dl/  # macOS

# Create directory if missing
mkdir -p ~/.config/itch-dl/  # Linux
mkdir -p ~/Library/Application\ Support/itch-dl/  # macOS

# Check file permissions
ls -la ~/.config/itch-dl/config.json
```
</details>

<details>
<summary><strong>❌ Profile not found</strong></summary>

**Problem**: `--profile profilename` fails

**Solutions**:
```bash
# Check if profile exists
ls ~/.config/itch-dl/profiles/profilename

# List available profiles
ls ~/.config/itch-dl/profiles/

# Create missing profile
echo '{"parallel": 2}' > ~/.config/itch-dl/profiles/profilename
```
</details>

<details>
<summary><strong>❌ Environment variable not working</strong></summary>

**Problem**: `ITCH_API_KEY` not recognized

**Solutions**:
```bash
# Check if variable is set
echo $ITCH_API_KEY

# Set for current session
export ITCH_API_KEY="your-key"

# Make permanent (add to shell profile)
echo 'export ITCH_API_KEY="your-key"' >> ~/.bashrc
source ~/.bashrc
```
</details>

---

## 📚 Real-World Configuration Examples

### 🏢 Team/Organization Setup

**Shared config template** (remove API key before sharing):
```json
{
  "userAgent": "CompanyName-itch-dl/1.0",
  "downloadTo": "/shared/games",
  "parallel": 2,
  "verbose": true,
  "mirrorWeb": true
}
```

**Individual developer adds:**
```bash
export ITCH_API_KEY="individual-dev-key"
```

### 🎮 Gaming Setup

**Base config**:
```json
{
  "apiKey": "your-key",
  "downloadTo": "/Games/itch-io",
  "parallel": 3
}
```

**Platform-specific profiles**:
```bash
# profiles/windows
{"filterFilesPlatform": ["windows"], "downloadTo": "/Games/itch-windows"}

# profiles/linux  
{"filterFilesPlatform": ["linux"], "downloadTo": "/Games/itch-linux"}

# profiles/retro
{"filterFilesGlob": "*.{gb,gbc,nes,snes}", "downloadTo": "/Games/retro"}
```

### 📦 Automated Backup

**CI/CD config**:
```bash
#!/bin/bash
export ITCH_API_KEY="$SECRET_API_KEY"

itch-dl https://itch.io/my-purchases \
  --download-to "/backup/$(date +%Y-%m-%d)" \
  --parallel 1 \
  --verbose
```

---

<div align="center">

## 🎯 Configuration Best Practices

✅ **Start simple** - Begin with just API key and download path  
✅ **Use profiles** - Create profiles for different scenarios  
✅ **Secure API keys** - Never commit real keys to version control  
✅ **Test first** - Use `--urls-only` to test configurations  
✅ **Document profiles** - Add comments explaining each profile's purpose  

---

**Ready to optimize your workflow!** 🚀

Check out [Usage examples](Usage.md) to see your configuration in action.

</div>