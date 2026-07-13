# $MUSKRAT Token Pre-Launch Collection Setup

## Option 1: Smart Contract Presale (Most Secure & Professional)

### Deploy a Presale Contract
```solidity
// Basic Presale Contract Structure
contract MuskratPresale {
    address public owner;
    uint256 public rate = 100000; // tokens per ETH
    uint256 public hardCap = 100 ether;
    uint256 public softCap = 10 ether;
    uint256 public raised;
    
    mapping(address => uint256) public contributions;
    
    function buyTokens() public payable {
        require(msg.value >= 0.01 ether, "Min 0.01 ETH");
        require(raised + msg.value <= hardCap, "Hard cap reached");
        
        contributions[msg.sender] += msg.value;
        raised += msg.value;
    }
    
    function withdrawETH() public onlyOwner {
        require(raised >= softCap, "Soft cap not met");
        payable(owner).transfer(address(this).balance);
    }
}
```

### Deployment Platforms:
- **Remix IDE**: Deploy directly to Ethereum
- **Hardhat/Truffle**: Professional deployment
- **OpenZeppelin**: Use audited presale contracts

## Option 2: Launchpad Platforms (Easiest)

### Recommended Platforms:
1. **PinkSale** (https://www.pinksale.finance/)
   - Most popular, built-in KYC
   - Auto liquidity locking
   - ~2% fee

2. **DxSale** (https://dxsale.network/)
   - Multi-chain support
   - Automatic distribution
   - ~2-3% fee

3. **Unicrypt** (https://unicrypt.network/)
   - Trusted platform
   - Token vesting options
   - ~1-2% fee

4. **GemPad** (https://gempad.app/)
   - Lower fees
   - Good for smaller raises
   - ~1% fee

## Option 3: Direct Collection (Simple but Requires Trust)

### Multi-Signature Wallet Setup:
1. **Gnosis Safe** (Recommended)
   ```
   - Go to: https://gnosis-safe.io/
   - Create multi-sig wallet
   - Add 3-5 signers (team members)
   - Require 2-3 signatures for withdrawals
   ```

2. **Display Address on Website**
   ```html
   <!-- Add to mint.html -->
   <div class="presale-section">
     <h2>$MUSKRAT Pre-Sale</h2>
     <p>Send ETH to:</p>
     <div class="eth-address">
       <code>0xYOUR_MULTISIG_ADDRESS_HERE</code>
       <button onclick="copyAddress()">Copy</button>
     </div>
     <p>Rate: 100,000 $MUSKRAT per ETH</p>
     <p>Min: 0.01 ETH | Max: 5 ETH</p>
   </div>
   ```

## Option 4: Web3 Integration (Professional)

### Implement Direct Website Purchase:
```javascript
// Add to mint.html
async function buyMuskratTokens() {
  const web3 = new Web3(window.ethereum);
  const amount = document.getElementById('ethAmount').value;
  
  // Presale contract address
  const presaleAddress = "0xYOUR_PRESALE_CONTRACT";
  
  // Send ETH to presale contract
  const tx = {
    to: presaleAddress,
    value: web3.utils.toWei(amount, 'ether'),
    from: userWallet
  };
  
  await web3.eth.sendTransaction(tx);
}
```

## Option 5: Payment Processors (Fiat + Crypto)

### Services that Accept Both:
1. **Coinbase Commerce**
   - Accept ETH, BTC, USDC
   - Convert to fiat if needed
   - 1% fee

2. **NOWPayments**
   - 150+ cryptocurrencies
   - Auto-conversion
   - 0.5-1% fee

3. **CoinPayments**
   - Multiple currencies
   - Shopping cart integration
   - 0.5% fee

## Recommended Approach for MuskRats:

### Phase 1: Soft Launch (Immediate)
1. Set up **Gnosis Safe** multi-sig wallet
2. Add presale section to website
3. Manual tracking in spreadsheet

### Phase 2: Smart Contract (Week 1-2)
1. Deploy presale contract
2. Add Web3 integration to site
3. Automatic tracking

### Phase 3: DEX Launch (Month 1)
1. Add liquidity on Uniswap/PancakeSwap
2. Lock liquidity
3. Open trading

## Security Best Practices:

1. **Multi-Signature Required**
   - Never use single wallet
   - Require 2+ signatures
   - Use hardware wallets

2. **Transparent Tracking**
   ```javascript
   // Public presale tracker
   const presaleData = {
     raised: "45.5 ETH",
     contributors: 234,
     softCap: "25 ETH",
     hardCap: "100 ETH",
     endDate: "2025-02-28"
   };
   ```

3. **KYC/Audit**
   - Get team KYC'd (CertiK, KYC360)
   - Audit smart contracts
   - Publish audit reports

## Legal Compliance:

### Important Disclaimers:
```html
<!-- Add to presale page -->
<div class="legal-disclaimer">
  <h3>⚠️ Important Notice</h3>
  <ul>
    <li>$MUSKRAT is a utility token, not a security</li>
    <li>No guaranteed returns or profits</li>
    <li>Only invest what you can afford to lose</li>
    <li>Not available in restricted jurisdictions</li>
    <li>Must pass KYC/AML requirements</li>
  </ul>
</div>
```

### Terms & Conditions:
- Token distribution timeline
- Vesting schedules
- Refund policy
- Use of funds

## Quick Implementation Code:

```html
<!-- Add to mint.html or create presale.html -->
<div style="margin-top: 50px; padding: 40px; background: linear-gradient(135deg, rgba(255,234,62,0.1), rgba(0,255,255,0.1)); border: 3px solid #ffea3e; border-radius: 20px;">
  <h2 style="text-align: center; color: #ffea3e; text-shadow: 0 0 20px #ffea3e;">
    💰 $MUSKRAT TOKEN PRE-SALE 💰
  </h2>
  
  <div style="text-align: center; margin: 30px 0;">
    <p style="color: #00ffff; font-size: 1.3rem;">1 ETH = 100,000 $MUSKRAT</p>
    <p style="color: #ff00ff;">Min: 0.01 ETH | Max: 5 ETH per wallet</p>
  </div>
  
  <div style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 10px; margin: 20px 0;">
    <p style="color: #00ffff; text-align: center; margin-bottom: 15px;">Send ETH to:</p>
    <div style="background: #000; padding: 15px; border: 1px solid #00ffff; border-radius: 8px; font-family: monospace; color: #00ff00; text-align: center; word-break: break-all;">
      0xYOUR_MULTISIG_WALLET_HERE
    </div>
    <button onclick="copyPresaleAddress()" style="width: 100%; margin-top: 15px; padding: 12px; background: linear-gradient(90deg, #00ffff, #ffea3e); color: #000; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
      COPY ADDRESS
    </button>
  </div>
  
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 30px 0;">
    <div style="text-align: center; padding: 15px; background: rgba(0,255,255,0.1); border-radius: 10px;">
      <p style="color: #ffea3e;">Raised</p>
      <p style="color: #00ffff; font-size: 1.5rem; font-weight: bold;">23.5 / 100 ETH</p>
    </div>
    <div style="text-align: center; padding: 15px; background: rgba(255,0,255,0.1); border-radius: 10px;">
      <p style="color: #ffea3e;">Contributors</p>
      <p style="color: #ff00ff; font-size: 1.5rem; font-weight: bold;">156</p>
    </div>
  </div>
  
  <div style="text-align: center;">
    <button onclick="connectWalletForPresale()" style="padding: 15px 40px; background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000; border: none; border-radius: 10px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">
      CONNECT WALLET TO PARTICIPATE
    </button>
  </div>
  
  <p style="text-align: center; color: #888; font-size: 0.9rem; margin-top: 20px;">
    ⚠️ Always verify the address. Beware of scams. DYOR.
  </p>
</div>

<script>
function copyPresaleAddress() {
  navigator.clipboard.writeText('0xYOUR_MULTISIG_WALLET_HERE');
  alert('Presale address copied!');
}

async function connectWalletForPresale() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Now connected, can show purchase interface
      showPurchaseModal();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  } else {
    alert('Please install MetaMask to participate!');
  }
}
</script>
```

## Recommended Setup for MuskRats:

1. **Immediate**: Create Gnosis Safe multi-sig
2. **Day 1-3**: Add presale section to website
3. **Week 1**: Deploy basic presale contract
4. **Week 2**: Launch on PinkSale for credibility
5. **Month 1**: DEX listing with locked liquidity

This gives you multiple collection methods and builds trust progressively!