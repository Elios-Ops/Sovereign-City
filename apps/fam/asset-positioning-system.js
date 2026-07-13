// Asset Positioning System for FAM Card Viewer
// This file implements the draggable asset positioning functionality

// Asset system state
const assetSystemState = {
  assets: [],
  activeAssets: [],
  isDragging: false,
  draggedAsset: null,
  dragStartX: 0,
  dragStartY: 0,
  dragStartLeft: 0,
  dragStartTop: 0,
  showGrid: false,
  gridSize: 10 // Grid size in percentage
};

// Initialize asset positioning system
function initAssetPositioningSystem() {
  console.log('Initializing asset positioning system...');
  
  // Load assets
  loadAssets();
  
  // Add grid overlay
  addGridOverlay();
  
  // Setup event listeners
  setupAssetEventListeners();
  
  console.log('Asset positioning system initialized');
}

// Load assets from source
async function loadAssets() {
  try {
    // TODO: Load assets from actual source
    // For now, use placeholder assets
    const placeholderAssets = [
      {
        id: 'asset-1',
        name: 'Holographic Badge',
        imageUrl: 'https://via.placeholder.com/100x100.png?text=Badge',
        type: 'icon',
        defaultX: 0,
        defaultY: 0,
        defaultScale: 1
      },
      {
        id: 'asset-2',
        name: 'Neon Glow',
        imageUrl: 'https://via.placeholder.com/200x100.png?text=Glow',
        type: 'effect',
        defaultX: 0.2,
        defaultY: 0.2,
        defaultScale: 1.2
      },
      {
        id: 'asset-3',
        name: 'Digital Overlay',
        imageUrl: 'https://via.placeholder.com/300x150.png?text=Overlay',
        type: 'overlay',
        defaultX: -0.3,
        defaultY: -0.3,
        defaultScale: 0.8
      },
      {
        id: 'asset-4',
        name: 'Circuit Pattern',
        imageUrl: 'https://via.placeholder.com/100x300.png?text=Circuit',
        type: 'background',
        defaultX: 0.4,
        defaultY: -0.4,
        defaultScale: 1.5
      }
    ];
    
    // Store assets in state
    assetSystemState.assets = placeholderAssets;
    
    // Populate asset library
    populateAssetLibrary();
    
    // Load active assets from localStorage
    loadActiveAssets();
    
    console.log('Assets loaded successfully');
  } catch (error) {
    console.error('Failed to load assets:', error);
  }
}

// Populate asset library in the UI
function populateAssetLibrary() {
  const assetGrid = document.querySelector('.asset-grid');
  if (!assetGrid) return;
  
  // Clear existing assets
  assetGrid.innerHTML = '';
  
  // Add each asset to the grid
  assetSystemState.assets.forEach(asset => {
    const assetElement = document.createElement('div');
    assetElement.className = 'asset-library-item';
    assetElement.setAttribute('data-asset-id', asset.id);
    
    const assetImage = document.createElement('img');
    assetImage.src = asset.imageUrl;
    assetImage.alt = asset.name;
    
    const assetName = document.createElement('div');
    assetName.className = 'asset-name';
    assetName.textContent = asset.name;
    
    const assetType = document.createElement('div');
    assetType.className = 'asset-type';
    assetType.textContent = asset.type;
    
    const addButton = document.createElement('button');
    addButton.className = 'add-asset-btn';
    addButton.textContent = 'Add';
    addButton.addEventListener('click', () => addAssetToCard(asset));
    
    assetElement.appendChild(assetImage);
    assetElement.appendChild(assetName);
    assetElement.appendChild(assetType);
    assetElement.appendChild(addButton);
    
    assetGrid.appendChild(assetElement);
  });
}

