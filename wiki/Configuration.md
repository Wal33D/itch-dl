# Configuration

itch-dl supports configuration files to avoid repeating command-line options. This page explains how to set up and use configuration files and profiles.

## Configuration File Location

itch-dl looks for configuration files in platform-specific directories:

- **Linux**: `~/.config/itch-dl/config.json`
- **macOS**: `~/Library/Application Support/itch-dl/config.json`  
- **Windows**: `%APPDATA%/itch-dl/config.json`

The configuration directory is created automatically when needed.

## Basic Configuration File

Create a `config.json` file with your default settings:

```json
{
  "apiKey": "your-itch-io-api-key-here",
  "downloadTo": "/path/to/your/games",
  "parallel": 2,
  "verbose": false,
  "mirrorWeb": false,
  "filterFilesPlatform": ["windows", "linux"]
}
```

## Available Configuration Options

All command-line options can be configured in the JSON file:

### Authentication
```json
{
  "apiKey": "your-api-key",
  "userAgent": "custom-user-agent"
}
```

### Download Settings
```json
{
  "downloadTo": "/path/to/downloads",
  "parallel": 3,
  "urlsOnly": false,
  "mirrorWeb": true
}
```

### File Filtering
```json
{
  "filterFilesPlatform": ["windows", "mac"],
  "filterFilesType": ["default", "soundtrack"],
  "filterFilesGlob": "*.zip",
  "filterFilesRegex": "\\.(zip|exe)$"
}
```

### URL Filtering
```json
{
  "filterUrlsGlob": "*gmtk*",
  "filterUrlsRegex": "brackeys"
}
```

### Debug Options
```json
{
  "verbose": true
}
```

## Configuration Profiles

You can create multiple configuration profiles for different use cases.

### Creating Profiles

Create a `profiles` directory in your configuration directory:

- **Linux**: `~/.config/itch-dl/profiles/`
- **macOS**: `~/Library/Application Support/itch-dl/profiles/`
- **Windows**: `%APPDATA%/itch-dl/profiles/`

### Profile Examples

**Profile: `windows-only`**
```json
{
  "filterFilesPlatform": ["windows"],
  "downloadTo": "/games/windows-only"
}
```

**Profile: `soundtracks`**
```json
{
  "filterFilesType": ["soundtrack"],
  "downloadTo": "/music/game-soundtracks"
}
```

**Profile: `development`**
```json
{
  "verbose": true,
  "parallel": 1,
  "urlsOnly": true
}
```

### Using Profiles

Use the `--profile` option to load a specific profile:

```bash
# Use the windows-only profile
itch-dl https://itch.io/jam/gmtk-2023 --profile windows-only

# Use the soundtracks profile
itch-dl https://itch.io/my-purchases --profile soundtracks
```

## Configuration Priority

Settings are applied in this order (later overrides earlier):

1. **Default settings** (built into itch-dl)
2. **Main config file** (`config.json`)
3. **Profile settings** (if `--profile` is used)
4. **Command-line options**

## Environment Variables

Some settings can be provided via environment variables:

### API Key
```bash
export ITCH_API_KEY="your-api-key-here"
itch-dl https://itch.io/jam/gmtk-2023
```

This is useful for CI/CD environments or when you don't want to store the API key in a file.

## Example Configurations

### Complete Configuration
```json
{
  "apiKey": "your-api-key-here",
  "userAgent": "itch-dl-custom/1.0",
  "downloadTo": "/home/user/games",
  "mirrorWeb": true,
  "urlsOnly": false,
  "parallel": 3,
  "filterFilesPlatform": ["windows", "linux"],
  "filterFilesType": ["default"],
  "filterFilesGlob": null,
  "filterFilesRegex": null,
  "filterUrlsGlob": null,
  "filterUrlsRegex": null,
  "verbose": false
}
```

### Minimal Configuration
```json
{
  "apiKey": "your-api-key-here",
  "downloadTo": "/games"
}
```

## Validation

itch-dl validates your configuration and will show warnings for:
- Unknown configuration keys
- Invalid value types
- Invalid settings

If validation fails, itch-dl will exit with an error message.

## Tips

1. **Start Simple**: Begin with just `apiKey` and `downloadTo`
2. **Test Profiles**: Use `--urls-only` to test profile settings
3. **Keep API Keys Safe**: Don't commit configuration files with API keys to git
4. **Use Environment Variables**: For CI/CD or shared computers
5. **Profile Organization**: Create profiles for different types of downloads

## Troubleshooting

### Configuration Not Loading
- Check the file path matches your operating system
- Verify JSON syntax with a JSON validator
- Use `--verbose` to see configuration loading messages

### Permission Issues
- Ensure the configuration directory is writable
- Check file permissions on configuration files

### Profile Not Found
```bash
itch-dl https://example.com --profile nonexistent
# Error: Profile 'nonexistent' not found
```

Make sure the profile file exists in the profiles directory.