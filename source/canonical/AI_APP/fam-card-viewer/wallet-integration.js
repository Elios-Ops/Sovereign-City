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
    return parseFloat(balanceEth).toFixed(4);
  } catch (error) {
    console.error('Failed to get ETH balance:', error);
    return '0';
  }
}

// Get MUSKRAT token balance
async function getMuskratBalance(address) {
  if (!address || !window.web3 || !MUSKRAT_CONTRACT.address) return '0';
  
  try {
    // Create contract instance
    const contract = new window.web3.eth.Contract(
      MUSKRAT_CONTRACT.abi,
      MUSKRAT_CONTRACT.address
    );
    
    // Call balanceOf function
    const balance = await contract.methods.balanceOf(address).call();
    
    // Convert from token decimals (assuming 18 decimals like most ERC-20 tokens)
    const formattedBalance = window.web3.utils.fromWei(balance, 'ether');
    return parseFloat(formattedBalance).toFixed(2);
  } catch (error) {
    console.error('Failed to get MUSKRAT balance:', error);
    return '0';
  }
}

// Update network information
function updateNetworkInfo(chainId) {
  let network = 'Unknown';
  let isSupported = false;
  
  // Convert chainId to decimal if it's hex
  if (typeof chainId === 'string' && chainId.startsWith('0x')) {
    chainId = parseInt(chainId, 16);
  }
  
  // Identify common networks
  switch (chainId) {
    case 1:
      network = 'Ethereum Mainnet';
      isSupported = true;
      break;
    case 3:
      network = 'Ropsten Testnet';
      isSupported = true;
      break;
    case 4:
      network = 'Rinkeby Testnet';
      isSupported = true;
      break;
    case 5:
      network = 'Goerli Testnet';
      isSupported = true;
      break;
    case 42:
      network = 'Kovan Testnet';
      isSupported = true;
      break;
    case 56:
      network = 'Binance Smart Chain';
      isSupported = false;
      break;
    case 137:
      network = 'Polygon Mainnet';
      isSupported = false;
      break;
    default:
      network = `Unknown (${chainId})`;
      isSupported = false;
  }
  
  // Update wallet state with network info
  updateWalletStatus({
    network: {
      id: chainId,
      name: network,
      isSupported
    }
  });
  
  // Show warning if on unsupported network
  if (!isSupported && walletState.isConnected) {
    showNotification(`Connected to ${network}. This network is not supported. Please switch to Ethereum Mainnet.`, 'warning');
  }
}

// Format address for display
function formatAddress(address) {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Update wallet status
function updateWalletStatus(updates) {
  // Update wallet state
  Object.assign(walletState, updates);
  
  // Update UI
  updateWalletUI();
}

// Update wallet UI
function updateWalletUI() {
  // Update wallet status indicator
  const walletStatus = document.getElementById('wallet-status');
  if (walletStatus) {
    if (walletState.isConnected) {
      walletStatus.innerHTML = `
        <div class="status-indicator connected"></div>
        <span>${walletState.formattedAddress}</span>
      `;
    } else {
      walletStatus.innerHTML = `
        <div class="status-indicator disconnected"></div>
        <span>Wallet Disconnected</span>
      `;
    }
  }
  
  // Update connect wallet button
  const connectWalletBtn = document.getElementById('connect-wallet-btn');
  if (connectWalletBtn) {
    connectWalletBtn.textContent = walletState.isConnected ? 'Disconnect Wallet' : 'Connect Wallet';
    connectWalletBtn.classList.toggle('connected', walletState.isConnected);
  }
  
  // Update balances display
  const ethBalance = document.getElementById('eth-balance');
  const muskratBalance = document.getElementById('muskrat-balance');
  
  if (ethBalance) {
    ethBalance.textContent = walletState.isConnected ? `${walletState.ethBalance} ETH` : '-';
  }
  
  if (muskratBalance) {
    muskratBalance.textContent = walletState.isConnected ? `${walletState.muskratBalance} $MUSKRAT` : '-';
  }
  
  // Update network display
  const networkDisplay = document.getElementById('network-display');
  if (networkDisplay && walletState.network) {
    networkDisplay.textContent = walletState.network.name;
    networkDisplay.classList.toggle('unsupported', !walletState.network.isSupported);
  }
  
  // Update NFT sections
  const nftSections = document.querySelectorAll('.nft-section');
  nftSections.forEach(section => {
    section.classList.toggle('wallet-connected', walletState.isConnected);
  });
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

// Send transaction to contract
async function sendTransaction(contractAddress, abi, method, params = [], value = '0') {
  if (!walletState.isConnected || !window.web3) {
    showNotification('Wallet not connected', 'error');
    return null;
  }
  
  try {
    // Create contract instance
    const contract = new window.web3.eth.Contract(abi, contractAddress);
    
    // Estimate gas
    const gasEstimate = await contract.methods[method](...params).estimateGas({
      from: walletState.address,
      value: window.web3.utils.toWei(value, 'ether')
    });
    
    // Send transaction
    const result = await contract.methods[method](...params).send({
      from: walletState.address,
      gas: Math.floor(gasEstimate * 1.2), // Add 20% buffer
      value: window.web3.utils.toWei(value, 'ether')
    });
    
    // Show success notification
    showNotification('Transaction sent successfully', 'success');
    
    return result;
  } catch (error) {
    console.error('Transaction failed:', error);
    
    // Show error notification
    showNotification(`Transaction failed: ${error.message}`, 'error');
    
    return null;
  }
}

// Check if user owns NFT
async function checkNFTOwnership(contractAddress, tokenId) {
  if (!walletState.isConnected || !window.web3) {
    return false;
  }
  
  try {
    // Create contract instance with minimal ERC-721 ABI
    const contract = new window.web3.eth.Contract([
      {
        "constant": true,
        "inputs": [{"name": "_tokenId", "type": "uint256"}],
        "name": "ownerOf",
        "outputs": [{"name": "owner", "type": "address"}],
        "type": "function"
      }
    ], contractAddress);
    
    // Call ownerOf function
    const owner = await contract.methods.ownerOf(tokenId).call();
    
    // Check if current wallet is the owner
    return owner.toLowerCase() === walletState.address.toLowerCase();
  } catch (error) {
    console.error('Failed to check NFT ownership:', error);
    return false;
  }
}

// Export functions
window.walletIntegration = {
  initWalletIntegration,
  connectWallet,
  disconnectWallet,
  refreshBalances,
  sendTransaction,
  checkNFTOwnership,
  walletState
};