// Add asset to card
function addAssetToCard(asset) {
  console.log(`Adding asset to card: ${asset.name}`);
  
  // Check if asset is already active
  const isActive = assetSystemState.activeAssets.some(a => a.id === asset.id);
  if (isActive) {
    console.warn(`Asset ${asset.name} is already active`);
    showNotification(`Asset ${asset.name} is already on the card`, 'warning');
    return;
  }
  
  // Create active asset object
  const activeAsset = {
    id: asset.id,
    name: asset.name,
    imageUrl: asset.imageUrl,
    type: asset.type,
    x: asset.defaultX || 0,
    y: asset.defaultY || 0,
    scale: asset.defaultScale || 1,
    rotation: 0,
    zIndex: assetSystemState.activeAssets.length + 1
  };
  
  // Add to active assets
  assetSystemState.activeAssets.push(activeAsset);
  
  // Create and position asset element
  createAssetElement(activeAsset);
  
  // Update asset list in UI
  updateActiveAssetsList();
  
  // Save active assets
  saveActiveAssets();
  
  // Show notification
  showNotification(`Added ${asset.name} to card`, 'success');
}

// Create asset element on the card
function createAssetElement(asset) {
  const assetContainer = document.querySelector('.asset-container');
  if (!assetContainer) return;
  
  // Create asset element
  const assetElement = document.createElement('div');
  assetElement.className = 'asset-item';
  assetElement.setAttribute('data-asset-id', asset.id);
  assetElement.style.left = `${normalizedToPercent(asset.x)}%`;
  assetElement.style.top = `${normalizedToPercent(asset.y)}%`;
  assetElement.style.transform = `scale(${asset.scale}) rotate(${asset.rotation}deg)`;
  assetElement.style.zIndex = asset.zIndex;
  
  // Create asset image
  const assetImage = document.createElement('img');
  assetImage.src = asset.imageUrl;
  assetImage.alt = asset.name;
  
  // Create asset controls
  const assetControls = document.createElement('div');
  assetControls.className = 'asset-controls';
  
  // Delete button
  const deleteButton = document.createElement('button');
  deleteButton.className = 'asset-delete-btn';
  deleteButton.innerHTML = '×';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    removeAssetFromCard(asset.id);
  });
  
  // Scale up button
  const scaleUpButton = document.createElement('button');
  scaleUpButton.className = 'asset-scale-btn scale-up';
  scaleUpButton.innerHTML = '+';
  scaleUpButton.addEventListener('click', (e) => {
    e.stopPropagation();
    scaleAsset(asset.id, 0.1);
  });
  
  // Scale down button
  const scaleDownButton = document.createElement('button');
  scaleDownButton.className = 'asset-scale-btn scale-down';
  scaleDownButton.innerHTML = '-';
  scaleDownButton.addEventListener('click', (e) => {
    e.stopPropagation();
    scaleAsset(asset.id, -0.1);
  });
  
  // Rotate button
  const rotateButton = document.createElement('button');
  rotateButton.className = 'asset-rotate-btn';
  rotateButton.innerHTML = '↻';
  rotateButton.addEventListener('click', (e) => {
    e.stopPropagation();
    rotateAsset(asset.id, 15);
  });
  
  // Add controls to asset
  assetControls.appendChild(deleteButton);
  assetControls.appendChild(scaleUpButton);
  assetControls.appendChild(scaleDownButton);
  assetControls.appendChild(rotateButton);
  
  // Add elements to asset
  assetElement.appendChild(assetImage);
  assetElement.appendChild(assetControls);
  
  // Add to container
  assetContainer.appendChild(assetElement);
  
  // Make draggable
  makeAssetDraggable(assetElement);
}

// Make asset draggable
function makeAssetDraggable(assetElement) {
  let isDragging = false;
  let startX, startY, startLeft, startTop;
  
  // Mouse down event
  assetElement.addEventListener('mousedown', (e) => {
    isDragging = true;
    assetElement.classList.add('active');
    
    // Get starting position
    startX = e.clientX;
    startY = e.clientY;
    startLeft = parseFloat(assetElement.style.left);
    startTop = parseFloat(assetElement.style.top);
    
    // Store dragged asset info
    assetSystemState.isDragging = true;
    assetSystemState.draggedAsset = assetElement;
    assetSystemState.dragStartX = startX;
    assetSystemState.dragStartY = startY;
    assetSystemState.dragStartLeft = startLeft;
    assetSystemState.dragStartTop = startTop;
    
    // Prevent default behavior
    e.preventDefault();
    
    // Bring to front
    const assetId = assetElement.getAttribute('data-asset-id');
    bringAssetToFront(assetId);
  });
  
  // Global mouse move and mouse up events are handled in setupAssetEventListeners
}

