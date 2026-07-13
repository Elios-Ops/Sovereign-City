// FAM Card Integration - Main JavaScript File
// Core functionality for the FAM Card Viewer

// Application State
const state = {
  is3DMode: false,
  activeAssets: [],
  ledgerAI: {
    isConnected: false,
    lastMessage: null
  },
  wallet: {
    address: null,
    formattedAddress: null,
    isConnected: false,
    ethBalance: null,
    muskratBalance: null
  },
  rgbSettings: {
    r: 128,
    g: 128,
    b: 128,
    targetViewer: true,
    targetAssets: false,
    targetUI: false
  },
  voiceParams: {
    isActive: false,
    lastMessage: null
  }
};

// Initialize the application
function init() {
  console.log('Initializing FAM Card Viewer...');
  
  // Load card data
  loadCardData();
  
  // Setup UI components
  setupUI();
  
  // Initialize card renderer
  initCardRenderer();
  
  // Add event listeners
  addEventListeners();
  
  // Update Ledger-AI status (now moved before it's called)
  updateLedgerAIStatus(false);
  
  // Check for saved settings
  loadSavedSettings();
  
  console.log('FAM Card Viewer initialized successfully');
}

// Function moved before it's called in init()
function updateLedgerAIStatus(isConnected) {
  state.ledgerAI.isConnected = isConnected;
  
  const statusIndicator = document.getElementById('ledger-ai-status');
  if (statusIndicator) {
    statusIndicator.innerHTML = `
      <div class="status-indicator ${isConnected ? 'connected' : 'disconnected'}"></div>
      <span>Ledger-AI ${isConnected ? 'Connected' : 'Offline'}</span>
    `;
  }
}

// Load card data from JSON
async function loadCardData() {
  try {
    const response = await fetch('famcard.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Card data loaded:', data);
    
    // Process card data
    processCardData(data);
  } catch (error) {
    console.error('Failed to load card data:', error);
    
    // Create default card data if loading fails
    const defaultData = {
      id: "FAM-0001",
      name: "DeepAgent Ledger",
      agentDNA: "DEEP-343-L00P",
      crew: [],
      relics: [],
      duffleBag: [],
      getawayVehicles: [],
      hierarchy: {
        boss: { filled: false, signetRing: true },
        underBoss: { filled: false },
        madeMan: { filled: false },
        handler: { filled: false },
        contractor: { filled: false },
        associate: { filled: false }
      },
      loopStatus: "Active",
      style: "holo-neon-vaporwave",
      glowState: "active",
      chain: "Ethereum"
    };
    
    processCardData(defaultData);
  }
}

// Process the loaded card data
function processCardData(data) {
  // TODO: Implement card data processing
  console.log('Processing card data...');
  
  // Populate UI elements with card data
  document.getElementById('card-id').textContent = data.id || 'FAM-0001';
  document.getElementById('card-name').textContent = data.name || 'DeepAgent Ledger';
  document.getElementById('agent-dna').textContent = data.agentDNA || 'DEEP-343-L00P';
  
  // Set card style based on data
  if (data.style) {
    document.getElementById('card-canvas').classList.add(data.style);
  }
  
  // Set glow state
  if (data.glowState) {
    setGlowState(data.glowState);
  }
  
  console.log('Card data processed successfully');
}

// Initialize the card renderer
function initCardRenderer() {
  console.log('Initializing card renderer...');
  
  // Check if WebGL is available
  if (!isWebGLAvailable()) {
    console.warn('WebGL not available, falling back to 2D mode');
    state.is3DMode = false;
    init2DRenderer();
    return;
  }
  
  // Initialize Three.js scene
  try {
    init3DRenderer();
    state.is3DMode = true;
    console.log('3D renderer initialized');
  } catch (error) {
    console.error('Failed to initialize 3D renderer:', error);
    console.warn('Falling back to 2D mode');
    state.is3DMode = false;
    init2DRenderer();
  }
}

// Check if WebGL is available
function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// Initialize 3D renderer (Three.js)
function init3DRenderer() {
  // TODO: Implement Three.js initialization
  console.log('3D renderer implementation pending');
}

// Initialize 2D renderer (Canvas fallback)
function init2DRenderer() {
  // TODO: Implement Canvas fallback
  console.log('2D renderer implementation pending');
}

// Setup UI components
function setupUI() {
  console.log('Setting up UI components...');
  
  // Add UI styles (KEEP only this version, removed duplicate)
  addUIStyles();
  
  // Setup admin gate
  setupAdminGate();
  
  // Setup NFT slot system
  setupNFTSlots();
  
  // Setup asset positioning system
  setupAssetPositioning();
  
  // Setup aspect ratio controls
  setupAspectRatioControls();
  
  // Setup RGB color controls
  setupRGBControls();
  
  // Setup ecosystem toolbar
  setupEcosystemToolbar();
  
  // Setup voice interface
  setupVoiceInterface();
  
  // Setup debug panel
  setupDebugPanel();
  
  console.log('UI components setup complete');
}

