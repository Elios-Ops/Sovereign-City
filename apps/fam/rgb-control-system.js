// RGB Color Control System for FAM Card Viewer
// This file implements the RGB color adjustment functionality

// RGB state
const rgbState = {
  r: 128,
  g: 128,
  b: 128,
  targetViewer: true,
  targetAssets: false,
  targetUI: false,
  presets: {
    original: { r: 0, g: 255, b: 170 },
    cyberpunk: { r: 0, g: 255, b: 255 },
    neon: { r: 255, g: 0, b: 255 },
    vaporwave: { r: 255, g: 150, b: 255 },
    noir: { r: 50, g: 50, b: 50 }
  }
};

// Initialize RGB controls
function initRGBControls() {
  console.log('Initializing RGB color controls...');
  
  // Setup RGB sliders
  setupRGBSliders();
  
  // Setup RGB targets
  setupRGBTargets();
  
  // Setup RGB presets
  setupRGBPresets();
  
  // Load saved RGB settings
  loadSavedRGBSettings();
  
  console.log('RGB color controls initialized');
}

// Setup RGB sliders
function setupRGBSliders() {
  // RGB sliders
  const rSlider = document.getElementById('r-slider');
  const gSlider = document.getElementById('g-slider');
  const bSlider = document.getElementById('b-slider');
  
  // RGB number inputs
  const rInput = document.getElementById('r-input');
  const gInput = document.getElementById('g-input');
  const bInput = document.getElementById('b-input');
  
  // Add event listeners to sliders
  if (rSlider) {
    rSlider.addEventListener('input', () => {
      rgbState.r = parseInt(rSlider.value);
      if (rInput) rInput.value = rgbState.r;
      updateRGBDisplay();
    });
  }
  
  if (gSlider) {
    gSlider.addEventListener('input', () => {
      rgbState.g = parseInt(gSlider.value);
      if (gInput) gInput.value = rgbState.g;
      updateRGBDisplay();
    });
  }
  
  if (bSlider) {
    bSlider.addEventListener('input', () => {
      rgbState.b = parseInt(bSlider.value);
      if (bInput) bInput.value = rgbState.b;
      updateRGBDisplay();
    });
  }
  
  // Add event listeners to number inputs
  if (rInput) {
    rInput.addEventListener('input', () => {
      let value = parseInt(rInput.value);
      value = isNaN(value) ? 0 : Math.max(0, Math.min(255, value));
      rgbState.r = value;
      if (rSlider) rSlider.value = value;
      updateRGBDisplay();
    });
  }
  
  if (gInput) {
    gInput.addEventListener('input', () => {
      let value = parseInt(gInput.value);
      value = isNaN(value) ? 0 : Math.max(0, Math.min(255, value));
      rgbState.g = value;
      if (gSlider) gSlider.value = value;
      updateRGBDisplay();
    });
  }
  
  if (bInput) {
    bInput.addEventListener('input', () => {
      let value = parseInt(bInput.value);
      value = isNaN(value) ? 0 : Math.max(0, Math.min(255, value));
      rgbState.b = value;
      if (bSlider) bSlider.value = value;
      updateRGBDisplay();
    });
  }
}

// Setup RGB targets
function setupRGBTargets() {
  const targetViewer = document.getElementById('target-viewer');
  const targetAssets = document.getElementById('target-assets');
  const targetUI = document.getElementById('target-ui');
  
  if (targetViewer) {
    targetViewer.checked = rgbState.targetViewer;
    targetViewer.addEventListener('change', () => {
      rgbState.targetViewer = targetViewer.checked;
      updateRGBDisplay();
    });
  }
  
  if (targetAssets) {
    targetAssets.checked = rgbState.targetAssets;
    targetAssets.addEventListener('change', () => {
      rgbState.targetAssets = targetAssets.checked;
      updateRGBDisplay();
    });
  }
  
  if (targetUI) {
    targetUI.checked = rgbState.targetUI;
    targetUI.addEventListener('change', () => {
      rgbState.targetUI = targetUI.checked;
      updateRGBDisplay();
    });
  }
}

// Setup RGB presets
function setupRGBPresets() {
  const presetButtons = document.querySelectorAll('.rgb-presets button');
  
  presetButtons.forEach(button => {
    const preset = button.getAttribute('data-preset');
    
    if (preset && rgbState.presets[preset]) {
      button.addEventListener('click', () => {
        applyRGBPreset(preset);
      });
    }
  });
}

