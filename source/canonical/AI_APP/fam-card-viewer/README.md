# FAM Card Viewer

An interactive NFT card system for the Muskrats.io ecosystem.

## Overview

The FAM Card Viewer is a sophisticated interactive NFT card system designed to serve as a backdoor to the Muskrats.io ecosystem. This project combines Three.js rendering, asset positioning, wallet integration, and voice interfaces to create a tech-punk aesthetic experience that aligns with the broader Muskrats brand.

## Features

- **Admin Gate**: Password-protected access levels for different user permissions
- **NFT Slot System**: Hierarchical categories for NFT placement (Boss, Under Boss, Made Man, etc.)
- **Asset Positioning**: Draggable asset placement with grid overlay and position indicators
- **Aspect Ratio Controls**: Adjustable card dimensions (16:9, 9:16, 1:1, and custom)
- **RGB Color Control**: Customizable color schemes with targets for different components
- **Web3 Wallet Integration**: MetaMask/Web3 connection for NFT management
- **Voice Interface**: Microphone interaction with Ledger-AI assistant
- **Debug Panel**: Advanced controls for developers and administrators

## Getting Started

1. Clone the repository
2. Open the `index.html` file in a modern web browser
3. Enter the access code (`FAM343` for admin, `community` for limited access, or press ESC for guest access)

## Access Levels

- **Admin**: Full access to all features and debug panel
- **Community**: Standard user functionality without advanced debugging
- **Guest**: View-only mode with limited interaction

## NFT Categories

The FAM Card has specific NFT categories and slot counts:

- **Boss**: 1 slot (with special signet ring)
- **Under Boss**: 2 slots
- **Made Man**: 2 slots
- **Handler**: 4 slots
- **Contractor**: 8 slots
- **Associate**: 16 slots
- **Relics**: 4 slots
- **Duffle Bag**: 6 slots
- **Getaway Vehicles**: 6 slots

## Voice Commands

The FAM Card responds to various voice commands, including:

- "Flip card" - Turns the card over
- "Reset positions" - Returns assets to default positions
- "Save card" - Saves the current configuration
- "Color preset cyberpunk" - Applies a color scheme
- "Red 255" - Sets the red channel to a specific value

## Files Structure

- `index.html` - Main HTML file
- `fam-card-integration.js` - Core functionality
- `nft-slot-system.js` - NFT category implementation
- `asset-positioning-system.js` - Asset positioning functionality
- `aspect-ratio-controls.js` - Aspect ratio management
- `rgb-control-system.js` - RGB color adjustments
- `web3-wallet-integration.js` - Web3 wallet connection
- `voice-interface.js` - Voice recognition and synthesis
- `admin-debug-system.js` - Admin access and debugging tools
- `famcard.json` - Card configuration data

## Browser Compatibility

The FAM Card Viewer works best with modern browsers that support WebGL and Web Speech API:

- Chrome (recommended)
- Firefox
- Edge
- Safari (limited voice functionality)

## Development

The project includes a comprehensive debug panel accessible to admin users by clicking the "Admin" button in the toolbar. This panel provides tools for:

- Texture and glow controls
- Asset library management
- Voice settings adjustment
- NFT management
- State examination and manipulation
- Configuration export/import

## License

© 2025 Muskrats.io - All rights reserved
