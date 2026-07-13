// Unified Footer Component for Muskrats.io
const unifiedFooterStyles = `
<style>
  .footer-nav {
    width: 100vw;
    box-sizing: border-box;
    background: rgba(10, 10, 20, 0.88);
    color: #00ffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 18px 0 8px 0;
    position: relative;
    font-size: 1.06rem;
    gap: 18px;
    z-index: 10;
    border-top: 2px solid #00ffff44;
    margin-top: 38px;
    letter-spacing: 1px;
  }
  
  .footer-nav > .footer-btn {
    position: relative;
    background: none;
    border: none;
    color: #00ffff;
    padding: 6px 17px;
    cursor: pointer;
    font-family: inherit;
    font-size: 1.07rem;
    border-radius: 5px;
    text-shadow: 0 0 7px #00ffff66;
    transition: background 0.15s, color 0.15s;
    margin: 3px 0;
  }
  
  .footer-btn:hover, .footer-btn:focus {
    background: #00ffff30;
    color: #fff;
  }
  
  /* DROPUP STYLES FOR FOOTER */
  .dropup-content {
    display: none;
    position: absolute;
    left: 0;
    bottom: 110%;
    min-width: 195px;
    background: rgba(15, 15, 35, 0.97);
    border: 1.5px solid #00ffff66;
    box-shadow: 0 -4px 24px #00ffff22;
    z-index: 40;
    border-radius: 9px;
    padding: 8px 0;
    text-align: left;
    font-size: 1.01rem;
  }
  
  .dropup-content a {
    display: block;
    color: #00ffff;
    padding: 8px 16px;
    text-decoration: none;
    transition: background 0.1s, color 0.1s;
  }
  
  .dropup-content a:hover {
    background: #00ffff22;
    color: #fff;
  }
  
  .footer-btn.dropup:hover .dropup-content,
  .footer-btn.dropup:focus-within .dropup-content {
    display: block;
  }
  
  /* Hamburger Menu Button for Mobile */
  .hamburger-menu-btn {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: rgba(0, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10000;
    box-shadow: 0 4px 20px rgba(0, 255, 255, 0.5);
    transition: all 0.3s ease;
  }
  
  .hamburger-menu-btn:hover {
    transform: scale(1.1);
    background: #00ffff;
    box-shadow: 0 6px 30px rgba(0, 255, 255, 0.7);
  }
  
  .hamburger-menu-btn.active {
    background: #ff00ff;
    box-shadow: 0 6px 30px rgba(255, 0, 255, 0.7);
  }
  
  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }
  
  .hamburger-icon span {
    display: block;
    width: 25px;
    height: 3px;
    background: #000;
    border-radius: 2px;
    transition: all 0.3s ease;
  }
  
  .hamburger-menu-btn.active .hamburger-icon span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  
  .hamburger-menu-btn.active .hamburger-icon span:nth-child(2) {
    opacity: 0;
  }
  
  .hamburger-menu-btn.active .hamburger-icon span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
  
  /* Mobile Navigation Overlay */
  .mobile-nav-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(5, 5, 15, 0.98);
    backdrop-filter: blur(10px);
    z-index: 9999;
    overflow-y: auto;
    padding: 80px 20px 20px;
  }
  
  .mobile-nav-overlay.active {
    display: block;
  }
  
  .mobile-nav-content {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .mobile-nav-section {
    margin-bottom: 30px;
  }
  
  .mobile-nav-title {
    color: #ff00ff;
    font-size: 1.2rem;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px #ff00ff;
  }
  
  .mobile-nav-link {
    display: block;
    padding: 12px 20px;
    margin-bottom: 8px;
    background: rgba(0, 255, 255, 0.05);
    border: 1px solid rgba(0, 255, 255, 0.3);
    color: #00ffff;
    text-decoration: none;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
  }
  
  .mobile-nav-link:hover,
  .mobile-nav-link:active {
    background: rgba(0, 255, 255, 0.2);
    border-color: #00ffff;
    transform: translateX(5px);
    color: #fff;
  }
  
  .mobile-nav-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: transparent;
    border: 2px solid #00ffff;
    border-radius: 50%;
    color: #00ffff;
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .mobile-nav-close:hover {
    background: rgba(0, 255, 255, 0.2);
    transform: rotate(90deg);
  }
  
  @media (max-width: 900px) {
    .footer-nav {
      display: none !important;
    }
    
    .hamburger-menu-btn {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    body {
      padding-bottom: 100px !important;
    }
  }
</style>
`;