// Setup asset event listeners
function setupAssetEventListeners() {
  // Mouse move event (on document)
  document.addEventListener('mousemove', (e) => {
    if (!assetSystemState.isDragging) return;
    
    // Calculate new position with detailed pixel-to-percentage conversion
    const deltaX = e.clientX - assetSystemState.dragStartX;
    const deltaY = e.clientY - assetSystemState.dragStartY;
    
    const cardCanvas = document.getElementById('card-canvas');
    const cardRect = cardCanvas.getBoundingClientRect();
    
    // Convert pixel change to percentage
    const percentX = deltaX / cardRect.width * 100;
    const percentY = deltaY / cardRect.height * 100;
    
    // Apply new position with bounds checking
    let newLeft = assetSystemState.dragStartLeft + percentX;
    let newTop = assetSystemState.dragStartTop + percentY;
    
    // Clamp values to stay within card (with 5% buffer for better UX)
    newLeft = Math.max(-5, Math.min(105, newLeft));
    newTop = Math.max(-5, Math.min(105, newTop));
    
    assetSystemState.draggedAsset.style.left = `${newLeft}%`;
    assetSystemState.draggedAsset.style.top = `${newTop}%`;
    
    // Update asset in state with normalized coordinates
    const assetId = assetSystemState.draggedAsset.dataset.assetId;
    const assetIndex = assetSystemState.activeAssets.findIndex(a => a.id === assetId);
    
    if (assetIndex !== -1) {
      // Convert from 0-100% to -1 to 1 range for Three.js compatibility
      const normalizedX = percentToNormalized(newLeft);
      const normalizedY = percentToNormalized(newTop);
      
      assetSystemState.activeAssets[assetIndex].x = normalizedX;
      assetSystemState.activeAssets[assetIndex].y = normalizedY;
      
      // Update position indicator
      updatePositionIndicator(normalizedX, normalizedY);
    }
  });
  
  // Mouse up event (on document)
  document.addEventListener('mouseup', () => {
    if (assetSystemState.isDragging) {
      assetSystemState.isDragging = false;
      
      if (assetSystemState.draggedAsset) {
        assetSystemState.draggedAsset.classList.remove('active');
        assetSystemState.draggedAsset = null;
      }
      
      // Save active assets
      saveActiveAssets();
      
      // Update asset list in UI
      updateActiveAssetsList();
    }
  });
  
  // Toggle grid button
  const toggleGridBtn = document.getElementById('toggle-grid-btn');
  if (toggleGridBtn) {
    toggleGridBtn.addEventListener('click', toggleGrid);
  }
  
  // Reset positions button
  const resetPositionsBtn = document.getElementById('reset-positions-btn');
  if (resetPositionsBtn) {
    resetPositionsBtn.addEventListener('click', resetAssetPositions);
  }
}

// Update position indicator
function updatePositionIndicator(x, y, scale) {
  const positionX = document.getElementById('position-x');
  const positionY = document.getElementById('position-y');
  const positionScale = document.getElementById('position-scale');
  
  if (positionX) positionX.textContent = x.toFixed(2);
  if (positionY) positionY.textContent = y.toFixed(2);
  if (positionScale && scale !== undefined) positionScale.textContent = scale.toFixed(2);
}

// Toggle grid
function toggleGrid() {
  assetSystemState.showGrid = !assetSystemState.showGrid;
  
  const gridOverlay = document.querySelector('.grid-overlay');
  if (gridOverlay) {
    gridOverlay.style.display = assetSystemState.showGrid ? 'block' : 'none';
  }
  
  // Update button text
  const toggleGridBtn = document.getElementById('toggle-grid-btn');
  if (toggleGridBtn) {
    toggleGridBtn.textContent = assetSystemState.showGrid ? 'Hide Grid' : 'Show Grid';
  }
}

