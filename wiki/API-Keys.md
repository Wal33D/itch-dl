# API Keys

itch-dl requires an itch.io API key to access the itch.io API for downloading games. This page explains how to obtain and use API keys.

## What is an API Key?

An API key is a unique identifier that allows itch-dl to access your itch.io account and download games you have access to. The API key acts as authentication, allowing itch-dl to:

- Access your game library
- Download games you own
- Access collections you've created
- Download games from your download keys

## Getting Your API Key

1. **Log into itch.io** with your account
2. Go to your **[API Keys page](https://itch.io/user/settings/api-keys)**
3. Click **"Generate new API key"**
4. Give your key a descriptive name (e.g., "itch-dl downloads")
5. **Copy the generated key** - you won't be able to see it again!

⚠️ **Important**: Save your API key securely. You cannot view it again after creation - you'll need to generate a new one if you lose it.

## Using Your API Key

There are three ways to provide your API key to itch-dl:

### 1. Command Line (Quick Testing)
```bash
itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_API_KEY_HERE
```

### 2. Environment Variable (Recommended for CI/Scripts)
```bash
export ITCH_API_KEY="YOUR_API_KEY_HERE"
itch-dl https://itch.io/jam/gmtk-2023
```

### 3. Configuration File (Recommended for Regular Use)

Create a configuration file (see [Configuration](Configuration.md)):

```json
{
  "apiKey": "YOUR_API_KEY_HERE"
}
```

Then use itch-dl without specifying the key:
```bash
itch-dl https://itch.io/jam/gmtk-2023
```

## What Your API Key Allows

Your API key gives itch-dl access to:

### ✅ Your Purchased Games
- Games you've bought
- Games you've claimed for free
- Games from bundles you own

### ✅ Your Collections
- Collections you've created
- Public collections you can access

### ✅ Download Keys
- Games you have download keys for
- Press copies and review copies

### ✅ Public Content
- Free games
- Game jam submissions
- Public game pages

### ❌ What It CANNOT Access
- Paid games you don't own
- Private/restricted games you don't have access to
- Other users' private collections
- Games from bundles you don't own

## API Key Security

### Keep Your Key Safe
- **Don't share** your API key with others
- **Don't commit** API keys to public repositories
- **Don't post** API keys in forums or chat rooms
- **Use environment variables** or config files instead of command line for scripts

### Revoking Keys
If your API key is compromised:
1. Go to your [API Keys page](https://itch.io/user/settings/api-keys)
2. Delete the compromised key
3. Generate a new one
4. Update your configuration

### Multiple Keys
You can create multiple API keys for different purposes:
- One for development/testing
- One for production scripts
- One for different devices

## Troubleshooting

### "API key appears to be invalid"
This error means itch-dl cannot authenticate with your API key:

1. **Check the key**: Make sure you copied it correctly
2. **Check permissions**: Ensure your itch.io account has access to what you're trying to download
3. **Try a new key**: Generate a fresh API key
4. **Check network**: Ensure you can access itch.io

### "You did not provide an API key"
This means itch-dl couldn't find your API key:

1. **Check command line**: Did you use `--api-key`?
2. **Check environment**: Is `ITCH_API_KEY` set?
3. **Check config file**: Is `apiKey` in your configuration?

### Testing Your API Key
Test if your API key works:

```bash
# This should show your profile info if the key works
curl "https://api.itch.io/profile?api_key=YOUR_API_KEY"
```

## Best Practices

1. **Use Configuration Files**: Store your API key in the config file for regular use
2. **Use Environment Variables**: For automated scripts and CI/CD
3. **Create Descriptive Names**: When generating keys, use names that help you remember their purpose
4. **Regular Rotation**: Consider generating new keys periodically for security
5. **Monitor Usage**: Keep track of which keys you're using where

## Privacy and Permissions

Your API key only has access to:
- Content you legitimately own or have access to
- Public content available to all users

itch-dl respects itch.io's terms of service and only downloads content you have legitimate access to. The tool cannot and will not:
- Bypass payment requirements
- Access restricted content you don't own
- Download content you don't have permission to access

## Rate Limiting

itch.io may rate limit API requests to prevent abuse. If you encounter rate limiting:
- Reduce the `--parallel` setting
- Add delays between downloads
- Avoid making too many requests in a short time

The itch-dl client includes automatic retry logic for temporary failures.