const unifiedFooterHTML = `
  <!-- Desktop Footer Navigation -->
  <nav class="footer-nav" id="footer-nav">
    <button class="footer-btn" onclick="window.location.href='crew.html'" style="background: linear-gradient(90deg, #ffea3e, #ff00ff); color: #000; font-weight: bold;">🎯 FAM CARD</button>
    <button class="footer-btn" onclick="window.location.href='poster.html'">Operation Moon Vault</button>
    <button class="footer-btn" onclick="window.location.href='joboffer.html'">Don's Job Board</button>
    <button class="footer-btn" onclick="window.location.href='roadmap.html'">Roadmap</button>
    <button class="footer-btn" onclick="window.location.href='tokenomics.html'">Tokenomics</button>
    <button class="footer-btn" onclick="window.location.href='alpha.html'">Quetzalcoatl (ALPHA)</button>
    <button class="footer-btn" onclick="window.location.href='contact.html'">Contact</button>
    <button class="footer-btn dropup" tabindex="0">LORE ▲
      <div class="dropup-content">
        <a href="lore.html">Lore</a>
        <a href="codex.html">Codex</a>
        <a href="syndicate.html">Syndicate</a>
        <a href="don.html">Don's World</a>
        <a href="descent.html">The Descent</a>
        <a href="dossier_lobby.html">Dossier Lobby</a>
      </div>
    </button>
    <button class="footer-btn dropup" tabindex="0">Marketplace ▲
      <div class="dropup-content">
        <a href="marketplace.html">Marketplace</a>
        <a href="relics.html">Relics</a>
        <a href="mint.html">Mint</a>
      </div>
    </button>
    <button class="footer-btn" onclick="window.open('https://etherscan.io/address/0xa810f0E95d6fcC10842933D2cd0441437a005df7', '_blank')">Etherscan</button>
    <button class="footer-btn" onclick="window.open('https://solscan.io/token/4qbRKDirQKeXoSC8JkpRdK9uQj3wKQVTwa644N22rBPw', '_blank')">Solscan</button>
  </nav>
  
  <!-- Mobile Hamburger Menu Button -->
  <button class="hamburger-menu-btn" id="hamburgerMenuBtn" onclick="window.toggleMobileMenu()">
    <div class="hamburger-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
  
  <!-- Mobile Navigation Overlay -->
  <div class="mobile-nav-overlay" id="mobileNavOverlay">
    <button class="mobile-nav-close" onclick="window.toggleMobileMenu()">×</button>
    <div class="mobile-nav-content">
      <div class="mobile-nav-section">
        <h3 class="mobile-nav-title">Main Navigation</h3>
        <a href="index.html" class="mobile-nav-link">Home</a>
        <a href="crew.html" class="mobile-nav-link" style="background: linear-gradient(90deg, #ffea3e, #ff00ff); color: #000; font-weight: bold;">🎯 FAM CARD</a>
        <a href="poster.html" class="mobile-nav-link">Operation Moon Vault</a>
        <a href="joboffer.html" class="mobile-nav-link">Don's Job Board</a>
        <a href="roadmap.html" class="mobile-nav-link">Roadmap</a>
        <a href="tokenomics.html" class="mobile-nav-link">Tokenomics</a>
        <a href="alpha.html" class="mobile-nav-link">Quetzalcoatl (ALPHA)</a>
        <a href="contact.html" class="mobile-nav-link">Contact</a>
      </div>
      
      <div class="mobile-nav-section">
        <h3 class="mobile-nav-title">Lore</h3>
        <a href="lore.html" class="mobile-nav-link">Main Lore</a>
        <a href="codex.html" class="mobile-nav-link">Codex</a>
        <a href="syndicate.html" class="mobile-nav-link">Syndicate</a>
        <a href="don.html" class="mobile-nav-link">Don's World</a>
        <a href="descent.html" class="mobile-nav-link">The Descent</a>
        <a href="dossier_lobby.html" class="mobile-nav-link">Dossier Lobby</a>
      </div>
      
      <div class="mobile-nav-section">
        <h3 class="mobile-nav-title">Marketplace</h3>
        <a href="marketplace.html" class="mobile-nav-link">Marketplace</a>
        <a href="relics.html" class="mobile-nav-link">Relics</a>
        <a href="mint.html" class="mobile-nav-link">Mint</a>
      </div>
      
      <div class="mobile-nav-section">
        <h3 class="mobile-nav-title">External Links</h3>
        <a href="https://etherscan.io/address/0xa810f0E95d6fcC10842933D2cd0441437a005df7" target="_blank" class="mobile-nav-link">Etherscan</a>
        <a href="https://solscan.io/token/4qbRKDirQKeXoSC8JkpRdK9uQj3wKQVTwa644N22rBPw" target="_blank" class="mobile-nav-link">Solscan</a>
      </div>
    </div>
  </div>
`;