// Add grid overlay
function addGridOverlay() {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Create grid overlay
  const gridOverlay = document.createElement('div');
  gridOverlay.className = 'grid-overlay';
  gridOverlay.style.display = 'none';
  
  // Create grid lines
  for (let i = 0; i <= 100; i += assetSystemState.gridSize) {
    // Vertical lines
    const verticalLine = document.createElement('div');
    verticalLine.className = 'grid-line vertical';
    verticalLine.style.left = `${i}%`;
    gridOverlay.appendChild(verticalLine);
    
    // Horizontal lines
    const horizontalLine = document.createElement('div');
    horizontalLine.className = 'grid-line horizontal';
    horizontalLine.style.top = `${i}%`;
    gridOverlay.appendChild(horizontalLine);
    
    // Add coordinate labels for major lines
    if (i % 20 === 0) {
      const xLabel = document.createElement('div');
      xLabel.className = 'grid-label x-label';
      xLabel.style.left = `${i}%`;
      xLabel.style.top = '0';
      xLabel.textContent = percentToNormalized(i).toFixed(1);
      gridOverlay.appendChild(xLabel);
      
      const yLabel = document.createElement('div');
      yLabel.className = 'grid-label y-label';
      yLabel.style.top = `${i}%`;
      yLabel.style.left = '0';
      yLabel.textContent = percentToNormalized(i).toFixed(1);
      gridOverlay.appendChild(yLabel);
    }
  }
  
  // Add to card
  cardCanvas.appendChild(gridOverlay);
}

// Reset asset positions
function resetAssetPositions() {
  if (assetSystemState.activeAssets.length === 0) {
    showNotification('No assets to reset', 'info');
    return;
  }
  
  // Confirm reset
  if (confirm('Reset all asset positions to default?')) {
    // Reset each active asset
    assetSystemState.activeAssets.forEach(asset => {
      // Find original asset for default values
      const originalAsset = assetSystemState.assets.find(a => a.id === asset.id);
      
      if (originalAsset) {
        // Reset to default values
        asset.x = originalAsset.defaultX || 0;
        asset.y = originalAsset.defaultY || 0;
        asset.scale = originalAsset.defaultScale || 1;
        asset.rotation = 0;
        
        // Update element
        const assetElement = document.querySelector(`.asset-item[data-asset-id="${asset.id}"]`);
        if (assetElement) {
          assetElement.style.left = `${normalizedToPercent(asset.x)}%`;
          assetElement.style.top = `${normalizedToPercent(asset.y)}%`;
          assetElement.style.transform = `scale(${asset.scale}) rotate(${asset.rotation}deg)`;
        }
      }
    });
    
    // Save active assets
    saveActiveAssets();
    
    // Update asset list in UI
    updateActiveAssetsList();
    
    // Show notification
    showNotification('Asset positions reset', 'success');
  }
}

// Scale asset
function scaleAsset(assetId, scaleDelta) {
  const assetIndex = assetSystemState.activeAssets.findIndex(a => a.id === assetId);
  
  if (assetIndex !== -1) {
    // Get current scale
    let scale = assetSystemState.activeAssets[assetIndex].scale;
    
    // Apply delta
    scale += scaleDelta;
    
    // Clamp to reasonable range
    scale = Math.max(0.1, Math.min(3, scale));
    
    // Update asset
    assetSystemState.activeAssets[assetIndex].scale = scale;
    
    // Update element
    const assetElement = document.querySelector(`.asset-item[data-asset-id="${assetId}"]`);
    if (assetElement) {
      const rotation = assetSystemState.activeAssets[assetIndex].rotation;
      assetElement.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    }
    
    // Update position indicator
    updatePositionIndicator(
      assetSystemState.activeAssets[assetIndex].x,
      assetSystemState.activeAssets[assetIndex].y,
      scale
    );
    
    // Save active assets
    saveActiveAssets();
    
    // Update asset list in UI
    updateActiveAssetsList();
  }
}

// Rotate asset
function rotateAsset(assetId, rotationDelta) {
  const assetIndex = assetSystemState.activeAssets.findIndex(a => a.id === assetId);
  
  if (assetIndex !== -1) {
    // Get current rotation
    let rotation = assetSystemState.activeAssets[assetIndex].rotation;
    
    // Apply delta
    rotation += rotationDelta;
    
    // Normalize to 0-360
    rotation = rotation % 360;
    
    // Update asset
    assetSystemState.activeAssets[assetIndex].rotation = rotation;
    
    // Update element
    const assetElement = document.querySelector(`.asset-item[data-asset-id="${assetId}"]`);
    if (assetElement) {
      const scale = assetSystemState.activeAssets[assetIndex].scale;
      assetElement.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
    }
    
    // Save active assets
    saveActiveAssets();
    
    // Update asset list in UI
    updateActiveAssetsList();
  }
}

