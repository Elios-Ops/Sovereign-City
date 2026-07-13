// Admin Gate and Debug Panel for FAM Card Viewer
// This file implements the admin access control and debug functionality

// Admin state
const adminState = {
  isAdmin: false,
  accessLevel: 'guest', // guest, community, admin
  debugPanelActive: false,
  activeDebugTab: 'card',
  sessionTimestamp: Date.now()
};

// Access codes
const ACCESS_CODES = {
  admin: ['FAM343', 'admin'],
  community: ['community']
};

// Initialize admin gate and debug panel
function initAdminSystem() {
  console.log('Initializing admin system...');
  
  // Setup admin gate
  setupAdminGate();
  
  // Setup debug panel
  setupDebugPanel();
  
  // Check for saved session
  checkSavedSession();
  
  console.log('Admin system initialized');
}

// Setup admin gate
function setupAdminGate() {
  const adminGate = document.getElementById('admin-gate');
  if (!adminGate) return;
  
  // Access submit button
  const accessSubmit = document.getElementById('access-submit');
  if (accessSubmit) {
    accessSubmit.addEventListener('click', verifyAccessCode);
  }
  
  // Access code input enter key
  const accessCode = document.getElementById('access-code');
  if (accessCode) {
    accessCode.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        verifyAccessCode();
      }
    });
  }
  
  // Quick access buttons
  const adminAccessBtn = document.getElementById('admin-access');
  if (adminAccessBtn) {
    adminAccessBtn.addEventListener('click', () => {
      const code = adminAccessBtn.getAttribute('data-code');
      if (code) {
        const accessCode = document.getElementById('access-code');
        if (accessCode) accessCode.value = code;
        verifyAccessCode();
      }
    });
  }
  
  const communityAccessBtn = document.getElementById('community-access');
  if (communityAccessBtn) {
    communityAccessBtn.addEventListener('click', () => {
      const code = communityAccessBtn.getAttribute('data-code');
      if (code) {
        const accessCode = document.getElementById('access-code');
        if (accessCode) accessCode.value = code;
        verifyAccessCode();
      }
    });
  }
  
  const guestAccessBtn = document.getElementById('guest-access');
  if (guestAccessBtn) {
    guestAccessBtn.addEventListener('click', () => {
      grantAccess('guest');
    });
  }
  
  // ESC key to grant community access
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adminGate.style.display !== 'none') {
      grantAccess('community');
    }
  });
}

// Setup debug panel
function setupDebugPanel() {
  // Debug panel tabs
  const debugTabs = document.querySelectorAll('.debug-tab');
  debugTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      if (tabName) {
        switchDebugTab(tabName);
      }
    });
  });
  
  // Debug panel close button
  const debugCloseBtn = document.getElementById('debug-close-btn');
  if (debugCloseBtn) {
    debugCloseBtn.addEventListener('click', closeDebugPanel);
  }
  
  // Debug open button in toolbar
  const toolbarAdminBtn = document.getElementById('toolbar-admin-btn');
  if (toolbarAdminBtn) {
    toolbarAdminBtn.addEventListener('click', toggleDebugPanel);
  }
  
  // Card state export/import
  setupExportImport();
}

// Setup export/import functionality
function setupExportImport() {
  // Export buttons
  const exportAllBtn = document.getElementById('export-all-btn');
  if (exportAllBtn) {
    exportAllBtn.addEventListener('click', () => exportCardData('all'));
  }
  
  const exportAssetsBtn = document.getElementById('export-assets-btn');
  if (exportAssetsBtn) {
    exportAssetsBtn.addEventListener('click', () => exportCardData('assets'));
  }
  
  const exportSettingsBtn = document.getElementById('export-settings-btn');
  if (exportSettingsBtn) {
    exportSettingsBtn.addEventListener('click', () => exportCardData('settings'));
  }
  
  const exportNftBtn = document.getElementById('export-nft-btn');
  if (exportNftBtn) {
    exportNftBtn.addEventListener('click', () => exportCardData('nft'));
  }
  
  // Import button
  const importConfigBtn = document.getElementById('import-config-btn');
  if (importConfigBtn) {
    importConfigBtn.addEventListener('click', importCardData);
  }
}