// Define toggleMobileMenu in global scope
window.toggleMobileMenu = function() {
  const hamburgerBtn = document.getElementById('hamburgerMenuBtn');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  
  if (hamburgerBtn && mobileOverlay) {
    hamburgerBtn.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (mobileOverlay.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
};

// Function to inject unified footer
function injectUnifiedFooter() {
  // Check if this is the descent.html page
  const isDescentPage = window.location.pathname.includes('descent.html');
  
  // For descent.html, wait for the video to end before showing footer
  if (isDescentPage) {
    const video = document.getElementById('sewerVideo');
    const forkArea = document.getElementById('fork-area');
    
    if (video && forkArea) {
      // Wait for fork area to become active
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.target.classList && mutation.target.classList.contains('active')) {
            // Add footer to fork area when it becomes active
            addFooterToElement(forkArea);
            observer.disconnect();
          }
        });
      });
      
      observer.observe(forkArea, { attributes: true, attributeFilter: ['class'] });
      return; // Don't add footer immediately
    }
  }
  
  // For all other pages, add footer normally
  addFooterToBody();
}

function addFooterToElement(parentElement) {
  // Remove any existing footers
  const existingFooters = document.querySelectorAll('.footer-nav, .footer, #unified-footer-container');
  existingFooters.forEach(footer => footer.remove());
  
  // Add styles if not already added
  if (!document.getElementById('unified-footer-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'unified-footer-styles';
    styleElement.innerHTML = unifiedFooterStyles;
    document.head.appendChild(styleElement);
  }
  
  // Add footer HTML to specified element
  const footerContainer = document.createElement('div');
  footerContainer.id = 'unified-footer-container';
  footerContainer.style.position = 'absolute';
  footerContainer.style.bottom = '0';
  footerContainer.style.left = '0';
  footerContainer.style.right = '0';
  footerContainer.innerHTML = unifiedFooterHTML;
  parentElement.appendChild(footerContainer);
  
  // Initialize mobile menu after adding footer
  setTimeout(initializeMobileMenu, 100);
}

function addFooterToBody() {
  // Remove any existing footers
  const existingFooters = document.querySelectorAll('.footer-nav, .footer, #unified-footer-container');
  existingFooters.forEach(footer => footer.remove());
  
  // Add styles if not already added
  if (!document.getElementById('unified-footer-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'unified-footer-styles';
    styleElement.innerHTML = unifiedFooterStyles;
    document.head.appendChild(styleElement);
  }
  
  // Ensure body has proper layout
  const currentBodyStyles = window.getComputedStyle(document.body);
  if (currentBodyStyles.display !== 'flex') {
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.minHeight = '100vh';
  }
  
  // Add footer HTML at the end of body with margin-top auto to push it to bottom
  const footerContainer = document.createElement('div');
  footerContainer.id = 'unified-footer-container';
  footerContainer.style.marginTop = 'auto';
  footerContainer.innerHTML = unifiedFooterHTML;
  document.body.appendChild(footerContainer);
  
  // Initialize mobile menu after adding footer
  setTimeout(initializeMobileMenu, 100);
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
  // Close menu when clicking a link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const mobileOverlay = document.getElementById('mobileNavOverlay');
      const hamburgerBtn = document.getElementById('hamburgerMenuBtn');
      if (mobileOverlay && hamburgerBtn && mobileOverlay.classList.contains('active')) {
        window.toggleMobileMenu();
      }
    });
  });
  
  // Close menu when clicking outside
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', function(e) {
      if (e.target === this) {
        window.toggleMobileMenu();
      }
    });
  }
}

// Auto-inject on load if this script is included
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    injectUnifiedFooter();
    setTimeout(initializeMobileMenu, 100); // Small delay to ensure DOM is ready
  });
} else {
  injectUnifiedFooter();
  setTimeout(initializeMobileMenu, 100);
}