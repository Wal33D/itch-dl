# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported |
| ------- | --------- |
| 0.6.x   | ✅ Yes    |
| 0.5.x   | ❌ No     |
| < 0.5   | ❌ No     |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please
report it responsibly:

### How to Report

1. **DO NOT** open a public issue for security vulnerabilities
2. Send an email to the repository owner with details
3. Include steps to reproduce the vulnerability
4. Provide as much information as possible

### What to Include

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if you have one)
- Your contact information

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 1 week
- **Fix Timeline**: Varies based on severity

### Security Best Practices

When using itch-dl:

1. **Protect Your API Key**:
   - Never commit API keys to version control
   - Use environment variables or config files with proper permissions
   - Rotate keys periodically

2. **Safe Downloads**:
   - Only download content you have legitimate access to
   - Be cautious with external download URLs
   - Verify file integrity when possible

3. **System Security**:
   - Keep Node.js and dependencies updated
   - Use the latest version of itch-dl
   - Run security audits: `npm audit`

### Security Features

- **Rate limiting**: Built-in protections against API abuse
- **Input validation**: Sanitization of user inputs
- **Secure defaults**: Conservative configuration options
- **Dependency scanning**: Regular security audits of dependencies

### Disclosure Policy

- Security vulnerabilities will be disclosed after a fix is available
- We will credit security researchers (unless they prefer anonymity)
- Public disclosure timeline depends on severity and fix complexity

## Security Auditing

This project uses automated security scanning:

- **npm audit**: Dependency vulnerability scanning
- **audit-ci**: CI/CD security checks
- **GitHub Security Advisories**: Automated vulnerability alerts

Run a security audit locally:

```bash
npm audit
npx audit-ci --moderate
```

Thank you for helping keep itch-dl secure!