// Verify access code
function verifyAccessCode() {
  const accessCode = document.getElementById('access-code');
  if (!accessCode) return;
  
  const code = accessCode.value.trim();
  
  // Check admin codes
  if (ACCESS_CODES.admin.includes(code)) {
    grantAccess('admin');
    return;
  }
  
  // Check community codes
  if (ACCESS_CODES.community.includes(code)) {
    grantAccess('community');
    return;
  }
  
  // Invalid code
  showAccessDenied();
}

// Grant access
function grantAccess(level) {
  console.log(`Granting ${level} access`);
  
  // Update state
  adminState.accessLevel = level;
  adminState.isAdmin = (level === 'admin');
  
  // Show appropriate UI
  const adminGate = document.getElementById('admin-gate');
  if (adminGate) {
    adminGate.style.display = 'none';
  }
  
  // Apply access level specific settings
  applyAccessLevelSettings(level);
  
  // Save session
  saveSession();
  
  // Show welcome notification
  showNotification(`Access granted: ${level.toUpperCase()} level`, 'success');
  
  // Enable admin button in toolbar if admin
  const toolbarAdminBtn = document.getElementById('toolbar-admin-btn');
  if (toolbarAdminBtn) {
    toolbarAdminBtn.style.display = (level === 'admin') ? 'block' : 'none';
  }
}

// Show access denied
function showAccessDenied() {
  const accessCode = document.getElementById('access-code');
  if (accessCode) {
    accessCode.classList.add('error');
    setTimeout(() => {
      accessCode.classList.remove('error');
    }, 1000);
  }
  
  // Shake the admin gate
  const adminGate = document.querySelector('.admin-gate-container');
  if (adminGate) {
    adminGate.classList.add('shake');
    setTimeout(() => {
      adminGate.classList.remove('shake');
    }, 500);
  }
  
  // Show notification
  showNotification('Access denied: Invalid code', 'error');
}

// Apply access level specific settings
function applyAccessLevelSettings(level) {
  switch (level) {
    case 'admin':
      // Show all admin controls
      document.body.classList.add('admin-access');
      document.body.classList.remove('community-access', 'guest-access');
      break;
    case 'community':
      // Show limited controls
      document.body.classList.add('community-access');
      document.body.classList.remove('admin-access', 'guest-access');
      break;
    case 'guest':
      // Show minimal controls
      document.body.classList.add('guest-access');
      document.body.classList.remove('admin-access', 'community-access');
      break;
  }
}

// Toggle debug panel
function toggleDebugPanel() {
  if (adminState.debugPanelActive) {
    closeDebugPanel();
  } else {
    openDebugPanel();
  }
}

// Open debug panel
function openDebugPanel() {
  // Check if admin
  if (!adminState.isAdmin) {
    showNotification('Admin access required to open debug panel', 'error');
    return;
  }
  
  const debugPanel = document.getElementById('debug-panel');
  if (!debugPanel) return;
  
  // Show panel
  debugPanel.classList.add('active');
  
  // Update state
  adminState.debugPanelActive = true;
  
  // Update debug information
  updateDebugInformation();
}

// Close debug panel
function closeDebugPanel() {
  const debugPanel = document.getElementById('debug-panel');
  if (!debugPanel) return;
  
  // Hide panel
  debugPanel.classList.remove('active');
  
  // Update state
  adminState.debugPanelActive = false;
}

// Switch debug tab
function switchDebugTab(tabName) {
  // Update active tab state
  adminState.activeDebugTab = tabName;
  
  // Update tab buttons
  const tabButtons = document.querySelectorAll('.debug-tab');
  tabButtons.forEach(button => {
    button.classList.toggle('active', button.getAttribute('data-tab') === tabName);
  });
  
  // Update tab content
  const tabContents = document.querySelectorAll('.debug-tab-content');
  tabContents.forEach(content => {
    content.classList.toggle('active', content.getAttribute('data-tab') === tabName);
  });
  
  // Update tab-specific information
  updateTabInformation(tabName);
}

