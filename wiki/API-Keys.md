<div align="center">

# 🔑 API Keys Guide

**Secure authentication for itch-dl downloads**

*Everything you need to know about getting, using, and managing your itch.io API key*

---

</div>

## 🚀 Quick Start

### ⚡ Get Your API Key in 3 Steps
1. **Log in** to [itch.io](https://itch.io)
2. **Visit** [API Keys page](https://itch.io/user/settings/api-keys)
3. **Generate** a new key and copy it immediately

### 🎯 Use Your API Key
```bash
# Method 1: Command line (quick testing)
itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_API_KEY

# Method 2: Environment variable (recommended)
export ITCH_API_KEY="YOUR_API_KEY"
itch-dl https://itch.io/jam/gmtk-2023

# Method 3: Config file (best for regular use)
echo '{"apiKey": "YOUR_API_KEY"}' > ~/.config/itch-dl/config.json
itch-dl https://itch.io/jam/gmtk-2023
```

---

## 🤔 What is an API Key?

### 🔐 Authentication Token
An API key is a **unique identifier** that allows itch-dl to access your itch.io account securely:

- 🔑 **Authenticates** your requests to itch.io
- 📚 **Provides access** to your game library and purchases
- 🔒 **Respects permissions** - only downloads what you can legally access
- 🚫 **Cannot** download paid games you don't own

### ✅ What Your API Key Allows

<table>
<tr>
<td width="50%">

#### 🎯 Full Access
- ✅ Your purchased games
- ✅ Your claimed free games  
- ✅ Games from bundles you own
- ✅ Your collections
- ✅ Games you have download keys for
- ✅ Public free games
- ✅ Game jam submissions

</td>
<td width="50%">

#### ❌ No Access
- ❌ Paid games you don't own
- ❌ Private games without permission
- ❌ Other users' private collections
- ❌ DRM-protected content
- ❌ Access-restricted games

</td>
</tr>
</table>

---

## 🔑 Getting Your API Key

### 📋 Step-by-Step Guide

#### 1️⃣ Sign In to itch.io
Visit [itch.io](https://itch.io) and log in with your account.

#### 2️⃣ Navigate to API Settings
Go to **[API Keys page](https://itch.io/user/settings/api-keys)** or:
- Click your profile → **Settings** → **API Keys**

#### 3️⃣ Generate New Key
- Click **"Generate new API key"**
- Give it a descriptive name (e.g., "itch-dl downloads")
- Click **Generate**

#### 4️⃣ Copy Your Key
⚠️ **IMPORTANT**: Copy the key **immediately** - you won't see it again!

```
Example key format: abc123def456ghi789jkl012mno345pqr678stu
```

### 🏷️ Key Naming Best Practices

Choose descriptive names to track usage:

- ✅ **"itch-dl-home-computer"** - Clear purpose and location
- ✅ **"bulk-downloader-2024"** - Tool and year
- ✅ **"archive-project"** - Specific project
- ❌ **"key1"** - Not descriptive
- ❌ **"temp"** - Vague purpose

---

## 💾 Using Your API Key

### 🎯 Three Methods Compared

<table>
<tr>
<th width="25%">Method</th>
<th width="25%">Best For</th>
<th width="25%">Pros</th>
<th width="25%">Cons</th>
</tr>
<tr>
<td><strong>Command Line</strong></td>
<td>Quick testing</td>
<td>Simple, immediate</td>
<td>Repetitive, visible in history</td>
</tr>
<tr>
<td><strong>Environment Variable</strong></td>
<td>Scripts, CI/CD</td>
<td>Secure, automated</td>
<td>Session-specific</td>
</tr>
<tr>
<td><strong>Config File</strong></td>
<td>Regular use</td>
<td>Persistent, convenient</td>
<td>File security needed</td>
</tr>
</table>

### 1️⃣ Command Line Method

Perfect for testing or one-off downloads:

```bash
itch-dl https://itch.io/jam/gmtk-2023 --api-key abc123def456ghi789jkl012mno345pqr678stu
```

**✅ Pros**: Quick and simple  
**❌ Cons**: Key visible in command history, need to type each time

### 2️⃣ Environment Variable Method

Best for automation and scripts:

```bash
# Set for current session
export ITCH_API_KEY="abc123def456ghi789jkl012mno345pqr678stu"

# Now use itch-dl without --api-key
itch-dl https://itch.io/jam/gmtk-2023

# Make permanent (add to ~/.bashrc, ~/.zshrc, etc.)
echo 'export ITCH_API_KEY="abc123def456ghi789jkl012mno345pqr678stu"' >> ~/.bashrc
```

**Platform-specific setup:**

<details>
<summary><strong>🐧 Linux / 🍎 macOS</strong></summary>

```bash
# Temporary (current session only)
export ITCH_API_KEY="your-key"

# Permanent - add to shell profile
echo 'export ITCH_API_KEY="your-key"' >> ~/.bashrc    # Bash
echo 'export ITCH_API_KEY="your-key"' >> ~/.zshrc     # Zsh
source ~/.bashrc  # Reload configuration
```
</details>

<details>
<summary><strong>🪟 Windows</strong></summary>

```cmd
# Command Prompt (temporary)
set ITCH_API_KEY=your-key

# PowerShell (temporary)
$env:ITCH_API_KEY = "your-key"

# Permanent: System Properties > Advanced > Environment Variables
# Variable name: ITCH_API_KEY
# Variable value: your-key
```
</details>

### 3️⃣ Configuration File Method

Best for regular users:

```bash
# Create config directory (if it doesn't exist)
mkdir -p ~/.config/itch-dl/  # Linux
mkdir -p ~/Library/Application\ Support/itch-dl/  # macOS
mkdir %APPDATA%\itch-dl\  # Windows

# Create config file
echo '{"apiKey": "your-key-here"}' > ~/.config/itch-dl/config.json
```

**Full config example:**
```json
{
  "apiKey": "abc123def456ghi789jkl012mno345pqr678stu",
  "downloadTo": "/path/to/games",
  "parallel": 2,
  "verbose": false
}
```

See [Configuration Guide](Configuration.md) for complete setup.

---

## 🔒 API Key Security

### 🛡️ Security Best Practices

#### ✅ DO
- ✅ **Keep keys private** - Never share or expose them
- ✅ **Use descriptive names** - Track what each key is for
- ✅ **Rotate keys periodically** - Generate new ones occasionally
- ✅ **Use environment variables** - For scripts and automation
- ✅ **Secure config files** - Proper file permissions
- ✅ **Delete unused keys** - Clean up old/compromised keys

#### ❌ DON'T
- ❌ **Commit to version control** - Never add to git repositories
- ❌ **Share in public forums** - Don't post in Discord, Reddit, etc.
- ❌ **Email or message** - Keys can be intercepted
- ❌ **Screenshot with key visible** - Blur sensitive information
- ❌ **Use in public scripts** - Hide keys with environment variables

### 🔐 File Permissions

Secure your configuration files:

```bash
# Set restrictive permissions (Linux/macOS)
chmod 600 ~/.config/itch-dl/config.json
chmod 700 ~/.config/itch-dl/

# Verify permissions
ls -la ~/.config/itch-dl/config.json
# Should show: -rw------- (owner read/write only)
```

### 🔄 Key Rotation

Regularly update your API keys:

```bash
# 1. Generate new key at: https://itch.io/user/settings/api-keys
# 2. Update your configuration
# 3. Test the new key
itch-dl https://itch.io/jam/mini-jam-150 --urls-only --api-key NEW_KEY
# 4. Delete the old key from itch.io
```

---

## 🔧 Managing Multiple Keys

### 🎭 Different Keys for Different Purposes

You can create multiple API keys for organization:

```bash
# Development key
ITCH_API_KEY_DEV="dev-key-here"

# Production key  
ITCH_API_KEY_PROD="prod-key-here"

# Archive key
ITCH_API_KEY_ARCHIVE="archive-key-here"

# Use specific keys
itch-dl URL --api-key "$ITCH_API_KEY_DEV"
```

### 🏢 Team/Organization Usage

**For shared projects:**

1. **Each team member** gets their own API key
2. **Use environment variables** to avoid committing keys
3. **Document the setup** in README (without actual keys)

```bash
# .env.example (safe to commit)
ITCH_API_KEY=your-key-here

# .env (never commit)
ITCH_API_KEY=abc123def456ghi789jkl012mno345pqr678stu
```

---

## 🚨 Troubleshooting API Keys

### 🔍 Common Issues & Solutions

<details>
<summary><strong>❌ "You did not provide an API key"</strong></summary>

**Problem**: itch-dl can't find your API key

**Solutions:**
```bash
# Check if environment variable is set
echo $ITCH_API_KEY

# Check config file exists
cat ~/.config/itch-dl/config.json

# Use command line as fallback
itch-dl URL --api-key YOUR_KEY

# Debug configuration loading
itch-dl --verbose --help
```
</details>

<details>
<summary><strong>❌ "API key appears to be invalid"</strong></summary>

**Problem**: itch.io rejects your API key

**Causes & Solutions:**
- **Typo in key**: Double-check you copied the entire key
- **Key deleted**: Check [API Keys page](https://itch.io/user/settings/api-keys)
- **Key expired**: Some keys may expire (rare)
- **Account issues**: Verify you can log into itch.io normally

**Test your key manually:**
```bash
curl "https://api.itch.io/profile?api_key=YOUR_KEY"
# Should return your profile JSON, not an error
```
</details>

<details>
<summary><strong>❌ "Could not download the game site"</strong></summary>

**Problem**: Network or permission issues

**Solutions:**
- **Check internet connection**: Verify you can access itch.io
- **Try different URL**: Test with a public game first
- **Check API key permissions**: Ensure key has necessary access
- **Temporary itch.io issues**: Try again later
</details>

<details>
<summary><strong>❌ Rate limiting errors</strong></summary>

**Problem**: Too many requests to itch.io

**Solutions:**
```bash
# Reduce parallel downloads
itch-dl URL --parallel 1 --api-key YOUR_KEY

# Add delays between requests (built-in retry logic)
# Wait and try again later

# Check if you're running multiple itch-dl instances
```
</details>

### 🔍 Debug Your API Key

Test if your API key works:

```bash
# Method 1: Test with itch-dl
itch-dl https://itch.io/jam/mini-jam-150 --urls-only --api-key YOUR_KEY

# Method 2: Direct API test
curl "https://api.itch.io/profile?api_key=YOUR_KEY"

# Method 3: Verbose debugging
itch-dl URL --verbose --api-key YOUR_KEY
```

---

## 🌍 Environment-Specific Setup

### 🐋 Docker Containers

```dockerfile
# Dockerfile
ENV ITCH_API_KEY=""

# At runtime
docker run -e ITCH_API_KEY="your-key" your-image
```

### 🔄 CI/CD Pipelines

**GitHub Actions:**
```yaml
env:
  ITCH_API_KEY: ${{ secrets.ITCH_API_KEY }}

steps:
  - name: Download games
    run: itch-dl https://itch.io/my-purchases
```

**GitLab CI:**
```yaml
variables:
  ITCH_API_KEY: $ITCH_API_KEY

script:
  - itch-dl https://itch.io/my-purchases
```

### 🖥️ Development vs Production

```bash
# Development environment
export ITCH_API_KEY="dev-key-with-limited-access"

# Production environment
export ITCH_API_KEY="prod-key-with-full-access"

# Test which environment
echo "Using API key: ${ITCH_API_KEY:0:8}..." # Shows first 8 chars
```

---

## 🎯 Advanced API Key Usage

### 📊 Key Analytics & Monitoring

Track your API usage:

```bash
# Add to your scripts for monitoring
echo "$(date): Starting download with key ${ITCH_API_KEY:0:8}..." >> api_usage.log

# Monitor rate limits
itch-dl URL --verbose --api-key YOUR_KEY 2>&1 | grep -i "rate\|limit\|retry"
```

### 🔄 Automatic Key Rotation

```bash
#!/bin/bash
# rotate_api_key.sh

# Check if current key is working
if ! curl -sf "https://api.itch.io/profile?api_key=$ITCH_API_KEY" > /dev/null; then
    echo "API key needs rotation"
    # Send notification to admin
    echo "Please generate new API key" | mail admin@company.com
fi
```

### 🎭 Key-Based Profiles

Different configurations for different keys:

```json
// ~/.config/itch-dl/profiles/personal
{
  "downloadTo": "/home/user/games",
  "parallel": 3
}

// ~/.config/itch-dl/profiles/archive
{
  "downloadTo": "/archive/itch-backups",
  "parallel": 1,
  "mirrorWeb": true
}
```

```bash
# Use different profiles with different keys
ITCH_API_KEY="personal-key" itch-dl URL --profile personal
ITCH_API_KEY="archive-key" itch-dl URL --profile archive
```

---

## 📚 API Key Best Practices Summary

<div align="center">

### 🎯 Quick Reference

| Situation | Recommended Method | Security Level |
|-----------|-------------------|----------------|
| **Testing** | Command line | ⚠️ Low |
| **Regular use** | Config file | 🔒 Medium |
| **Automation** | Environment variables | 🔐 High |
| **CI/CD** | Secret management | 🛡️ Highest |

### 🔒 Security Checklist

- ✅ Key has descriptive name
- ✅ Config file has restrictive permissions (600)
- ✅ Key not committed to version control
- ✅ Environment variables used for scripts
- ✅ Old/unused keys deleted
- ✅ Key rotation planned
- ✅ Team members have individual keys

</div>

---

<div align="center">

## 🎮 Ready to Download!

**Your API key is your gateway to the itch.io ecosystem.**

Use it responsibly, keep it secure, and respect itch.io's terms of service.

---

**Need help?** Check [Configuration](Configuration.md) for advanced setups or [Usage](Usage.md) for download examples.

🔑 **Happy downloading!**

</div>