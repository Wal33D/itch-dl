<div align="center">

# 🎮 itch-dl Wiki

**Complete documentation for the TypeScript itch.io bulk downloader**

*Everything you need to master itch-dl and download games efficiently*

---

</div>

## 🚀 Quick Navigation

<table>
<tr>
<td width="50%">

### 🏁 Getting Started
- 🚀 **[Installation](Installation.md)** - Setup and prerequisites
- 🔑 **[API Keys](API-Keys.md)** - Authentication setup
- 📖 **[Usage Guide](Usage.md)** - Command-line examples
- ⚙️ **[Configuration](Configuration.md)** - Config files and profiles

</td>
<td width="50%">

### 🎯 Quick Actions
- [📦 Install now](Installation.md#install-from-npm-recommended)
- [🔑 Get API key](https://itch.io/user/settings/api-keys)
- [📋 See examples](Usage.md#basic-examples)
- [⚡ Quick start](#-30-second-setup)

</td>
</tr>
</table>

---

## ⚡ 30-Second Setup

```bash
# 1. Install globally
npm install -g itch-dl

# 2. Get your API key from: https://itch.io/user/settings/api-keys

# 3. Start downloading!
itch-dl https://itch.io/jam/gmtk-2023 --api-key YOUR_API_KEY
```

> 💡 **Pro tip**: Save your API key in a [config file](Configuration.md) to avoid typing it every time!

---

## ✨ What itch-dl Can Do

### 🎯 Download Sources

| Type | Example | Description |
|------|---------|-------------|
| 🏆 **Game Jams** | `https://itch.io/jam/gmtk-2023` | All submissions from any jam |
| 🔥 **Browse Pages** | `https://itch.io/games/popular` | Popular, newest, or tagged games |
| 📂 **Collections** | `https://itch.io/c/123456/cool-games` | Your collections or public ones |
| 📚 **Your Library** | `https://itch.io/my-purchases` | Everything you own |
| 👨‍💻 **Creator Pages** | `https://dani-games.itch.io/` | Complete developer catalogues |
| 🎮 **Individual Games** | `https://maddy.itch.io/celeste` | Single games or titles |

### 🛠️ Powerful Features

- ⚡ **Parallel Downloads** - Speed up with concurrent processing
- 🎯 **Smart Filtering** - Platform, file type, or pattern filtering
- 📋 **Multiple Inputs** - URLs, JSON files, or text lists
- 🔄 **Resume Support** - Skip already downloaded content
- 🌐 **Web Mirroring** - Download game page assets
- ⚙️ **Configuration Profiles** - Save settings for different scenarios

---

## 🚧 Current Limitations

### ❌ Not Supported
- **Access-restricted games** - Games with download restrictions
- **Bundles** - Direct bundle downloads (workaround available)
- **DRM-protected content** - Respects all copy protection

### 💡 Workarounds Available
- **Bundles**: Use [userscripts](https://gist.github.com/lats/c920866caf9c0cb04e82abba411e1bb9) to add bundle games to your library first
- **Large downloads**: Use `--parallel` for faster downloads
- **Filtering**: Use glob/regex patterns for precise file selection

---

## 📚 Documentation Structure

### 📖 Core Guides
- **[Installation](Installation.md)** - System requirements, npm setup, troubleshooting
- **[API Keys](API-Keys.md)** - Getting, securing, and using your itch.io API key
- **[Usage](Usage.md)** - Complete command reference with real examples
- **[Configuration](Configuration.md)** - Config files, profiles, environment variables

### 🎯 Quick References
- [Command examples](Usage.md#basic-examples)
- [Filter options](Usage.md#file-filtering)
- [Configuration examples](Configuration.md#example-configurations)
- [Troubleshooting](Installation.md#troubleshooting)

---

## ⚠️ Important Notes

### ✅ What This Tool Does
- Downloads games you **legitimately own** or have access to
- Respects itch.io's **terms of service** and rate limits
- Provides the **same access** as the official itch.io app
- Supports all **standard itch.io download types**

### 🔒 Security & Ethics
- **No piracy**: Only downloads content you have legitimate access to
- **API key safety**: Your credentials stay on your machine
- **Rate limiting**: Built-in protections to avoid overloading itch.io
- **Open source**: Full transparency in how downloads work

---

## 🆚 TypeScript vs Python Implementation

This TypeScript version offers several advantages:

| Feature | TypeScript (this) | Python Original |
|---------|-------------------|-----------------|
| **Performance** | ⚡ Faster startup, native async | 🐌 Slower startup |
| **Dependencies** | 📦 npm ecosystem | 🐍 pip ecosystem |
| **Installation** | `npm install -g` | Multiple steps |
| **Configuration** | JSON files | Multiple formats |
| **Maintenance** | 🔄 Active development | 📚 Reference implementation |

---

## 🤝 Getting Help

### 💬 Community Support
- 🐛 **[Report Issues](https://github.com/Wal33D/itch-dl/issues)** - Bug reports and feature requests
- 💭 **[Discussions](https://github.com/Wal33D/itch-dl/discussions)** - Questions and community help
- 📖 **[Wiki](https://github.com/Wal33D/itch-dl/wiki)** - Complete documentation

### 🔧 Self-Help Resources
- `itch-dl --help` - Built-in command help
- [Troubleshooting guide](Installation.md#troubleshooting)
- [Common issues](Usage.md#troubleshooting)
- [Configuration examples](Configuration.md#example-configurations)

---

## 🎯 Next Steps

Ready to get started? Follow this path:

1. 📦 **[Install itch-dl](Installation.md)** - Get the tool set up
2. 🔑 **[Get your API key](API-Keys.md)** - Authentication setup  
3. 📖 **[Learn the basics](Usage.md)** - Essential commands
4. ⚙️ **[Configure for your needs](Configuration.md)** - Optimize your setup
5. 🚀 **Start downloading!** - Begin your itch.io archiving

---

<div align="center">

**💡 Remember**: This tool helps you organize and backup games you already own. It's designed to complement, not replace, the official itch.io experience.

*Happy downloading! 🎮*

</div>