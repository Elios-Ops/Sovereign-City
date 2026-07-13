const fs = require('fs');
const path = require('path');

// List of all HTML files to update
const htmlFiles = [
  'index.html', 'poster.html', 'moonvault.html', 'joboffer.html', 
  'roadmap.html', 'tokenomics.html', 'alpha.html', 'lore.html',
  'codex.html', 'crew.html', 'syndicate.html', 'don.html',
  'descent.html', 'dossier_lobby.html', 'marketplace.html', 'relics.html',
  'mint.html', 'vault1.html', 'vault2.html', 'scroll1.html',
  'scroll5.html', 'scroll6.html', 'scroll13.html', 'muskrats.html',
  'dossier_made.html', 'thefam.html', 'relic_machine.html', 'gate.html',
  'cellar.html'
];

// Footer HTML to inject
const footerHTML = `
  <!-- Unified Footer -->
  <script src="unified-footer.js"></script>
`;

// Process each file
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove existing footer nav if present
    content = content.replace(/<nav class="footer-nav"[\s\S]*?<\/nav>/gi, '');
    
    // Remove any existing footer divs with inline styles
    content = content.replace(/<div class="footer"[\s\S]*?<\/div>\s*<\/body>/gi, '</body>');
    
    // Add unified footer script before closing body tag
    if (!content.includes('unified-footer.js')) {
      content = content.replace('</body>', footerHTML + '\n</body>');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Updated ${file}`);
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\n✨ Footer unification complete!');