// Apply RGB preset
function applyRGBPreset(preset) {
  if (!rgbState.presets[preset]) return;
  
  // Set RGB values
  rgbState.r = rgbState.presets[preset].r ;
  rgbState.g = rgbState.presets[preset].g;
  rgbState.b = rgbState.presets[preset].b;
  
  // Update sliders and inputs
  const rSlider = document.getElementById('r-slider');
  const gSlider = document.getElementById('g-slider');
  const bSlider = document.getElementById('b-slider');
  
  const rInput = document.getElementById('r-input');
  const gInput = document.getElementById('g-input');
  const bInput = document.getElementById('b-input');
  
  if (rSlider) rSlider.value = rgbState.r;
  if (gSlider) gSlider.value = rgbState.g;
  if (bSlider) bSlider.value = rgbState.b;
  
  if (rInput) rInput.value = rgbState.r;
  if (gInput) gInput.value = rgbState.g;
  if (bInput) bInput.value = rgbState.b;
  
  // Update display
  updateRGBDisplay();
  
  // Show notification
  showNotification(`Applied ${preset} color preset`, 'success');
}

// Update RGB display
function updateRGBDisplay() {
  // Update value displays
  const rValue = document.getElementById('r-value');
  const gValue = document.getElementById('g-value');
  const bValue = document.getElementById('b-value');
  
  if (rValue) rValue.textContent = rgbState.r;
  if (gValue) gValue.textContent = rgbState.g;
  if (bValue) bValue.textContent = rgbState.b;
  
  // Update preview
  const previewBefore = document.getElementById('rgb-preview-before');
  const previewAfter = document.getElementById('rgb-preview-after');
  
  if (previewBefore) {
    previewBefore.style.backgroundColor = 'rgb(0, 255, 170)'; // Original theme color
  }
  
  if (previewAfter) {
    previewAfter.style.backgroundColor = `rgb(${rgbState.r}, ${rgbState.g}, ${rgbState.b})`;
  }
  
  // Apply to targets
  applyRGBToTargets();
  
  // Save settings
  saveRGBSettings();
}

// Apply RGB to targets
function applyRGBToTargets() {
  // Apply to viewer if selected
  if (rgbState.targetViewer) {
    applyRGBToViewer();
  } else {
    removeRGBFromViewer();
  }
  
  // Apply to assets if selected
  if (rgbState.targetAssets) {
    applyRGBToAssets();
  } else {
    removeRGBFromAssets();
  }
  
  // Apply to UI if selected
  if (rgbState.targetUI) {
    applyRGBToUI();
  } else {
    removeRGBFromUI();
  }
}

// Apply RGB to viewer
function applyRGBToViewer() {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  const normalizedR = rgbState.r / 255;
  const normalizedG = rgbState.g / 255;
  const normalizedB = rgbState.b / 255;
  
  // Create RGB matrix filter
  cardCanvas.style.filter = `
    brightness(1.0)
    contrast(1.0)
    saturate(1.0)
    sepia(0)
    grayscale(0)
    invert(0)
    hue-rotate(0deg)
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='rgb'><feColorMatrix type='matrix' values='${normalizedR} 0 0 0 0 0 ${normalizedG} 0 0 0 0 0 ${normalizedB} 0 0 0 0 0 1 0'/></filter></svg>#rgb")
  `;
  
  // Update 3D renderer if available
  if (window.threeJsScene && window.threeJsRenderer) {
    window.threeJsScene.background = new THREE.Color(normalizedR, normalizedG, normalizedB);
    
    // Force render update
    if (window.renderThreeJsScene) {
      window.renderThreeJsScene();
    }
  }
}

// Remove RGB from viewer
function removeRGBFromViewer() {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Remove filter
  cardCanvas.style.filter = '';
  
  // Reset 3D renderer if available
  if (window.threeJsScene && window.threeJsRenderer) {
    window.threeJsScene.background = new THREE.Color(0, 0, 0);
    
    // Force render update
    if (window.renderThreeJsScene) {
      window.renderThreeJsScene();
    }
  }
}

