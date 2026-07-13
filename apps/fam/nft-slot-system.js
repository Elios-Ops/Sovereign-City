// NFT Slot System for FAM Card Viewer
// This file implements the NFT slot categories and interactions

// NFT Slot Categories Definition
const nftSlotCategories = {
  boss: { 
    name: "Boss Tier", 
    slots: 1, 
    signetRing: true,
    description: "The highest rank in the FAM hierarchy",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=boss"
  },
  underBoss: { 
    name: "Under Boss", 
    slots: 2,
    description: "Second-in-command of the FAM syndicate",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=under-boss"
  },
  madeMan: { 
    name: "Made Man", 
    slots: 2,
    description: "A fully initiated member of the syndicate",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=made-man"
  },
  handler: { 
    name: "Handler", 
    slots: 4,
    description: "Manages operations and crew assignments",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=handler"
  },
  contractor: { 
    name: "Contractor", 
    slots: 8,
    description: "Hired specialists for specific jobs",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=contractor"
  },
  associate: { 
    name: "Associate", 
    slots: 16,
    description: "Entry-level syndicate members",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=associate"
  },
  relics: { 
    name: "Relics", 
    slots: 4,
    description: "Valuable artifacts and mystical items",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=relics"
  },
  duffleBag: { 
    name: "Duffle Bag", 
    slots: 6,
    description: "Essential items for syndicate operations",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=duffle-bag"
  },
  getawayVehicles: { 
    name: "Getaway Vehicles", 
    slots: 6,
    description: "Transportation for quick escapes",
    mintUrl: "https://muskrats-io.netlify.app/mint?category=getaway-vehicles"
  }
};

// Generate NFT slots for each category
function generateNFTSlots() {
  const nftSlotsContainer = document.querySelector('.nft-slots');
  if (!nftSlotsContainer) return;
  
  // Clear existing slots
  nftSlotsContainer.innerHTML = '';
  
  // Create sections for each category
  Object.keys(nftSlotCategories).forEach(categoryKey => {
    const category = nftSlotCategories[categoryKey];
    
    // Create category section
    const categorySection = document.createElement('div');
    categorySection.className = `nft-category ${categoryKey}-category`;
    categorySection.setAttribute('data-category', categoryKey);
    
    // Create header
    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'category-header';
    categoryHeader.innerHTML = `
      <h3 class="category-name">${category.name}</h3>
      <span class="category-count">${category.slots} Slot${category.slots > 1 ? 's' : ''}</span>
    `;
    
    // Create slots container
    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'category-slots';
    
    // Create individual slots
    for (let i = 0; i < category.slots; i++) {
      const slot = document.createElement('div');
      slot.className = 'nft-slot';
      slot.setAttribute('data-category', categoryKey);
      slot.setAttribute('data-slot-index', i);
      
      // Add special styling for Boss tier signet ring
      if (categoryKey === 'boss' && category.signetRing && i === 0) {
        slot.classList.add('signet-ring');
        slot.innerHTML = '<div class="slot-icon">💍</div>';
      } else {
        slot.innerHTML = '<div class="slot-icon">+</div>';
      }
      
      // Add tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'slot-tooltip';
      tooltip.textContent = `${category.name} Slot ${i + 1}`;
      slot.appendChild(tooltip);
      
      // Add event listener
      slot.addEventListener('click', () => handleSlotClick(categoryKey, i));
      
      // Add to container
      slotsContainer.appendChild(slot);
    }
    
    // Add "Show All" button for categories with many slots
    if (category.slots > 4) {
      slotsContainer.classList.add('collapsed');
      
      const expandButton = document.createElement('button');
      expandButton.className = 'expand-category-btn';
      expandButton.textContent = 'Show All';
      expandButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isCollapsed = slotsContainer.classList.contains('collapsed');
        slotsContainer.classList.toggle('collapsed', !isCollapsed);
        expandButton.textContent = isCollapsed ? 'Show Less' : 'Show All';
      });
      
      categoryHeader.appendChild(expandButton);
    }
    
    // Assemble the category section
    categorySection.appendChild(categoryHeader);
    categorySection.appendChild(slotsContainer);
    
    // Add to main container
    nftSlotsContainer.appendChild(categorySection);
  });
  
  console.log('NFT slots generated');
}