// Update tab-specific information
function updateTabInformation(tabName) {
  switch (tabName) {
    case 'card':
      // Update card information
      break;
    case 'assets':
      // Update assets information
      break;
    case 'voice':
      // Update voice information
      break;
    case 'nft':
      // Update NFT information
      break;
    case 'state':
      // Update state information
      updateStateInformation();
      break;
    case 'export':
      // Update export information
      break;
  }
}

// Update debug information
function updateDebugInformation() {
  // Update all tabs
  updateTabInformation(adminState.activeDebugTab);
}

// Update state information
function updateStateInformation() {
  const cardStateDebug = document.getElementById('card-state-debug');
  if (!cardStateDebug) return;
  
  // Create complete state object
  const completeState = {
    card: window.state || {},
    wallet: window.walletIntegration?.walletState || {},
    assets: window.assetPositioningSystem?.assetSystemState || {},
    rgb: window.rgbControls?.rgbState || {},
    voice: window.voiceInterface?.voiceState || {},
    admin: adminState
  };
  
  // Format and display state
  cardStateDebug.textContent = JSON.stringify(completeState, null, 2);
}

// Export card data
function exportCardData(type) {
  console.log(`Exporting card data: ${type}`);
  
  // Get data based on type
  let data;
  
  switch (type) {
    case 'all':
      data = {
        card: window.state || {},
        assets: window.assetPositioningSystem?.assetSystemState.activeAssets || [],
        rgb: window.rgbControls?.rgbState || {},
        nft: window.state?.nftSlots || {},
        settings: {
          aspectRatio: localStorage.getItem('famCardAspectRatio'),
          customWidth: localStorage.getItem('famCardCustomWidth'),
          customHeight: localStorage.getItem('famCardCustomHeight')
        },
        exportTime: new Date().toISOString()
      };
      break;
    case 'assets':
      data = {
        assets: window.assetPositioningSystem?.assetSystemState.activeAssets || [],
        exportTime: new Date().toISOString()
      };
      break;
    case 'settings':
      data = {
        rgb: window.rgbControls?.rgbState || {},
        aspectRatio: localStorage.getItem('famCardAspectRatio'),
        customWidth: localStorage.getItem('famCardCustomWidth'),
        customHeight: localStorage.getItem('famCardCustomHeight'),
        voice: window.voiceInterface?.voiceState.settings || {},
        exportTime: new Date().toISOString()
      };
      break;
    case 'nft':
      data = {
        nft: window.state?.nftSlots || {},
        exportTime: new Date().toISOString()
      };
      break;
  }
  
  // Format data as JSON
  const jsonData = JSON.stringify(data, null, 2);
  
  // Display in output area
  const exportOutput = document.getElementById('export-output');
  if (exportOutput) {
    exportOutput.value = jsonData;
  }
  
  // Create downloadable file
  const filename = `famcard-${type}-export-${new Date().toISOString().slice(0, 10)}.json`;
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  
  // Cleanup
  URL.revokeObjectURL(url);
  
  // Show notification
  showNotification(`Exported ${type} data to ${filename}`, 'success');
}

// Import card data
function importCardData() {
  const importFile = document.getElementById('import-config-file');
  if (!importFile || !importFile.files || !importFile.files[0]) {
    showNotification('Please select a file to import', 'error');
    return;
  }
  
  const file = importFile.files[0];
  
  // Read file
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      // Process imported data
      processImportedData(data);
      
      // Show notification
      showNotification('Configuration imported successfully', 'success');
    } catch (error) {
      console.error('Failed to parse import file:', error);
      showNotification('Invalid import file format', 'error');
    }
  };
  
  reader.onerror = () => {
    showNotification('Failed to read import file', 'error');
  };
  
  reader.readAsText(file);
}