// Bring asset to front
function bringAssetToFront(assetId) {
  // Get highest zIndex
  const highestZIndex = assetSystemState.activeAssets.reduce(
    (max, asset) => Math.max(max, asset.zIndex),
    0
  );
  
  // Update zIndex for the asset
  const assetIndex = assetSystemState.activeAssets.findIndex(a => a.id === assetId);
  if (assetIndex !== -1) {
    assetSystemState.activeAssets[assetIndex].zIndex = highestZIndex + 1;
    
    // Update element
    const assetElement = document.querySelector(`.asset-item[data-asset-id="${assetId}"]`);
    if (assetElement) {
      assetElement.style.zIndex = highestZIndex + 1;
    }
    
    // Save active assets
    saveActiveAssets();
  }
}

// Remove asset from card
function removeAssetFromCard(assetId) {
  // Find asset index
  const assetIndex = assetSystemState.activeAssets.findIndex(a => a.id === assetId);
  
  if (assetIndex !== -1) {
    // Get asset name for notification
    const assetName = assetSystemState.activeAssets[assetIndex].name;
    
    // Remove from active assets
    assetSystemState.activeAssets.splice(assetIndex, 1);
    
    // Remove element
    const assetElement = document.querySelector(`.asset-item[data-asset-id="${assetId}"]`);
    if (assetElement) {
      assetElement.remove();
    }
    
    // Update asset list in UI
    updateActiveAssetsList();
    
    // Save active assets
    saveActiveAssets();
    
    // Show notification
    showNotification(`Removed ${assetName} from card`, 'info');
  }
}

// Update active assets list in UI
function updateActiveAssetsList() {
  const activeAssetsList = document.querySelector('.active-assets-list');
  if (!activeAssetsList) return;
  
  // Clear list
  activeAssetsList.innerHTML = '';
  
  // Check if empty
  if (assetSystemState.activeAssets.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'empty-message';
    emptyMessage.textContent = 'No active assets. Add assets from the library.';
    activeAssetsList.appendChild(emptyMessage);
    return;
  }
  
  // Add each active asset
  assetSystemState.activeAssets.forEach(asset => {
    const assetItem = document.createElement('div');
    assetItem.className = 'active-asset-item';
    assetItem.setAttribute('data-asset-id', asset.id);
    
    const assetName = document.createElement('div');
    assetName.className = 'asset-name';
    assetName.textContent = asset.name;
    
    const assetCoords = document.createElement('div');
    assetCoords.className = 'asset-coords';
    assetCoords.textContent = `X: ${asset.x.toFixed(2)}, Y: ${asset.y.toFixed(2)}`;
    
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-asset-btn';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeAssetFromCard(asset.id));
    
    assetItem.appendChild(assetName);
    assetItem.appendChild(assetCoords);
    assetItem.appendChild(removeButton);
    
    activeAssetsList.appendChild(assetItem);
  });
}

// Load active assets from localStorage
function loadActiveAssets() {
  try {
    const savedAssets = localStorage.getItem('famCardActiveAssets');
    
    if (savedAssets) {
      assetSystemState.activeAssets = JSON.parse(savedAssets);
      
      // Create elements for each active asset
      assetSystemState.activeAssets.forEach(asset => {
        createAssetElement(asset);
      });
      
      // Update asset list in UI
      updateActiveAssetsList();
      
      console.log('Active assets loaded from localStorage');
    }
  } catch (error) {
    console.error('Failed to load active assets from localStorage:', error);
  }
}

// Save active assets to localStorage
function saveActiveAssets() {
  try {
    localStorage.setItem('famCardActiveAssets', JSON.stringify(assetSystemState.activeAssets));
  } catch (error) {
    console.error('Failed to save active assets to localStorage:', error);
  }
}

// Convert from normalized (-1 to 1) to percentage (0 to 100)
function normalizedToPercent(value) {
  return (value + 1) * 50;
}

// Convert from percentage (0 to 100) to normalized (-1 to 1)
function percentToNormalized(value) {
  return (value / 50) - 1;
}

// Export functions
window.assetPositioningSystem = {
  initAssetPositioningSystem,
  makeAssetDraggable,
  toggleGrid,
  resetAssetPositions
};
