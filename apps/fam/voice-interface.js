// Voice Interface for FAM Card Viewer
// This file implements the voice interaction functionality

// Voice interface state
const voiceState = {
  isActive: false,
  isListening: false,
  recognition: null,
  synthesis: null,
  lastMessage: null,
  lastResponse: null,
  visualizerIntervalId: null,
  settings: {
    voiceType: 'synthetic',
    volume: 0.8,
    pitch: 1
  }
};

// Initialize voice interface
function initVoiceInterface() {
  console.log('Initializing voice interface...');
  
  // Setup voice recognition if available
  setupVoiceRecognition();
  
  // Setup voice synthesis if available
  setupVoiceSynthesis();
  
  // Create visualizer
  createVoiceVisualizer();
  
  // Setup event listeners
  setupVoiceEventListeners();
  
  // Load saved settings
  loadVoiceSettings();
  
  console.log('Voice interface initialized');
}

// Setup voice recognition
function setupVoiceRecognition() {
  // Check for browser support
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('Speech recognition not supported');
    return;
  }
  
  // Create recognition instance
  voiceState.recognition = new SpeechRecognition();
  
  // Configure recognition
  voiceState.recognition.continuous = false;
  voiceState.recognition.interimResults = false;
  voiceState.recognition.lang = 'en-US';
  
  // Setup recognition events
  voiceState.recognition.onstart = () => {
    console.log('Voice recognition started');
    voiceState.isListening = true;
    updateVoiceUI();
  };
  
  voiceState.recognition.onend = () => {
    console.log('Voice recognition ended');
    voiceState.isListening = false;
    updateVoiceUI();
  };
  
  voiceState.recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log('Voice recognition result:', transcript);
    
    // Update voice input field
    const voiceInput = document.getElementById('voice-input');
    if (voiceInput) {
      voiceInput.value = transcript;
    }
    
    // Process voice command
    sendVoiceMessage();
  };
  
  voiceState.recognition.onerror = (event) => {
    console.error('Voice recognition error:', event.error);
    voiceState.isListening = false;
    updateVoiceUI();
    
    // Show error notification
    showNotification(`Voice recognition error: ${event.error}`, 'error');
  };
}

// Setup voice synthesis
function setupVoiceSynthesis() {
  // Check for browser support
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not supported');
    return;
  }
  
  voiceState.synthesis = window.speechSynthesis;
}

// Create voice visualizer
function createVoiceVisualizer() {
  const voiceVisualizer = document.getElementById('voice-visualizer');
  if (!voiceVisualizer) return;
  
  // Clear existing visualizer
  voiceVisualizer.innerHTML = '';
  
  // Create animation bars
  for (let i = 0; i < 20; i++) {
    const bar = document.createElement('div');
    bar.className = 'voice-bar';
    bar.style.height = '5px';
    voiceVisualizer.appendChild(bar);
  }
}

// Setup voice event listeners
function setupVoiceEventListeners() {
  // Microphone button
  const microphoneBtn = document.getElementById('microphone-btn');
  if (microphoneBtn) {
    microphoneBtn.addEventListener('click', toggleVoiceInterface);
  }
  
  // Voice dialog close button
  const voiceDialogClose = document.getElementById('voice-dialog-close');
  if (voiceDialogClose) {
    voiceDialogClose.addEventListener('click', closeVoiceInterface);
  }
  
  // Voice send button
  const voiceSendBtn = document.getElementById('voice-send-btn');
  if (voiceSendBtn) {
    voiceSendBtn.addEventListener('click', sendVoiceMessage);
  }
  
  // Voice input enter key
  const voiceInput = document.getElementById('voice-input');
  if (voiceInput) {
    voiceInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendVoiceMessage();
      }
    });
  }
  
  // Voice listen button
  const voiceListenBtn = document.getElementById('voice-listen-btn');
  if (voiceListenBtn) {
    voiceListenBtn.addEventListener('click', startVoiceRecognition);
  }
  
  // Voice test button
  const testVoiceBtn = document.getElementById('test-voice-btn');
  if (testVoiceBtn) {
    testVoiceBtn.addEventListener('click', testVoice);
  }
  
  // Voice settings controls
  const voiceType = document.getElementById('voice-type');
  if (voiceType) {
    voiceType.addEventListener('change', () => {
      voiceState.settings.voiceType = voiceType.value;
      saveVoiceSettings();
    });
  }
  
  const voiceVolume = document.getElementById('voice-volume');
  if (voiceVolume) {
    voiceVolume.addEventListener('input', () => {
      voiceState.settings.volume = parseFloat(voiceVolume.value);
      saveVoiceSettings();
    });
  }
  
  const voicePitch = document.getElementById('voice-pitch');
  if (voicePitch) {
    voicePitch.addEventListener('input', () => {
      voiceState.settings.pitch = parseFloat(voicePitch.value);
      saveVoiceSettings();
    });
  }
}

