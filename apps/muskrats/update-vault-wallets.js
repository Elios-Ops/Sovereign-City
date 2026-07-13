const fs = require('fs');
const path = require('path');

// Multi-sig wallet address
const MARKETPLACE_WALLET = '0x223C2534ab0E451279F432F0a1B2756042888C06';

// Vault files to update
const vaultFiles = ['vault2.html', 'vault3.html', 'vault4.html', 'vault5.html', 'vault6.html'];

vaultFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add Web3.js script before </head>
    if (!content.includes('web3.min.js')) {
      content = content.replace(
        '</head>',
        `  <!-- Web3.js for wallet integration -->
  <script src="https://cdn.jsdelivr.net/npm/web3@1.9.0/dist/web3.min.js"></script>
</head>`
      );
    }
    
    // Update rentSelected function to include wallet integration
    const rentFunctionRegex = /function rentSelected\(\)[\s\S]*?^\s{4}\}/m;
    
    if (content.match(rentFunctionRegex)) {
      // Determine vault type from filename
      let vaultName = 'Items';
      if (file.includes('2')) vaultName = 'Bloodborn';
      else if (file.includes('3')) vaultName = 'DGX-Spark Brains';
      else if (file.includes('4')) vaultName = 'Ancient Relics';
      else if (file.includes('5')) vaultName = 'Duffle Bags';
      else if (file.includes('6')) vaultName = 'Getaway Vehicles';
      
      const newFunction = `    async function rentSelected() {
      if (selectedItems.size === 0) {
        alert('Please select at least one item to rent.');
        return;
      }
      
      const itemNames = [...selectedItems].map(item => item.name).join(', ');
      const ethTotal = (selectedItems.size * ETH_PRICE).toFixed(3);
      const muskratTotal = selectedItems.size * MUSKRAT_PRICE;
      
      const message = \`RENTAL CONFIRMATION\\n\\n${vaultName}: \${itemNames}\\n\\nTotal Cost:\\n• \${ethTotal} ETH\\nOR\\n• \${muskratTotal} $MUSKRAT\\n\\nRental Period: 7 Days\\n\\nThese items will be added to your FAM Card slots.\`;
      
      if (confirm(message)) {
        // Multi-sig wallet address for marketplace purchases
        const MARKETPLACE_WALLET = '${MARKETPLACE_WALLET}';
        
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
          try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            
            // Convert ETH to Wei
            const valueInWei = Web3.utils.toWei(ethTotal, 'ether');
            
            // Send transaction
            const transactionParameters = {
              to: MARKETPLACE_WALLET,
              from: account,
              value: Web3.utils.toHex(valueInWei),
              data: Web3.utils.utf8ToHex(\`${vaultName} Rental: \${itemNames}\`)
            };
            
            const txHash = await window.ethereum.request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
            });
            
            alert(\`🎉 Rental Successful!\\n\\nTransaction Hash: \${txHash}\\n\\nYour ${vaultName} have been added to your FAM Card.\\n\\nThey will automatically return to the vault after 7 days.\`);
            
            // Store rental info
            const rentals = JSON.parse(localStorage.getItem('muskrat_rentals') || '[]');
            rentals.push({
              vault: '${vaultName}',
              items: [...selectedItems],
              timestamp: new Date().toISOString(),
              duration: '7 days',
              txHash: txHash,
              ethAmount: ethTotal
            });
            localStorage.setItem('muskrat_rentals', JSON.stringify(rentals));
            
            // Reset selection
            document.querySelectorAll('.nft-item.selected').forEach(el => el.classList.remove('selected'));
            selectedItems.clear();
            updateSummary();
            
          } catch (error) {
            console.error('Transaction failed:', error);
            alert('Transaction failed. Please try again.');
          }
        } else {
          // Fallback for users without MetaMask
          alert(\`To complete your rental, please send \${ethTotal} ETH to:\\n\\n\${MARKETPLACE_WALLET}\\n\\nInclude "${vaultName} Rental" in the transaction memo.\`);
        }
      }
    }`;
      
      content = content.replace(rentFunctionRegex, newFunction);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`⚠️  ${file} not found`);
  }
});

console.log('\n✨ All vault files updated with multi-sig wallet integration!');
console.log(`💰 Marketplace wallet: ${MARKETPLACE_WALLET}`);