// Apply RGB to assets
function applyRGBToAssets() {
  const assetItems = document.querySelectorAll('.asset-item img');
  
  assetItems.forEach(img => {
    img.style.filter = `opacity(1) drop-shadow(0 0 0 rgb(${rgbState.r}, ${rgbState.g}, ${rgbState.b}))`;
  });
}

// Remove RGB from assets
function removeRGBFromAssets() {
  const assetItems = document.querySelectorAll('.asset-item img');
  
  assetItems.forEach(img => {
    img.style.filter = '';
  });
}

// Apply RGB to UI
function applyRGBToUI() {
  // Update CSS variables for UI elements
  document.documentElement.style.setProperty('--primary-r', rgbState.r);
  document.documentElement.style.setProperty('--primary-g', rgbState.g);
  document.documentElement.style.setProperty('--primary-b', rgbState.b);
  document.documentElement.style.setProperty('--primary-rgb', `${rgbState.r}, ${rgbState.g}, ${rgbState.b}`);
  document.documentElement.style.setProperty('--primary-color', `rgb(${rgbState.r}, ${rgbState.g}, ${rgbState.b})`);
}

// Remove RGB from UI
function removeRGBFromUI() {
  // Reset to default theme color
  document.documentElement.style.setProperty('--primary-r', 0);
  document.documentElement.style.setProperty('--primary-g', 255);
  document.documentElement.style.setProperty('--primary-b', 170);
  document.documentElement.style.setProperty('--primary-rgb', '0, 255, 170');
  document.documentElement.style.setProperty('--primary-color', 'rgb(0, 255, 170)');
}

// Save RGB settings to localStorage
function saveRGBSettings() {
  try {
    localStorage.setItem('famCardRGB', JSON.stringify({
      r: rgbState.r,
      g: rgbState.g,
      b: rgbState.b,
      targetViewer: rgbState.targetViewer,
      targetAssets: rgbState.targetAssets,
      targetUI: rgbState.targetUI
    }));
  } catch (error) {
    console.error('Failed to save RGB settings:', error);
  }
}

// Load RGB settings from localStorage
function loadSavedRGBSettings() {
  try {
    const savedSettings = localStorage.getItem('famCardRGB');
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      
      // Update state
      rgbState.r = settings.r !== undefined ? settings.r : rgbState.r;
      rgbState.g = settings.g !== undefined ? settings.g : rgbState.g;
      rgbState.b = settings.b !== undefined ? settings.b : rgbState.b;
      rgbState.targetViewer = settings.targetViewer !== undefined ? settings.targetViewer : rgbState.targetViewer;
      rgbState.targetAssets = settings.targetAssets !== undefined ? settings.targetAssets : rgbState.targetAssets;
      rgbState.targetUI = settings.targetUI !== undefined ? settings.targetUI : rgbState.targetUI;
      
      // Update sliders and inputs
      const rSlider = document.getElementById('r-slider');
      const gSlider = document.getElementById('g-slider');
      const bSlider = document.getElementById('b-slider');
      
      const rInput = document.getElementById('r-input');
      const gInput = document.getElementById('g-input');
      const bInput = document.getElementById('b-input');
      
      if (rSlider) rSlider.value = rgbState.r;
      if (gSlider) gSlider.value = rgbState.g;
      if (bSlider) bSlider.value = rgbState.b;
      
      if (rInput) rInput.value = rgbState.r;
      if (gInput) gInput.value = rgbState.g;
      if (bInput) bInput.value = rgbState.b;
      
      // Update target checkboxes
      const targetViewer = document.getElementById('target-viewer');
      const targetAssets = document.getElementById('target-assets');
      const targetUI = document.getElementById('target-ui');
      
      if (targetViewer) targetViewer.checked = rgbState.targetViewer;
      if (targetAssets) targetAssets.checked = rgbState.targetAssets;
      if (targetUI) targetUI.checked = rgbState.targetUI;
      
      // Update display
      updateRGBDisplay();
      
      console.log('RGB settings loaded from localStorage');
    } else {
      // Apply original preset if no saved settings
      applyRGBPreset('original');
    }
  } catch (error) {
    console.error('Failed to load RGB settings:', error);
    
    // Apply original preset as fallback
    applyRGBPreset('original');
  }
}

// Export functions
window.rgbControls = {
  initRGBControls,
  applyRGBPreset,
  updateRGBDisplay,
  rgbState
};
