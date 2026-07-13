// MuskRat AI Assistant - Include this on any page
// Usage: <script src="muskrat-assistant.js"></script>

(function() {
  // Create and inject the assistant HTML
  const assistantHTML = `
    <div class="muskrat-chat-widget">
      <button class="muskrat-chat-toggle" id="muskratChatToggle">
        <span class="muskrat-chat-icon">🐀</span>
      </button>
      
      <div class="muskrat-chat-container" id="muskratChatContainer">
        <div class="muskrat-chat-header">
          <div class="muskrat-chat-title">
            <span>🐀</span>
            <span>MuskRat AI</span>
          </div>
          <button class="muskrat-chat-close" id="muskratChatClose">×</button>
        </div>
        
        <div class="muskrat-chat-messages" id="muskratChatMessages">
          <div class="muskrat-message muskrat-bot">
            <div class="muskrat-message-bubble">
              Welcome to the sewers! 🐀 I'm your MuskRat guide. Ask me anything!
            </div>
          </div>
        </div>
        
        <div class="muskrat-quick-actions">
          <button class="muskrat-quick-btn" data-message="How do I mint?">Minting</button>
          <button class="muskrat-quick-btn" data-message="What is FAM Card?">FAM Card</button>
          <button class="muskrat-quick-btn" data-message="Explain vaults">Vaults</button>
        </div>
        
        <div class="muskrat-chat-input-container">
          <input type="text" class="muskrat-chat-input" id="muskratChatInput" placeholder="Ask about MuskRats...">
          <button class="muskrat-chat-send" id="muskratChatSend">Send</button>
        </div>
      </div>
    </div>
  `;
  
  // Create and inject styles
  const assistantStyles = `
    <style>
      .muskrat-chat-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        font-family: 'Courier New', monospace;
      }
      
      .muskrat-chat-toggle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00ffff, #ff00ff);
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 255, 255, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        animation: muskrat-pulse 2s infinite;
      }
      
      @keyframes muskrat-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .muskrat-chat-toggle:hover {
        transform: scale(1.1);
      }
      
      .muskrat-chat-icon {
        font-size: 30px;
      }
      
      .muskrat-chat-container {
        display: none;
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 380px;
        height: 500px;
        background: rgba(10, 10, 20, 0.98);
        border: 2px solid #00ffff;
        border-radius: 20px;
        box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
        overflow: hidden;
        flex-direction: column;
      }
      
      .muskrat-chat-container.active {
        display: flex;
      }
      
      .muskrat-chat-header {
        background: linear-gradient(90deg, #00ffff, #ff00ff);
        padding: 15px;
        color: #000;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .muskrat-chat-title {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .muskrat-chat-close {
        background: none;
        border: none;
        color: #000;
        font-size: 24px;
        cursor: pointer;
      }
      
      .muskrat-chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: rgba(0, 0, 0, 0.5);
      }
      
      .muskrat-message {
        margin-bottom: 15px;
      }
      
      .muskrat-message.muskrat-user {
        text-align: right;
      }
      
      .muskrat-message.muskrat-bot {
        text-align: left;
      }
      
      .muskrat-message-bubble {
        display: inline-block;
        max-width: 80%;
        padding: 10px 15px;
        border-radius: 15px;
        word-wrap: break-word;
      }
      
      .muskrat-user .muskrat-message-bubble {
        background: linear-gradient(135deg, #00ffff, #00ff00);
        color: #000;
      }
      
      .muskrat-bot .muskrat-message-bubble {
        background: rgba(255, 0, 255, 0.2);
        color: #00ffff;
        border: 1px solid #ff00ff;
      }
      
      .muskrat-quick-actions {
        padding: 10px;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        gap: 5px;
        justify-content: center;
      }
      
      .muskrat-quick-btn {
        padding: 5px 10px;
        background: rgba(255, 234, 62, 0.1);
        border: 1px solid #ffea3e;
        border-radius: 15px;
        color: #ffea3e;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .muskrat-quick-btn:hover {
        background: rgba(255, 234, 62, 0.3);
      }
      
      .muskrat-chat-input-container {
        padding: 15px;
        background: rgba(0, 0, 0, 0.8);
        border-top: 1px solid #00ffff;
        display: flex;
        gap: 10px;
      }
      
      .muskrat-chat-input {
        flex: 1;
        padding: 10px;
        background: rgba(0, 255, 255, 0.05);
        border: 1px solid #00ffff;
        border-radius: 25px;
        color: #00ffff;
        font-family: inherit;
        font-size: 14px;
        outline: none;
      }
      
      .muskrat-chat-send {
        padding: 10px 20px;
        background: linear-gradient(90deg, #00ffff, #ff00ff);
        color: #000;
        border: none;
        border-radius: 25px;
        font-weight: bold;
        cursor: pointer;
      }
      
      @media (max-width: 768px) {
        .muskrat-chat-container {
          width: calc(100vw - 40px);
          height: calc(100vh - 150px);
          right: 20px;
          left: 20px;
        }
      }
    </style>
  `;
  
  // Knowledge base
  const responses = {
    'mint': 'To mint: 1) Connect wallet 2) Choose NFT type 3) Select quantity 4) Confirm transaction. Prices: MuskRats 0.033 ETH, F.A.M. Card 0.13-0.15 ETH',
    'fam': 'F.A.M. Card is elite membership with 33 crew slots, vault access, job participation, and enhanced rewards. Price: 0.13-0.15 ETH',
    'vault': '6 Vaults available for rentals: Ancient Relics, Bloodborn, DGX Spark-Brain, Glitchborn, Duffle Bag Items, Getaway Vehicles. Rent for 0.01 ETH or 500 $MUSKRAT',
    'crew': 'Build your crew: Boss (1), Underboss (2), Made Man (2), Handler (4), Contractor (8), Associate (16). Total 33 slots on F.A.M. Card',
    'job': 'Complete jobs to earn ETH! Accept missions from Don\'s Job Board, use your NFTs and items to boost rewards',
    'token': '$MUSKRAT: 1B supply, used for rentals, marketplace, governance, staking. Powers the entire ecosystem!',
    'help': 'I can help with: Minting, F.A.M. Cards, Vaults, Crew Building, Jobs, Tokenomics. What would you like to know?'
  };
  
  // Initialize when DOM is ready
  function initAssistant() {
    // Inject styles and HTML
    document.head.insertAdjacentHTML('beforeend', assistantStyles);
    document.body.insertAdjacentHTML('beforeend', assistantHTML);
    
    // Get elements
    const toggle = document.getElementById('muskratChatToggle');
    const container = document.getElementById('muskratChatContainer');
    const closeBtn = document.getElementById('muskratChatClose');
    const input = document.getElementById('muskratChatInput');
    const sendBtn = document.getElementById('muskratChatSend');
    const messages = document.getElementById('muskratChatMessages');
    const quickBtns = document.querySelectorAll('.muskrat-quick-btn');
    
    // Toggle chat
    toggle.addEventListener('click', () => {
      container.classList.toggle('active');
      if (container.classList.contains('active')) {
        input.focus();
      }
    });
    
    closeBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
    
    // Send message
    function sendMessage() {
      const message = input.value.trim();
      if (!message) return;
      
      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'muskrat-message muskrat-user';
      userMsg.innerHTML = `<div class="muskrat-message-bubble">${message}</div>`;
      messages.appendChild(userMsg);
      
      input.value = '';
      
      // Generate response
      setTimeout(() => {
        const response = getResponse(message);
        const botMsg = document.createElement('div');
        botMsg.className = 'muskrat-message muskrat-bot';
        botMsg.innerHTML = `<div class="muskrat-message-bubble">${response}</div>`;
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
      }, 500);
      
      messages.scrollTop = messages.scrollHeight;
    }
    
    // Get AI response
    function getResponse(message) {
      const lower = message.toLowerCase();
      
      for (const key in responses) {
        if (lower.includes(key)) {
          return responses[key];
        }
      }
      
      // Check current page context
      const path = window.location.pathname;
      if (path.includes('mint')) {
        return 'You\'re on the mint page! Connect your wallet and choose your NFT to get started.';
      }
      if (path.includes('crew')) {
        return 'This is the F.A.M. Card page! Build your crew of 33 members here.';
      }
      if (path.includes('vault')) {
        return 'You\'re viewing a vault! Rent items here to boost your crew\'s abilities.';
      }
      
      return 'I can help you navigate MuskRats! Ask about minting, F.A.M. Cards, vaults, or crew building.';
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
    
    // Quick buttons
    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        input.value = btn.dataset.message;
        sendMessage();
      });
    });
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistant);
  } else {
    initAssistant();
  }
})();