// Toggle voice interface
function toggleVoiceInterface() {
  if (voiceState.isActive) {
    closeVoiceInterface();
  } else {
    openVoiceInterface();
  }
}

// Open voice interface
function openVoiceInterface() {
  const voiceDialog = document.getElementById('voice-dialog');
  if (!voiceDialog) return;
  
  // Show dialog
  voiceDialog.classList.add('active');
  
  // Update state
  voiceState.isActive = true;
  
  // Play activation sound
  playActivationSound();
  
  // Focus input
  const voiceInput = document.getElementById('voice-input');
  if (voiceInput) {
    voiceInput.focus();
  }
  
  // Show welcome message
  const voiceResponse = document.getElementById('voice-response');
  if (voiceResponse) {
    if (state.ledgerAI && state.ledgerAI.isConnected) {
      voiceResponse.textContent = 'Ledger-AI online. How can I assist you with your FAM card?';
    } else {
      voiceResponse.textContent = 'Ledger-AI offline. Basic voice commands are available.';
    }
  }
  
  // Start listening animation
  startVoiceVisualization();
  setTimeout(stopVoiceVisualization, 2000);
}

// Close voice interface
function closeVoiceInterface() {
  const voiceDialog = document.getElementById('voice-dialog');
  if (!voiceDialog) return;
  
  // Hide dialog
  voiceDialog.classList.remove('active');
  
  // Update state
  voiceState.isActive = false;
  
  // Stop listening if active
  if (voiceState.isListening && voiceState.recognition) {
    voiceState.recognition.stop();
  }
  
  // Stop visualization
  stopVoiceVisualization();
  
  // Play deactivation sound
  playDeactivationSound();
}

// Start voice recognition
function startVoiceRecognition() {
  // Check if recognition is available
  if (!voiceState.recognition) {
    showNotification('Voice recognition is not supported in this browser', 'error');
    return;
  }
  
  // Check if already listening
  if (voiceState.isListening) {
    voiceState.recognition.stop();
    return;
  }
  
  try {
    // Start recognition
    voiceState.recognition.start();
    
    // Start visualization
    startVoiceVisualization();
    
    // Show listening message
    const voiceResponse = document.getElementById('voice-response');
    if (voiceResponse) {
      voiceResponse.textContent = 'Listening...';
    }
    
    // Update UI
    updateVoiceUI();
  } catch (error) {
    console.error('Failed to start voice recognition:', error);
    showNotification('Failed to start voice recognition', 'error');
  }
}

// Send voice message
async function sendVoiceMessage() {
  const voiceInput = document.getElementById('voice-input');
  const voiceResponse = document.getElementById('voice-response');
  
  if (!voiceInput || !voiceResponse) return;
  
  const message = voiceInput.value.trim();
  if (!message) return;
  
  // Store last message
  voiceState.lastMessage = message;
  
  // Clear the input
  voiceInput.value = '';
  
  // Show "thinking" animation
  voiceResponse.textContent = 'Processing...';
  
  // Start visualizer animation
  startVoiceVisualization();
  
  try {
    // Process with Ledger-AI if connected
    let response;
    if (state.ledgerAI && state.ledgerAI.isConnected) {
      response = await processVoiceWithLedgerAI(message);
    } else {
      // Fallback to local processing
      response = processVoiceLocally(message);
    }
    
    // Update the response text
    voiceResponse.textContent = response;
    
    // Store last response
    voiceState.lastResponse = response;
    
    // Speak the response
    speakResponse(response);
    
    // Check for specific commands to execute
    executeVoiceCommand(message);
  } catch (error) {
    console.error('Error processing voice message:', error);
    voiceResponse.textContent = 'Sorry, there was an error processing your message.';
  } finally {
    // Stop visualizer animation after a short delay
    setTimeout(() => {
      stopVoiceVisualization();
    }, 1000);
  }
}

// Process voice with Ledger-AI
async function processVoiceWithLedgerAI(message) {
  // TODO: Implement actual Ledger-AI integration
  // For now, use simulated responses
  
  console.log('Processing voice with Ledger-AI:', message);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simple keyword-based responses
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return 'Hello, FAM Syndicate operative. How can I assist with your card today?';
  } else if (message.toLowerCase().includes('status')) {
    return 'All systems operational. Card integrity at 100%. No security breaches detected.';
  } else if (message.toLowerCase().includes('help')) {
    return 'I can assist with card customization, asset positioning, NFT management, and system status. What do you need help with?';
  } else if (message.toLowerCase().includes('flip')) {
    // Trigger card flip
    flipCard();
    return 'Card flipped.';
  } else if (message.toLowerCase().includes('color') || message.toLowerCase().includes('rgb')) {
    return 'RGB control system is available. Would you like me to change the color scheme?';
  } else if (message.toLowerCase().includes('assets')) {
    return 'Asset positioning system is online. You can add, remove, or reposition assets on your card.';
  } else if (message.toLowerCase().includes('nft')) {
    return 'NFT management system is available. Connect your wallet to access your NFTs.';
  } else {
    return 'I understand your request about "' + message + '". How would you like me to assist with that?';
  }
}

