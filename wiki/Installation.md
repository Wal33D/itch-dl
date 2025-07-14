<div align="center">

# 💾 Installation Guide

**Get itch-dl up and running on your system**

*Complete setup instructions with troubleshooting*

---

</div>

## 🚀 Quick Install (Recommended)

### ⚡ One-Line Install
```bash
npm install -g itch-dl
```

### ✅ Verify Installation
```bash
itch-dl --version
# Should output: itch-dl version x.x.x
```

**That's it!** 🎉 Jump to [Getting Your API Key](#-getting-your-api-key) next.

---

## 📋 Prerequisites

Before installing itch-dl, ensure you have:

<table>
<tr>
<td width="30%">

### 📦 Required
- **Node.js 18+**
- **npm** (included with Node.js)
- **itch.io account**

</td>
<td width="70%">

### 🔗 Download Links
- [Node.js Download](https://nodejs.org/) - Choose LTS version
- [itch.io Sign Up](https://itch.io/register) - Free account
- [itch.io API Keys](https://itch.io/user/settings/api-keys) - Generate after signup

</td>
</tr>
</table>

### 🔍 Check Your System
```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check if you can access itch.io
curl -I https://itch.io
```

---

## 📦 Installation Methods

### Method 1: npm Global Install (Recommended)

```bash
# Install globally for system-wide access
npm install -g itch-dl

# Test installation
itch-dl --help
```

**✅ Pros**: Easy to use anywhere, automatic PATH setup  
**❌ Cons**: Requires npm permission setup on some systems

### Method 2: npx (No Installation)

```bash
# Run without installing
npx itch-dl --help

# Use for downloads
npx itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_KEY
```

**✅ Pros**: No installation needed, always latest version  
**❌ Cons**: Slower startup, downloads package each time

### Method 3: Local Install

```bash
# Install in current directory
npm install itch-dl

# Run locally
npx itch-dl --help
```

**✅ Pros**: Project-specific version control  
**❌ Cons**: Only works in that directory

---

## 🔧 Advanced Installation

### 🛠️ Install from Source

Perfect for developers or if you want the latest features:

```bash
# Clone the repository
git clone https://github.com/Wal33D/itch-dl.git
cd itch-dl

# Install dependencies
npm install

# Build the project
npm run build

# Link for global usage (optional)
npm link

# Test the build
node build/src/index.js --help
```

### 📊 Development Setup

If you plan to contribute or modify itch-dl:

```bash
git clone https://github.com/Wal33D/itch-dl.git
cd itch-dl
npm install

# Available development commands
npm run build        # Compile TypeScript
npm test            # Run test suite
npm run clean       # Clean build artifacts
npm run prepare     # Pre-publish preparation
```

---

## 🔑 Getting Your API Key

After installation, you need an itch.io API key:

### 🎯 Quick Steps
1. **Log in** to [itch.io](https://itch.io)
2. **Visit** [API Keys page](https://itch.io/user/settings/api-keys)
3. **Click** "Generate new API key"
4. **Name** your key (e.g., "itch-dl downloads")
5. **Copy** the generated key ⚠️ *You won't see it again!*

### 💾 Save Your Key

Choose one of these methods:

```bash
# Method 1: Environment variable (recommended for scripts)
export ITCH_API_KEY="your-api-key-here"

# Method 2: Command line (quick testing)
itch-dl URL --api-key your-api-key-here

# Method 3: Config file (best for regular use)
# See Configuration Guide for details
```

---

## 🔧 Troubleshooting

### 🚨 Common Issues & Solutions

<details>
<summary><strong>❌ "npm: command not found"</strong></summary>

**Problem**: Node.js/npm not installed or not in PATH

**Solutions**:
```bash
# Install Node.js from official website
# https://nodejs.org/

# On macOS with Homebrew
brew install node

# On Ubuntu/Debian
sudo apt update && sudo apt install nodejs npm

# Verify installation
node --version && npm --version
```
</details>

<details>
<summary><strong>❌ Permission denied (EACCES) on global install</strong></summary>

**Problem**: npm permissions not configured properly

**Solutions**:
```bash
# Option 1: Use npx instead (no global install)
npx itch-dl --help

# Option 2: Configure npm prefix
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 3: Use sudo (not recommended)
sudo npm install -g itch-dl
```
</details>

<details>
<summary><strong>❌ "itch-dl: command not found" after install</strong></summary>

**Problem**: Binary not in PATH or installation incomplete

**Solutions**:
```bash
# Check if installed
npm list -g itch-dl

# Check npm global bin directory
npm bin -g

# Add to PATH if needed
echo 'export PATH=$(npm bin -g):$PATH' >> ~/.bashrc
source ~/.bashrc

# Alternative: Use full path
$(npm bin -g)/itch-dl --help
```
</details>

<details>
<summary><strong>❌ Node.js version too old</strong></summary>

**Problem**: itch-dl requires Node.js 18+

**Solutions**:
```bash
# Check current version
node --version

# Update Node.js from https://nodejs.org/
# Or use version manager like nvm:

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install latest Node.js
nvm install node
nvm use node
```
</details>

<details>
<summary><strong>❌ SSL/Certificate errors</strong></summary>

**Problem**: Network or firewall blocking npm/itch.io

**Solutions**:
```bash
# Check connectivity
curl -I https://registry.npmjs.org
curl -I https://itch.io

# Try different npm registry
npm config set registry https://registry.npmjs.org/

# Corporate firewall? Try:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Disable strict SSL (last resort)
npm config set strict-ssl false
```
</details>

### 🔍 Diagnostic Commands

Run these to gather info for bug reports:

```bash
# System information
echo "OS: $(uname -s)"
echo "Node: $(node --version)"
echo "npm: $(npm --version)"

# itch-dl specific
itch-dl --version
npm list -g itch-dl

# Network connectivity
curl -I https://itch.io
curl -I https://api.itch.io
```

---

## 🌍 Platform-Specific Notes

### 🍎 macOS
- Use **Homebrew** for Node.js: `brew install node`
- **Xcode Command Line Tools** may be required
- **Apple Silicon (M1/M2)**: Fully supported

### 🐧 Linux
- **Ubuntu/Debian**: `sudo apt install nodejs npm`
- **CentOS/RHEL**: `sudo yum install nodejs npm`
- **Arch**: `sudo pacman -S nodejs npm`
- **AppImage/Snap**: Also available via npm

### 🪟 Windows
- Download from [nodejs.org](https://nodejs.org/)
- **WSL2**: Recommended for development
- **PowerShell**: Preferred over Command Prompt
- **Chocolatey**: `choco install nodejs`

---

## ⚡ Performance Tips

### 🚀 Optimize for Speed
```bash
# Use npm cache
npm config set cache ~/.npm-cache

# Use faster package manager (optional)
npm install -g pnpm
pnpm add -g itch-dl

# Parallel downloads (default: 1)
itch-dl URL --parallel 3  # Adjust based on your connection
```

### 💾 Storage Considerations
- **Disk space**: Game downloads can be large (GB per game)
- **SSD recommended**: For better I/O performance during extraction
- **Backup location**: Consider external drives for archives

---

## 🎯 Next Steps

✅ **Installation Complete!** Here's what to do next:

1. 🔑 **[Get your API key](API-Keys.md)** - Required for downloads
2. 📖 **[Learn the basics](Usage.md)** - Essential commands and examples
3. ⚙️ **[Configure itch-dl](Configuration.md)** - Optimize for your workflow
4. 🚀 **Start downloading!** - Try a small jam first

### 🎮 Test Your Setup
```bash
# Quick test (requires API key)
itch-dl https://itch.io/jam/mini-jam-150 --urls-only --api-key YOUR_KEY

# If that works, try a real download
itch-dl https://itch.io/jam/mini-jam-150 --api-key YOUR_KEY
```

---

<div align="center">

**🎉 Ready to download!** 

Need help? Check our [Usage Guide](Usage.md) or [report an issue](https://github.com/Wal33D/itch-dl/issues).

</div>