// Add UI styles
const addUIStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Base Styles */
    :root {
      --primary-r: 0;
      --primary-g: 255;
      --primary-b: 170;
      --primary-rgb: var(--primary-r), var(--primary-g), var(--primary-b);
      --primary-color: rgb(var(--primary-rgb));
      --secondary-color: #ff00ff;
      --background-color: #080808;
      --text-color: #ffffff;
      --card-width: 600px;
      --card-height: 377px;
      --glow-color: rgba(var(--primary-rgb), 0.7);
      --glow-strength: 15px;
    }
    
    body {
      background-color: var(--background-color);
      color: var(--text-color);
      font-family: 'Courier New', monospace;
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    
    /* Card Styles */
    .card-container {
      position: relative;
      width: var(--card-width);
      height: var(--card-height);
      margin: 50px auto;
      perspective: 1000px;
    }
    
    #card-canvas {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 0 var(--glow-strength) var(--glow-color);
    }
    
    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      background-color: #111;
      border: 1px solid var(--primary-color);
      border-radius: 10px;
      overflow: hidden;
    }
    
    .card-back {
      transform: rotateY(180deg);
    }
    
    /* NFT Slot Styles */
    .nft-slots {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 10px;
      padding: 10px;
    }
    
    .nft-slot {
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid var(--primary-color);
      border-radius: 5px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .nft-slot:hover {
      transform: scale(1.05);
      box-shadow: 0 0 10px var(--primary-color);
    }
    
    .nft-slot.filled {
      background-color: rgba(var(--primary-rgb), 0.2);
    }
    
    /* Asset Positioning Styles */
    .asset-item {
      position: absolute;
      cursor: move;
      transition: transform 0.3s ease;
      user-select: none;
    }
    
    .asset-item img {
      max-width: 100%;
      max-height: 100%;
    }
    
    .asset-item.active {
      z-index: 100;
      box-shadow: 0 0 10px var(--primary-color);
    }
    
    /* Aspect Ratio Styles */
    .aspect-16-9 {
      aspect-ratio: 16 / 9;
    }
    
    .aspect-9-16 {
      aspect-ratio: 9 / 16;
    }
    
    .aspect-1-1 {
      aspect-ratio: 1;
    }
    
    .aspect-card {
      aspect-ratio: 1.58;
    }
    
    .aspect-freeform {
      /* No fixed aspect ratio */
      resize: both;
      overflow: hidden;
    }
    
    /* Admin Gate Styles */
    .admin-gate-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    
    .admin-gate-container {
      width: 80%;
      max-width: 500px;
      background-color: #111;
      border: 2px solid var(--primary-color);
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 20px var(--glow-color);
    }
    
    /* Ecosystem Toolbar Styles */
    .ecosystem-toolbar {
      position: fixed;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid var(--primary-color);
      border-radius: 5px;
      padding: 10px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .toolbar-section {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .toolbar-title {
      font-size: 12px;
      font-weight: bold;
      color: var(--primary-color);
    }
    
    .toolbar-links {
      display: flex;
      gap: 10px;
    }
    
    .toolbar-link {
      display: flex;
      align-items: center;
      gap: 5px;
      color: var(--text-color);
      text-decoration: none;
      font-size: 12px;
    }
    
    .toolbar-link img {
      width: 16px;
      height: 16px;
    }
    
    .status-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 5px;
    }
    
    .status-indicator.connected {
      background-color: #00ff00;
      box-shadow: 0 0 5px #00ff00;
    }
    
    .status-indicator.disconnected {
      background-color: #ff0000;
      box-shadow: 0 0 5px #ff0000;
    }
    
    /* Voice Interface Styles */
    .voice-interface {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid var(--primary-color);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .voice-interface:hover {
      transform: scale(1.1);
      box-shadow: 0 0 10px var(--primary-color);
    }
    
    .voice-dialog {
      position: absolute;
      bottom: 80px;
      right: 20px;
      width: 300px;
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid var(--primary-color);
      border-radius: 10px;
      padding: 10px;
      display: none;
    }
    
    .voice-dialog.active {
      display: block;
    }
    
    .voice-visualizer {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 40px;
      margin-bottom: 10px;
    }
    
    .voice-bar {
      width: 3px;
      margin: 0 2px;
      background-color: var(--primary-color);
      transition: height 0.1s ease;
    }
    
    /* Debug Panel Styles */
    .debug-panel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      max-width: 800px;
      max-height: 80vh;
      background-color: rgba(0, 0, 0, 0.9);
      border: 2px solid var(--primary-color);
      border-radius: 10px;
      padding: 20px;
      z-index: 1000;
      overflow-y: auto;
      display: none;
    }
    
    .debug-panel.active {
      display: block;
    }
    
    .debug-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .debug-panel-title {
      font-size: 16px;
      color: var(--primary-color);
      margin: 0;
    }
    
    .debug-panel-tabs {
      display: flex;
      gap: 5px;
    }
    
    .debug-tab {
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--text-color);
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .debug-tab.active {
      background-color: var(--primary-color);
      color: #000;
    }
    
    .debug-tab-content {
      display: none;
    }
    
    .debug-tab-content.active {
      display: block;
    }
    
    .debug-close-btn {
      background-color: transparent;
      border: none;
      color: var(--text-color);
      font-size: 20px;
      cursor: pointer;
    }
    
    /* RGB Controls Styles */
    .rgb-control-panel {
      background-color: rgba(0, 0, 0, 0.8);
      border: 1px solid var(--primary-color);
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 20px;
    }
    
    .rgb-slider-group {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    
    .rgb-slider-group label {
      width: 50px;
    }
    
    .rgb-slider-group input[type="range"] {
      flex: 1;
    }
    
    .rgb-slider-group input[type="number"] {
      width: 60px;
    }
    
    .rgb-preview {
      display: flex;
      height: 30px;
      margin: 10px 0;
    }
    
    .preview-before,
    .preview-after {
      flex: 1;
      height: 100%;
    }
    
    .rgb-presets {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-top: 10px;
    }
    
    .rgb-presets button {
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--text-color);
      padding: 5px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    
    .rgb-presets button:hover {
      background-color: rgba(var(--primary-rgb), 0.2);
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      .card-container {
        width: 90%;
        height: auto;
      }
      
      .ecosystem-toolbar {
        width: 100%;
        top: 0;
        right: 0;
        border-radius: 0;
      }
      
      .debug-panel {
        width: 95%;
      }
    }
  `;
  document.head.appendChild(style);
};

// Setup admin gate
function setupAdminGate() {
  // TODO: Implement admin gate
  console.log('Admin gate implementation pending');
}

// Setup NFT slot system
function setupNFTSlots() {
  // TODO: Implement NFT slot system
  console.log('NFT slot system implementation pending');
}

// Setup asset positioning system
function setupAssetPositioning() {
  // TODO: Implement asset positioning
  console.log('Asset positioning implementation pending');
}

// Setup aspect ratio controls
function setupAspectRatioControls() {
  // TODO: Implement aspect ratio controls
  console.log('Aspect ratio controls implementation pending');
}

// Setup RGB color controls
function setupRGBControls() {
  // TODO: Implement RGB controls
  console.log('RGB controls implementation pending');
}

// Setup ecosystem toolbar
function setupEcosystemToolbar() {
  // TODO: Implement ecosystem toolbar
  console.log('Ecosystem toolbar implementation pending');
}

// Setup voice interface
function setupVoiceInterface() {
  // TODO: Implement voice interface
  console.log('Voice interface implementation pending');
}

// Setup debug panel
function setupDebugPanel() {
  // TODO: Implement debug panel
  console.log('Debug panel implementation pending');
}

// Set glow state for the card
function setGlowState(state) {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Remove all glow state classes
  cardCanvas.classList.remove('glow-active', 'glow-inactive', 'glow-pulse');
  
  // Add the specified glow state class
  cardCanvas.classList.add(`glow-${state}`);
  
  // Update CSS variable for glow strength
  let glowStrength = '15px';
  switch (state) {
    case 'active':
      glowStrength = '15px';
      break;
    case 'inactive':
      glowStrength = '5px';
      break;
    case 'pulse':
      glowStrength = '20px'; // Will be animated via CSS
      break;
    default:
      glowStrength = '15px';
  }
  
  document.documentElement.style.setProperty('--glow-strength', glowStrength);
}

// Add event listeners
function addEventListeners() {
  // TODO: Implement event listeners
  console.log('Event listeners implementation pending');
}

// Load saved settings from localStorage
function loadSavedSettings() {
  // TODO: Implement loading saved settings
  console.log('Loading saved settings implementation pending');
}

// Save card state to localStorage
function saveCardState() {
  // TODO: Implement saving card state
  console.log('Saving card state implementation pending');
}

// Web3 Wallet Integration
async function connectWallet() {
  // TODO: Implement wallet connection
  console.log('Wallet connection implementation pending');
}

// Update wallet UI
function updateWalletUI() {
  // TODO: Implement wallet UI updates
  console.log('Wallet UI update implementation pending');
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