// Process voice locally
function processVoiceLocally(message) {
  console.log('Processing voice locally:', message);
  
  // Simple command processing
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('flip')) {
    // Trigger card flip
    flipCard();
    return 'Card flipped.';
  } else if (lowerMessage.includes('reset')) {
    return 'Reset command recognized. What would you like to reset?';
  } else if (lowerMessage.includes('save')) {
    // Trigger save
    saveCardState();
    return 'Card state saved.';
  } else if (lowerMessage.includes('help')) {
    return 'Available commands: flip card, reset position, save card, change color.';
  } else if (lowerMessage.includes('color') || lowerMessage.includes('rgb')) {
    // Try to extract color values
    const redMatch = lowerMessage.match(/red\s+(\d+)/);
    const greenMatch = lowerMessage.match(/green\s+(\d+)/);
    const blueMatch = lowerMessage.match(/blue\s+(\d+)/);
    
    if (redMatch || greenMatch || blueMatch) {
      const r = redMatch ? parseInt(redMatch[1]) : rgbState.r;
      const g = greenMatch ? parseInt(greenMatch[1]) : rgbState.g;
      const b = blueMatch ? parseInt(blueMatch[1]) : rgbState.b;
      
      // Update RGB if available
      if (window.rgbControls) {
        window.rgbControls.rgbState.r = Math.min(255, Math.max(0, r));
        window.rgbControls.rgbState.g = Math.min(255, Math.max(0, g));
        window.rgbControls.rgbState.b = Math.min(255, Math.max(0, b));
        window.rgbControls.updateRGBDisplay();
      }
      
      return `Color updated to RGB(${r}, ${g}, ${b}).`;
    } else if (lowerMessage.includes('preset')) {
      // Check for preset names
      for (const preset in rgbState.presets) {
        if (lowerMessage.includes(preset)) {
          if (window.rgbControls) {
            window.rgbControls.applyRGBPreset(preset);
          }
          return `Applied ${preset} color preset.`;
        }
      }
      return 'Available color presets: original, cyberpunk, neon, vaporwave, noir.';
    }
    
    return 'RGB control available. Try saying "red 255" or "color preset cyberpunk".';
  } else {
    return 'Command not recognized. Try "help" for available commands.';
  }
}

// Execute voice command
function executeVoiceCommand(message) {
  console.log('Executing voice command:', message);
  
  // Add specific command execution logic here
  const lowerMessage = message.toLowerCase();
  
  // Example commands
  if (lowerMessage.includes('flip')) {
    flipCard();
  } else if (lowerMessage.includes('zoom')) {
    // Check for zoom in/out
    if (lowerMessage.includes('in')) {
      zoomCard(1.2);
    } else if (lowerMessage.includes('out')) {
      zoomCard(0.8);
    }
  } else if (lowerMessage.includes('rotate')) {
    // Check for rotation direction
    if (lowerMessage.includes('left')) {
      rotateCard(-15);
    } else if (lowerMessage.includes('right')) {
      rotateCard(15);
    }
  }
}

// Flip card
function flipCard() {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Toggle flipped class
  cardCanvas.classList.toggle('flipped');
}

// Zoom card
function zoomCard(scale) {
  const cardContainer = document.querySelector('.card-container');
  if (!cardContainer) return;
  
  // Get current scale
  const currentTransform = window.getComputedStyle(cardContainer).transform;
  let currentScale = 1;
  
  if (currentTransform && currentTransform !== 'none') {
    const values = currentTransform.split('(')[1].split(')')[0].split(',');
    currentScale = Math.sqrt(values[0] * values[0] + values[1] * values[1]);
  }
  
  // Apply new scale
  const newScale = currentScale * scale;
  cardContainer.style.transform = `scale(${newScale})`;
}

// Rotate card
function rotateCard(angle) {
  const cardCanvas = document.getElementById('card-canvas');
  if (!cardCanvas) return;
  
  // Get current rotation
  const currentTransform = window.getComputedStyle(cardCanvas).transform;
  let currentRotation = 0;
  
  if (currentTransform && currentTransform !== 'none') {
    const values = currentTransform.split('(')[1].split(')')[0].split(',');
    currentRotation = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
  }
  
  // Apply new rotation
  const newRotation = currentRotation + angle;
  cardCanvas.style.transform = `rotateY(${newRotation}deg)`;
}

