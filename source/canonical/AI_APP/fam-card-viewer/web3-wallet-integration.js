// Web3 Wallet Integration for FAM Card Viewer
// This file implements the wallet connection and interaction functionality

// Wallet state
const walletState = {
  address: null,
  formattedAddress: null,
  isConnected: false,
  ethBalance: null,
  muskratBalance: null,
  error: null,
  network: null
};

// MUSKRAT token contract information
const MUSKRAT_CONTRACT = {
  address: '0x1234567890123456789012345678901234567890', // Placeholder, replace with actual contract address
  abi: [
    // ERC-20 standard functions
    {
      "constant": true,
      "inputs": [{"name": "_owner", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"name": "balance", "type": "uint256"}],
      "type": "function"
    }
  ]
};

// Initialize wallet integration
function initWalletIntegration() {
  console.log('Initializing Web3 wallet integration...');
  
  // Check for Web3 injection
  checkWeb3Provider();
  
  // Setup connect wallet button
  setupWalletButton();
  
  // Check for previous connection
  checkPreviousConnection();
  
  console.log('Web3 wallet integration initialized');
}

// Check for Web3 provider
function checkWeb3Provider() {
  // Check for modern providers (MetaMask, etc.)
  if (window.ethereum) {
    console.log('Modern Web3 provider detected');
    
    // Setup provider events
    setupProviderEvents();
    
    // Create Web3 instance
    window.web3 = new Web3(window.ethereum);
  } 
  // Check for legacy providers
  else if (window.web3) {
    console.log('Legacy Web3 provider detected');
    window.web3 = new Web3(window.web3.currentProvider);
  } 
  // No provider found
  else {
    console.warn('No Web3 provider detected');
    updateWalletStatus({
      isConnected: false,
      error: 'No Web3 provider detected. Please install MetaMask or use a Web3-enabled browser.'
    });
  }
}

// Setup provider events
function setupProviderEvents() {
  if (!window.ethereum) return;
  
  // Account changed event
  window.ethereum.on('accountsChanged', accounts => {
    console.log('Accounts changed:', accounts);
    
    if (accounts.length === 0) {
      // User disconnected
      disconnectWallet();
    } else {
      // Account switched
      const account = accounts[0];
      updateWalletStatus({
        address: account,
        formattedAddress: formatAddress(account),
        isConnected: true
      });
      
      // Update balances
      refreshBalances(account);
    }
  });
  
  // Chain changed event
  window.ethereum.on('chainChanged', chainId => {
    console.log('Chain changed:', chainId);
    
    // Update network information
    updateNetworkInfo(chainId);
    
    // Refresh balances for current account
    if (walletState.address) {
      refreshBalances(walletState.address);
    }
  });
  
  // Disconnect event
  window.ethereum.on('disconnect', error => {
    console.log('Provider disconnected:', error);
    disconnectWallet();
  });
}