// Handle slot click
function handleSlotClick(category, slotIndex) {
  console.log(`Slot clicked: ${category} slot ${slotIndex}`);
  
  // Check if wallet is connected
  if (!state.wallet.isConnected) {
    showNotification('Connect your wallet to manage NFTs', 'error');
    return;
  }
  
  // Check if slot is filled
  const slot = document.querySelector(`.nft-slot[data-category="${category}"][data-slot-index="${slotIndex}"]`);
  const isFilled = slot.classList.contains('filled');
  
  if (isFilled) {
    // Show NFT details modal
    showNFTDetailsModal(category, slotIndex);
  } else {
    // Show NFT selection modal
    showNFTSelectionModal(category, slotIndex);
  }
}

// Show NFT details modal
function showNFTDetailsModal(category, slotIndex) {
  console.log(`Showing details for ${category} slot ${slotIndex}`);
  
  // TODO: Implement modal with NFT details
  // For now, simulate removing the NFT
  const slot = document.querySelector(`.nft-slot[data-category="${category}"][data-slot-index="${slotIndex}"]`);
  slot.classList.remove('filled');
  slot.innerHTML = '<div class="slot-icon">+</div>';
  
  // Add tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'slot-tooltip';
  tooltip.textContent = `${nftSlotCategories[category].name} Slot ${slotIndex + 1}`;
  slot.appendChild(tooltip);
  
  // Update card data
  updateCardData();
}

// Show NFT selection modal
function showNFTSelectionModal(category, slotIndex) {
  console.log(`Showing selection for ${category} slot ${slotIndex}`);
  
  // TODO: Implement modal with NFT selection
  // For now, simulate adding an NFT
  const slot = document.querySelector(`.nft-slot[data-category="${category}"][data-slot-index="${slotIndex}"]`);
  slot.classList.add('filled');
  
  // Create placeholder NFT content
  const nftImage = document.createElement('img');
  nftImage.src = 'https://via.placeholder.com/100x100.png?text=NFT';
  nftImage.alt = `${category} NFT`;
  slot.innerHTML = '';
  slot.appendChild(nftImage);
  
  // Add tooltip with more info
  const tooltip = document.createElement('div');
  tooltip.className = 'slot-tooltip';
  tooltip.innerHTML = `
    <div>ID: NFT-${Math.floor(Math.random() * 10000)}</div>
    <div>Category: ${nftSlotCategories[category].name}</div>
    <div>Click to manage</div>
  `;
  slot.appendChild(tooltip);
  
  // Update card data
  updateCardData();
}

// Update card data based on NFT slots
function updateCardData() {
  // Gather filled slots data
  const filledSlots = {};
  
  Object.keys(nftSlotCategories).forEach(category => {
    filledSlots[category] = [];
    
    const slots = document.querySelectorAll(`.nft-slot[data-category="${category}"].filled`);
    slots.forEach(slot => {
      const slotIndex = parseInt(slot.getAttribute('data-slot-index'));
      filledSlots[category].push({
        index: slotIndex,
        id: `NFT-${Math.floor(Math.random() * 10000)}` // Placeholder ID
      });
    });
  });
  
  // Update card state
  state.nftSlots = filledSlots;
  
  // Update card display
  updateCardDisplay();
  
  // Save to localStorage
  saveCardState();
}