// Start voice visualization
function startVoiceVisualization() {
  // Stop any existing visualization
  stopVoiceVisualization();
  
  const voiceVisualizer = document.getElementById('voice-visualizer');
  if (!voiceVisualizer) return;
  
  // Start animation interval
  voiceState.visualizerIntervalId = setInterval(() => {
    // Animate each bar
    const bars = voiceVisualizer.querySelectorAll('.voice-bar');
    bars.forEach(bar => {
      const height = Math.floor(Math.random() * 30) + 5;
      bar.style.height = `${height}px`;
    });
  }, 100);
}

// Stop voice visualization
function stopVoiceVisualization() {
  if (voiceState.visualizerIntervalId) {
    clearInterval(voiceState.visualizerIntervalId);
    voiceState.visualizerIntervalId = null;
  }
  
  // Reset bar heights
  const voiceVisualizer = document.getElementById('voice-visualizer');
  if (voiceVisualizer) {
    const bars = voiceVisualizer.querySelectorAll('.voice-bar');
    bars.forEach(bar => {
      bar.style.height = '5px';
    });
  }
}

// Speak response
function speakResponse(text) {
  // Check if synthesis is available
  if (!voiceState.synthesis) {
    console.warn('Speech synthesis not available');
    return;
  }
  
  // Cancel any ongoing speech
  voiceState.synthesis.cancel();
  
  // Create utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply settings
  utterance.volume = voiceState.settings.volume;
  utterance.pitch = voiceState.settings.pitch;
  
  // Choose voice based on setting
  const voices = voiceState.synthesis.getVoices();
  
  if (voices.length > 0) {
    switch (voiceState.settings.voiceType) {
      case 'synthetic':
        // Find a synthetic-sounding voice
        const syntheticVoice = voices.find(voice => voice.name.includes('Google') || voice.name.includes('Microsoft'));
        if (syntheticVoice) utterance.voice = syntheticVoice;
        break;
      case 'robotic':
        // Use a very mechanical sounding voice if available
        utterance.pitch = 0.5;
        utterance.rate = 0.8;
        break;
      default:
        // Use default voice
        break;
    }
  }
  
  // Start speaking
  voiceState.synthesis.speak(utterance);
}

// Test voice
function testVoice() {
  const testInput = document.getElementById('test-voice-input');
  if (!testInput) return;
  
  const text = testInput.value.trim() || 'This is a test of the Ledger-AI voice interface.';
  
  // Speak the test text
  speakResponse(text);
  
  // Show visualization
  startVoiceVisualization();
  setTimeout(stopVoiceVisualization, 3000);
}

// Play activation sound
function playActivationSound() {
  // TODO: Implement sound playback
  console.log('Playing activation sound');
}

// Play deactivation sound
function playDeactivationSound() {
  // TODO: Implement sound playback
  console.log('Playing deactivation sound');
}

// Update voice UI
function updateVoiceUI() {
  // Update microphone button
  const microphoneBtn = document.getElementById('microphone-btn');
  if (microphoneBtn) {
    microphoneBtn.classList.toggle('active', voiceState.isActive);
  }
  
  // Update listen button
  const voiceListenBtn = document.getElementById('voice-listen-btn');
  if (voiceListenBtn) {
    voiceListenBtn.classList.toggle('listening', voiceState.isListening);
    voiceListenBtn.textContent = voiceState.isListening ? 'Stop' : 'Listen';
  }
}

// Save voice settings
function saveVoiceSettings() {
  try {
    localStorage.setItem('famCardVoiceSettings', JSON.stringify(voiceState.settings));
  } catch (error) {
    console.error('Failed to save voice settings:', error);
  }
}

// Load voice settings
function loadVoiceSettings() {
  try {
    const savedSettings = localStorage.getItem('famCardVoiceSettings');
    
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      
      // Update state
      voiceState.settings = Object.assign({}, voiceState.settings, settings);
      
      // Update UI elements
      const voiceType = document.getElementById('voice-type');
      const voiceVolume = document.getElementById('voice-volume');
      const voicePitch = document.getElementById('voice-pitch');
      
      if (voiceType) voiceType.value = voiceState.settings.voiceType;
      if (voiceVolume) voiceVolume.value = voiceState.settings.volume;
      if (voicePitch) voicePitch.value = voiceState.settings.pitch;
      
      console.log('Voice settings loaded');
    }
  } catch (error) {
    console.error('Failed to load voice settings:', error);
  }
}

// Export functions
window.voiceInterface = {
  initVoiceInterface,
  toggleVoiceInterface,
  startVoiceRecognition,
  speakResponse,
  voiceState
};