// Setup connect wallet button
function setupWalletButton() {
  const connectWalletBtn = document.getElementById('connect-wallet-btn');
  if (!connectWalletBtn) return;
  
  connectWalletBtn.addEventListener('click', async () => {
    if (walletState.isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  });
}

// Connect wallet
async function connectWallet() {
  console.log('Connecting wallet...');
  
  // Check if Web3 is available
  if (!window.ethereum) {
    showNotification('No Web3 provider detected. Please install MetaMask or use a Web3-enabled browser.', 'error');
    return false;
  }
  
  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    if (accounts.length === 0) {
      throw new Error('No accounts found');
    }
    
    // Get primary account
    const account = accounts[0];
    
    // Format account for display
    const formattedAccount = formatAddress(account);
    
    // Update state
    updateWalletStatus({
      address: account,
      formattedAddress: formattedAccount,
      isConnected: true,
      error: null
    });
    
    // Get chain ID
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    updateNetworkInfo(chainId);
    
    // Get balances
    await refreshBalances(account);
    
    // Save connection status
    saveConnectionStatus(true, account);
    
    // Show notification
    showNotification('Wallet connected successfully', 'success');
    
    // Load owned NFTs if available
    if (window.nftSlotSystem && window.nftSlotSystem.loadOwnedNFTs) {
      window.nftSlotSystem.loadOwnedNFTs(account);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    
    // Update state to reflect failure
    updateWalletStatus({
      address: null,
      formattedAddress: null,
      isConnected: false,
      ethBalance: null,
      muskratBalance: null,
      error: error.message
    });
    
    // Show notification
    showNotification(`Failed to connect wallet: ${error.message}`, 'error');
    
    return false;
  }
}

// Disconnect wallet
function disconnectWallet() {
  console.log('Disconnecting wallet...');
  
  // Update state
  updateWalletStatus({
    address: null,
    formattedAddress: null,
    isConnected: false,
    ethBalance: null,
    muskratBalance: null,
    error: null
  });
  
  // Save connection status
  saveConnectionStatus(false, null);
  
  // Show notification
  showNotification('Wallet disconnected', 'info');
}

// Check for previous connection
function checkPreviousConnection() {
  try {
    const savedConnection = localStorage.getItem('famCardWalletConnection');
    
    if (savedConnection) {
      const { isConnected, address } = JSON.parse(savedConnection);
      
      if (isConnected && address) {
        // Attempt to reconnect
        connectWallet().catch(error => {
          console.warn('Failed to reconnect wallet:', error);
        });
      }
    }
  } catch (error) {
    console.error('Failed to check previous connection:', error);
  }
}

// Refresh balances
async function refreshBalances(address) {
  if (!address || !window.web3) return;
  
  try {
    // Get ETH balance
    const ethBalance = await getEthBalance(address);
    
    // Get MUSKRAT token balance
    let muskratBalance = '0';
    try {
      muskratBalance = await getMuskratBalance(address);
    } catch (error) {
      console.warn('Could not fetch MUSKRAT balance:', error);
    }
    
    // Update state
    updateWalletStatus({
      ethBalance,
      muskratBalance
    });
  } catch (error) {
    console.error('Failed to refresh balances:', error);
    showNotification('Failed to update wallet balances', 'error');
  }
}

// Get ETH balance
async function getEthBalance(address) {
  if (!address || !window.web3) return '0';
  
  try {
    const balanceWei = await window.web3.eth.getBalance(address);
    const balanceEth = window.web3.utils.fromWei(balanceWei, 'ether');
    return balanceEth;
  } catch (error) {
    console.error('Failed to get ETH balance:', error);
    return '0';
  }
}

// Get MUSKRAT token balance
async function getMuskratBalance(address) {
  if (!address || !window.web3) return '0';
  
  try {
    // Create contract instance
    const contract = new window.web3.eth.Contract(
      MUSKRAT_CONTRACT.abi,
      MUSKRAT_CONTRACT.address
    );
    
    // Call balanceOf function
    const balanceWei = await contract.methods.balanceOf(address).call();
    const balanceToken = window.web3.utils.fromWei(balanceWei, 'ether');
    return balanceToken;
  } catch (error) {
    console.error('Failed to get MUSKRAT balance:', error);
    return '0';
  }
}

// Update network information
function updateNetworkInfo(chainId) {
  let network = 'Unknown';
  let isSupported = false;
  
  // Known networks
  switch (chainId) {
    case '0x1':
      network = 'Ethereum Mainnet';
      isSupported = true;
      break;
    case '0x5':
      network = 'Goerli Testnet';
      isSupported = true;
      break;
    case '0xaa36a7':
      network = 'Sepolia Testnet';
      isSupported = true;
      break;
    case '0x89':
      network = 'Polygon';
      isSupported = true;
      break;
    default:
      network = `Unknown (${chainId})`;
      isSupported = false;
  }
  
  // Update state
  updateWalletStatus({
    network: {
      chainId,
      name: network,
      isSupported
    }
  });
  
  // Show warning if network is not supported
  if (!isSupported && walletState.isConnected) {
    showNotification(`Network not supported: ${network}. Please switch to Ethereum Mainnet.`, 'warning');
  }
}

// Format address for display
function formatAddress(address) {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Update wallet status in UI
function updateWalletStatus(updates) {
  // Update state
  Object.assign(walletState, updates);
  
  // Update UI elements
  updateWalletUI();
}

// Update wallet UI
function updateWalletUI() {
  // Wallet status indicator
  const walletStatus = document.getElementById('wallet-status');
  if (walletStatus) {
    if (walletState.isConnected) {
      walletStatus.innerHTML = `
        <div class="status-indicator connected"></div>
        <span>${walletState.formattedAddress || 'Connected'}</span>
      `;
    } else {
      walletStatus.innerHTML = `
        <div class="status-indicator disconnected"></div>
        <span>Wallet Disconnected</span>
      `;
    }
  }
  
  // Connect/disconnect button
  const connectWalletBtn = document.getElementById('connect-wallet-btn');
  if (connectWalletBtn) {
    connectWalletBtn.textContent = walletState.isConnected ? 'Disconnect' : 'Connect Wallet';
    connectWalletBtn.classList.toggle('connected', walletState.isConnected);
  }
  
  // Balances display
  const ethBalanceElement = document.getElementById('eth-balance');
  if (ethBalanceElement && walletState.ethBalance) {
    ethBalanceElement.textContent = `${parseFloat(walletState.ethBalance).toFixed(4)} ETH`;
  }
  
  const muskratBalanceElement = document.getElementById('muskrat-balance');
  if (muskratBalanceElement && walletState.muskratBalance) {
    muskratBalanceElement.textContent = `${parseFloat(walletState.muskratBalance).toFixed(2)} $MUSKRAT`;
  }
  
  // Network display
  const networkElement = document.getElementById('network-name');
  if (networkElement && walletState.network) {
    networkElement.textContent = walletState.network.name;
    networkElement.classList.toggle('unsupported', !walletState.network.isSupported);
  }
  
  // Update state in main application state
  if (window.state) {
    window.state.wallet = {
      address: walletState.address,
      formattedAddress: walletState.formattedAddress,
      isConnected: walletState.isConnected,
      ethBalance: walletState.ethBalance,
      muskratBalance: walletState.muskratBalance,
      network: walletState.network
    };
  }
}

// Save connection status to localStorage
function saveConnectionStatus(isConnected, address) {
  try {
    localStorage.setItem('famCardWalletConnection', JSON.stringify({
      isConnected,
      address
    }));
  } catch (error) {
    console.error('Failed to save connection status:', error);
  }
}

// Export functions
window.walletIntegration = {
  initWalletIntegration,
  connectWallet,
  disconnectWallet,
  refreshBalances,
  walletState
};