// Process imported data
function processImportedData(data) {
  console.log('Processing imported data:', data);
  
  // Import card settings
  if (data.settings) {
    if (data.settings.aspectRatio) {
      localStorage.setItem('famCardAspectRatio', data.settings.aspectRatio);
    }
    
    if (data.settings.customWidth) {
      localStorage.setItem('famCardCustomWidth', data.settings.customWidth);
    }
    
    if (data.settings.customHeight) {
      localStorage.setItem('famCardCustomHeight', data.settings.customHeight);
    }
    
    // Apply aspect ratio if available
    if (window.aspectRatioControls && data.settings.aspectRatio) {
      window.aspectRatioControls.setAspectRatio(data.settings.aspectRatio);
    }
  }
  
  // Import RGB settings
  if (data.rgb && window.rgbControls) {
    Object.assign(window.rgbControls.rgbState, data.rgb);
    window.rgbControls.updateRGBDisplay();
  }
  
  // Import assets
  if (data.assets && window.assetPositioningSystem) {
    // Clear existing assets
    const assetContainer = document.querySelector('.asset-container');
    if (assetContainer) {
      assetContainer.innerHTML = '';
    }
    
    // Set active assets
    window.assetPositioningSystem.assetSystemState.activeAssets = data.assets;
    
    // Create elements for each asset
    data.assets.forEach(asset => {
      if (window.assetPositioningSystem.createAssetElement) {
        window.assetPositioningSystem.createAssetElement(asset);
      }
    });
    
    // Update asset list in UI
    if (window.assetPositioningSystem.updateActiveAssetsList) {
      window.assetPositioningSystem.updateActiveAssetsList();
    }
    
    // Save active assets
    if (window.assetPositioningSystem.saveActiveAssets) {
      window.assetPositioningSystem.saveActiveAssets();
    }
  }
  
  // Import NFT data
  if (data.nft && window.state) {
    window.state.nftSlots = data.nft;
    
    // Update card display
    if (window.nftSlotSystem && window.nftSlotSystem.updateCardDisplay) {
      window.nftSlotSystem.updateCardDisplay();
    }
  }
  
  // Update debug information
  updateDebugInformation();
}

// Check for saved session
function checkSavedSession() {
  try {
    const savedSession = localStorage.getItem('famCardAdminSession');
    
    if (savedSession) {
      const session = JSON.parse(savedSession);
      
      // Check if session is still valid (24 hours)
      const now = Date.now();
      const sessionTime = session.timestamp || 0;
      const sessionAge = now - sessionTime;
      
      if (sessionAge < 24 * 60 * 60 * 1000) {
        // Session is still valid
        adminState.accessLevel = session.accessLevel || 'guest';
        adminState.isAdmin = (adminState.accessLevel === 'admin');
        
        // Apply access level settings
        applyAccessLevelSettings(adminState.accessLevel);
        
        // Hide admin gate
        const adminGate = document.getElementById('admin-gate');
        if (adminGate) {
          adminGate.style.display = 'none';
        }
        
        // Enable admin button in toolbar if admin
        const toolbarAdminBtn = document.getElementById('toolbar-admin-btn');
        if (toolbarAdminBtn) {
          toolbarAdminBtn.style.display = (adminState.accessLevel === 'admin') ? 'block' : 'none';
        }
        
        console.log(`Restored session: ${adminState.accessLevel}`);
      } else {
        // Session expired
        console.log('Session expired');
        
        // Reset session
        localStorage.removeItem('famCardAdminSession');
      }
    }
  } catch (error) {
    console.error('Failed to check saved session:', error);
  }
}

// Save session
function saveSession() {
  try {
    localStorage.setItem('famCardAdminSession', JSON.stringify({
      accessLevel: adminState.accessLevel,
      timestamp: Date.now()
    }));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
}

// Export functions
window.adminSystem = {
  initAdminSystem,
  toggleDebugPanel,
  updateDebugInformation,
  exportCardData,
  importCardData,
  adminState
};
