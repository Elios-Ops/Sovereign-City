// Aspect Ratio Controls for FAM Card Viewer
// This file implements the aspect ratio control functionality

// Initialize aspect ratio controls
function initAspectRatioControls() {
  console.log('Initializing aspect ratio controls...');
  
  // Add event listeners to aspect ratio buttons
  const aspectBtns = document.querySelectorAll('.aspect-btn');
  aspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const ratio = btn.getAttribute('data-ratio');
      setAspectRatio(ratio);
    });
  });
  
  // Add event listener to custom size apply button
  const applyCustomSizeBtn = document.getElementById('apply-custom-size');
  if (applyCustomSizeBtn) {
    applyCustomSizeBtn.addEventListener('click', applyCustomSize);
  }
  
  // Load saved aspect ratio
  loadSavedAspectRatio();
  
  console.log('Aspect ratio controls initialized');
}

// Set aspect ratio
function setAspectRatio(ratio) {
  const cardContainer = document.querySelector('.card-container');
  const cardCanvas = document.getElementById('card-canvas');
  
  if (!cardContainer || !cardCanvas) return;
  
  // Remove all aspect classes
  cardCanvas.classList.remove('aspect-16-9', 'aspect-9-16', 'aspect-1-1', 'aspect-freeform', 'aspect-card');
  
  // Remove resize handles if they exist
  removeResizeHandles();
  
  // Calculate dimensions based on ratio
  let width, height;
  
  switch(ratio) {
    case '16:9':
      cardCanvas.classList.add('aspect-16-9');
      width = cardContainer.clientWidth;
      height = width * (9/16);
      break;
    case '9:16':
      cardCanvas.classList.add('aspect-9-16');
      width = cardContainer.clientWidth;
      height = width * (16/9);
      break;
    case '1:1':
      cardCanvas.classList.add('aspect-1-1');
      width = cardContainer.clientWidth;
      height = width;
      break;
    case 'card':
      cardCanvas.classList.add('aspect-card');
      // Standard credit card ratio is 85.60 × 53.98 mm (1.58 ratio)
      width = cardContainer.clientWidth;
      height = width / 1.58;
      break;
    case 'freeform':
      cardCanvas.classList.add('aspect-freeform');
      // Add resize handles
      addResizeHandles(cardCanvas);
      
      // Use current dimensions
      width = cardCanvas.clientWidth;
      height = cardCanvas.clientHeight;
      
      // Update input fields with current dimensions
      document.getElementById('custom-width').value = Math.round(width);
      document.getElementById('custom-height').value = Math.round(height);
      
      // Update current size display
      document.getElementById('current-size').textContent = `${Math.round(width)} × ${Math.round(height)}px`;
      document.getElementById('current-ratio').textContent = `(Freeform)`;
      
      // Save preference
      saveAspectRatio(ratio);
      
      return; // Exit early as dimensions are user-controlled
    default:
      // Default to credit card ratio
      cardCanvas.classList.add('aspect-card');
      width = cardContainer.clientWidth;
      height = width / 1.58;
  }
  
  // Apply dimensions
  cardCanvas.style.width = `${width}px`;
  cardCanvas.style.height = `${height}px`;
  
  // Update custom size inputs
  document.getElementById('custom-width').value = Math.round(width);
  document.getElementById('custom-height').value = Math.round(height);
  
  // Update current size display
  document.getElementById('current-size').textContent = `${Math.round(width)} × ${Math.round(height)}px`;
  document.getElementById('current-ratio').textContent = `(${ratio})`;
  
  // Update three.js renderer if active
  updateRendererSize(width, height);
  
  // Save preference
  saveAspectRatio(ratio);
  
  // Highlight active button
  updateActiveAspectButton(ratio);
}

// Update three.js renderer size
function updateRendererSize(width, height) {
  // Check if three.js is initialized and renderer exists
  if (window.threeJsRenderer) {
    window.threeJsRenderer.setSize(width, height);
    
    // Update camera aspect ratio
    if (window.threeJsCamera) {
      window.threeJsCamera.aspect = width / height;
      window.threeJsCamera.updateProjectionMatrix();
    }
  }
}

// Apply custom size
function applyCustomSize() {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Get values from inputs
  const width = parseInt(document.getElementById('custom-width').value);
  const height = parseInt(document.getElementById('custom-height').value);
  
  // Validate
  if (isNaN(width) || isNaN(height) || width < 200 || height < 200 || width > 1200 || height > 1200) {
    showNotification('Invalid dimensions. Width and height must be between 200 and 1200px.', 'error');
    return;
  }
  
  // Apply dimensions
  cardCanvas.style.width = `${width}px`;
  cardCanvas.style.height = `${height}px`;
  
  // Remove all aspect classes
  cardCanvas.classList.remove('aspect-16-9', 'aspect-9-16', 'aspect-1-1', 'aspect-freeform', 'aspect-card');
  
  // Add freeform class
  cardCanvas.classList.add('aspect-freeform');
  
  // Update current size display
  document.getElementById('current-size').textContent = `${width} × ${height}px`;
  
  // Calculate and display ratio
  const gcd = greatestCommonDivisor(width, height);
  const ratioWidth = width / gcd;
  const ratioHeight = height / gcd;
  
  // Only show simplified ratio if it's reasonably small numbers
  if (ratioWidth <= 16 && ratioHeight <= 16) {
    document.getElementById('current-ratio').textContent = `(${ratioWidth}:${ratioHeight})`;
  } else {
    // Otherwise show numeric ratio
    const ratio = (width / height).toFixed(2);
    document.getElementById('current-ratio').textContent = `(${ratio})`;
  }
  
  // Update three.js renderer if active
  updateRendererSize(width, height);
  
  // Save as custom
  saveCustomSize(width, height);
  
  // Add resize handles
  addResizeHandles(cardCanvas);
  
  // Update active button
  updateActiveAspectButton('freeform');
}