// Update card display based on NFT data
function updateCardDisplay() {
  // Update hierarchy status
  const hierarchyCategories = ['boss', 'underBoss', 'madeMan', 'handler', 'contractor', 'associate'];
  
  hierarchyCategories.forEach(category => {
    const isFilled = (state.nftSlots[category] && state.nftSlots[category].length > 0);
    
    // Update hierarchy display
    const hierarchyElement = document.querySelector(`.hierarchy-${category}`);
    if (hierarchyElement) {
      hierarchyElement.classList.toggle('filled', isFilled);
    }
  });
  
  // Update card visual effects based on hierarchy
  updateCardVisualEffects();
}

// Update card visual effects based on hierarchy levels
function updateCardVisualEffects() {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Remove all hierarchy classes
  cardCanvas.classList.remove('hierarchy-boss', 'hierarchy-underboss', 'hierarchy-mademan');
  
  // Check highest filled hierarchy
  if (state.nftSlots.boss && state.nftSlots.boss.length > 0) {
    cardCanvas.classList.add('hierarchy-boss');
    setGlowState('active');
  } else if (state.nftSlots.underBoss && state.nftSlots.underBoss.length > 0) {
    cardCanvas.classList.add('hierarchy-underboss');
    setGlowState('active');
  } else if (state.nftSlots.madeMan && state.nftSlots.madeMan.length > 0) {
    cardCanvas.classList.add('hierarchy-mademan');
    setGlowState('active');
  } else {
    setGlowState('inactive');
  }
}

// Show notification message
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Load owned NFTs
async function loadOwnedNFTs(walletAddress) {
  console.log(`Loading owned NFTs for wallet: ${walletAddress}`);
  
  try {
    // TODO: Implement actual NFT loading from wallet
    // For now, use simulated data
    
    const simulatedNFTs = {
      boss: [],
      underBoss: [{ id: 'NFT-1234', slotIndex: 0 }],
      madeMan: [{ id: 'NFT-2345', slotIndex: 0 }],
      handler: [{ id: 'NFT-3456', slotIndex: 0 }, { id: 'NFT-4567', slotIndex: 1 }],
      contractor: [{ id: 'NFT-5678', slotIndex: 0 }],
      associate: [{ id: 'NFT-6789', slotIndex: 0 }, { id: 'NFT-7890', slotIndex: 1 }],
      relics: [{ id: 'NFT-8901', slotIndex: 0 }],
      duffleBag: [{ id: 'NFT-9012', slotIndex: 0 }],
      getawayVehicles: [{ id: 'NFT-0123', slotIndex: 0 }]
    };
    
    // Update state
    state.ownedNFTs = simulatedNFTs;
    
    // Update UI
    displayOwnedNFTs();
    
    return simulatedNFTs;
  } catch (error) {
    console.error('Failed to load owned NFTs:', error);
    showNotification('Failed to load owned NFTs', 'error');
    return {};
  }
}

// Display owned NFTs in the slots
function displayOwnedNFTs() {
  if (!state.ownedNFTs) return;
  
  Object.keys(state.ownedNFTs).forEach(category => {
    state.ownedNFTs[category].forEach(nft => {
      const slot = document.querySelector(`.nft-slot[data-category="${category}"][data-slot-index="${nft.slotIndex}"]`);
      
      if (slot) {
        slot.classList.add('filled');
        
        // Create placeholder NFT content
        const nftImage = document.createElement('img');
        nftImage.src = 'https://via.placeholder.com/100x100.png?text=NFT';
        nftImage.alt = `${category} NFT`;
        slot.innerHTML = '';
        slot.appendChild(nftImage);
        
        // Add tooltip with more info
        const tooltip = document.createElement('div');
        tooltip.className = 'slot-tooltip';
        tooltip.innerHTML = `
          <div>ID: ${nft.id}</div>
          <div>Category: ${nftSlotCategories[category].name}</div>
          <div>Click to manage</div>
        `;
        slot.appendChild(tooltip);
      }
    });
  });
  
  // Update card display
  updateCardDisplay();
}

// Export functions
window.nftSlotSystem = {
  generateNFTSlots,
  loadOwnedNFTs,
  updateCardDisplay,
  nftSlotCategories
};
