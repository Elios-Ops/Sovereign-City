# FAM Card Viewer - Deployment Guide

This document provides instructions for deploying and configuring the FAM Card Viewer system.

## Deployment Checklist

1. Server Requirements
2. File Deployment
3. Configuration
4. Testing
5. Security Considerations
6. Troubleshooting

## 1. Server Requirements

The FAM Card Viewer is a client-side application that requires:

- A web server capable of serving static files (Apache, Nginx, etc.)
- HTTPS support for Web3 wallet integration
- CORS configuration if connecting to external APIs
- No special server-side processing required

## 2. File Deployment

Deploy all the following files to your web server:

### Core Files
- `index.html` or `enhanced-index.html` (rename to index.html)
- `styles.css`
- `famcard.json`

### JavaScript Modules
- `fam-card-integration.js` - Core functionality
- `nft-slot-system.js` - NFT slot management
- `asset-positioning-system.js` - Asset positioning
- `aspect-ratio-controls.js` - Aspect ratio controls
- `rgb-control-system.js` - RGB color system
- `wallet-integration.js` - Web3 wallet integration
- `voice-interface.js` - Voice interface
- `admin-debug-system.js` - Admin and debug panel
- `notification.js` - Notification system
- `utilities.js` - Utility functions

### Assets
- Create an `assets` directory and add the following:
  - `fam-card.png` - Card texture image
  - Icons for UI elements (optional)
  - Asset images for the asset library

## 3. Configuration

### Update Contract Addresses

In `wallet-integration.js`, update the MUSKRAT_CONTRACT address with the actual contract address:

```javascript
const MUSKRAT_CONTRACT = {
  address: '0x1234567890123456789012345678901234567890', // <-- Replace with actual address
  abi: [
    // ERC-20 standard functions
    {
      "constant": true,
      "inputs": [{"name": "_owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "balance", "type": "uint256"}],
      "type": "function"
    }
  ]
};
```

### Customize Access Codes

In `admin-debug-system.js`, update the access codes if needed:

```javascript
const ACCESS_CODES = {
  admin: ['FAM343', 'admin'],     // <-- Update these codes
  community: ['community']       // <-- Update these codes
};
```

### Add Asset Library

Populate the asset library by updating the placeholder assets in `asset-positioning-system.js`:

```javascript
const placeholderAssets = [
  {
    id: 'asset-1',
    name: 'Holographic Badge',
    imageUrl: 'assets/badge.png',  // <-- Update path to actual asset
    type: 'icon',
    defaultX: 0,
    defaultY: 0,
    defaultScale: 1
  },
  // Add more assets here
];
```

## 4. Testing

After deployment, test the following functionality:

1. **Admin Gate**
   - Test access with admin code
   - Test access with community code
   - Test guest access

2. **Card Functionality**
   - Test card flipping
   - Test aspect ratio controls
   - Test RGB color adjustments
   - Test glow controls

3. **Asset System**
   - Test adding assets to card
   - Test positioning assets
   - Test scaling and rotation
   - Test grid overlay
   - Test saving asset positions

4. **Wallet Integration**
   - Test wallet connection
   - Test NFT ownership detection
   - Test balance display
   - Test network detection

5. **Voice Interface**
   - Test voice recognition
   - Test voice commands
   - Test voice synthesis

6. **NFT Slot System**
   - Test slot interaction
   - Test NFT assignment
   - Test hierarchy display

## 5. Security Considerations

- **Access Control**: The admin gate provides basic access control but is not secure against determined attackers. For sensitive deployments, implement server-side authentication.
- **HTTPS**: Always use HTTPS for production deployments, especially when using Web3 wallet integration.
- **Local Storage**: Data stored in localStorage is accessible to any JavaScript running on the same origin. Avoid storing sensitive information.
- **Contract Interaction**: Verify all contract interactions, especially when transferring assets or tokens.

## 6. Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure MetaMask or another Web3 provider is installed
   - Check if the site is using HTTPS (required for wallet connections)
   - Verify the network is supported in the wallet integration code

2. **Voice Interface Not Working**
   - Verify that the browser supports the Web Speech API
   - Check microphone permissions
   - Test in Chrome, which has the best support for speech recognition

3. **Assets Not Displaying**
   - Check asset file paths
   - Verify asset loading in the browser console
   - Check for CORS issues if assets are loaded from another domain

4. **NFT Slots Not Working**
   - Verify wallet connection
   - Check contract addresses
   - Look for JavaScript errors in the console

### Debug Mode

Access the debug panel by:
1. Logging in with admin access code (default: "FAM343" or "admin")
2. Clicking the "Admin" button in the toolbar

The debug panel provides:
- Real-time state information
- Export/import functionality
- Direct control over card components

## Contact Information

For support or feature requests, contact:
- Email: support@muskrats.io
- Discord: [Muskrats.io Discord Server](https://discord.gg/muskrats)

---

© 2025 Muskrats.io - All rights reserved