// Add resize handles to element
function addResizeHandles(element) {
  // Check if handles already exist
  if (element.querySelector('.resize-handle')) {
    return;
  }
  
  // Positions for handles
  const positions = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se'];
  
  // Create handles
  positions.forEach(pos => {
    const handle = document.createElement('div');
    handle.className = `resize-handle resize-${pos}`;
    handle.setAttribute('data-position', pos);
    element.appendChild(handle);
    
    // Add event listeners
    handle.addEventListener('mousedown', startResize);
  });
}

// Remove resize handles
function removeResizeHandles() {
  const handles = document.querySelectorAll('.resize-handle');
  handles.forEach(handle => handle.remove());
}

// Start resize operation
function startResize(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Get handle position
  const position = e.target.getAttribute('data-position');
  
  // Get initial dimensions
  const initialWidth = cardCanvas.clientWidth;
  const initialHeight = cardCanvas.clientHeight;
  const initialX = e.clientX;
  const initialY = e.clientY;
  
  // Store resize state
  const resizeState = {
    position,
    initialWidth,
    initialHeight,
    initialX,
    initialY
  };
  
  // Add resize event listeners
  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
  
  // Store state in window to access in the handlers
  window.resizeState = resizeState;
}

// Handle resize operation
function handleResize(e) {
  if (!window.resizeState) return;
  
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  const { position, initialWidth, initialHeight, initialX, initialY } = window.resizeState;
  
  // Calculate deltas
  const deltaX = e.clientX - initialX;
  const deltaY = e.clientY - initialY;
  
  // Calculate new dimensions based on handle position
  let newWidth = initialWidth;
  let newHeight = initialHeight;
  
  // Horizontal resizing
  if (position.includes('e')) {
    newWidth = initialWidth + deltaX;
  } else if (position.includes('w')) {
    newWidth = initialWidth - deltaX;
  }
  
  // Vertical resizing
  if (position.includes('s')) {
    newHeight = initialHeight + deltaY;
  } else if (position.includes('n')) {
    newHeight = initialHeight - deltaY;
  }
  
  // Enforce minimum size
  newWidth = Math.max(200, newWidth);
  newHeight = Math.max(200, newHeight);
  
  // Enforce maximum size
  newWidth = Math.min(1200, newWidth);
  newHeight = Math.min(1200, newHeight);
  
  // Apply new dimensions
  cardCanvas.style.width = `${newWidth}px`;
  cardCanvas.style.height = `${newHeight}px`;
  
  // Update custom size inputs
  document.getElementById('custom-width').value = Math.round(newWidth);
  document.getElementById('custom-height').value = Math.round(newHeight);
  
  // Update current size display
  document.getElementById('current-size').textContent = `${Math.round(newWidth)} × ${Math.round(newHeight)}px`;
  
  // Calculate and display ratio
  const ratio = (newWidth / newHeight).toFixed(2);
  document.getElementById('current-ratio').textContent = `(${ratio})`;
  
  // Update three.js renderer if active
  updateRendererSize(newWidth, newHeight);
}

// Stop resize operation
function stopResize() {
  // Remove event listeners
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
  
  // Save custom size
  const cardCanvas = document.getElementById('card-canvas');
  if (cardCanvas) {
    saveCustomSize(cardCanvas.clientWidth, cardCanvas.clientHeight);
  }
  
  // Clear resize state
  window.resizeState = null;
}

// Update active aspect button
function updateActiveAspectButton(ratio) {
  const aspectBtns = document.querySelectorAll('.aspect-btn');
  aspectBtns.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-ratio') === ratio);
  });
}

// Greatest common divisor for simplifying ratios
function greatestCommonDivisor(a, b) {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

// Save aspect ratio to localStorage
function saveAspectRatio(ratio) {
  try {
    localStorage.setItem('famCardAspectRatio', ratio);
  } catch (error) {
    console.error('Failed to save aspect ratio:', error);
  }
}

// Save custom size to localStorage
function saveCustomSize(width, height) {
  try {
    localStorage.setItem('famCardCustomWidth', width);
    localStorage.setItem('famCardCustomHeight', height);
  } catch (error) {
    console.error('Failed to save custom size:', error);
  }
}

// Load saved aspect ratio from localStorage
function loadSavedAspectRatio() {
  try {
    const savedRatio = localStorage.getItem('famCardAspectRatio');
    
    if (savedRatio === 'freeform') {
      // Load custom size
      const width = parseInt(localStorage.getItem('famCardCustomWidth'));
      const height = parseInt(localStorage.getItem('famCardCustomHeight'));
      
      if (!isNaN(width) && !isNaN(height)) {
        // Update inputs
        document.getElementById('custom-width').value = width;
        document.getElementById('custom-height').value = height;
        
        // Apply custom size
        applyCustomSize();
      } else {
        // Fallback to default ratio
        setAspectRatio('card');
      }
    } else if (savedRatio) {
      // Apply saved ratio
      setAspectRatio(savedRatio);
    } else {
      // Default to card ratio
      setAspectRatio('card');
    }
  } catch (error) {
    console.error('Failed to load saved aspect ratio:', error);
    
    // Default to card ratio
    setAspectRatio('card');
  }
}

// Export functions
window.aspectRatioControls = {
  initAspectRatioControls,
  setAspectRatio,
  applyCustomSize
};
