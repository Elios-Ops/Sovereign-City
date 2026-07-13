const fs = require('fs');
const path = require('path');

// List of all HTML files to fix
const htmlFiles = [
  'index.html', 'poster.html', 'moonvault.html', 'joboffer.html', 
  'roadmap.html', 'tokenomics.html', 'alpha.html', 'lore.html',
  'codex.html', 'crew.html', 'syndicate.html', 'don.html',
  'descent.html', 'dossier_lobby.html', 'marketplace.html', 'relics.html',
  'mint.html', 'vault1.html', 'vault2.html', 'scroll1.html',
  'scroll5.html', 'scroll6.html', 'scroll13.html', 'muskrats.html',
  'dossier_made.html', 'thefam.html', 'relic_machine.html', 'gate.html',
  'cellar.html', 'contact.html'
];

// Process each file
htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Remove all inline footer styles (between <style> tags)
    content = content.replace(/\.footer-nav\s*\{[^}]*\}/g, (match) => {
      if (match.includes('position:') || match.includes('bottom:') || match.includes('width:')) {
        modified = true;
        return '/* Footer styles removed - using unified footer */';
      }
      return match;
    });
    
    // Remove footer button styles
    content = content.replace(/\.footer-btn[^{]*\{[^}]*\}/g, (match) => {
      if (!match.includes('.gameplay-float')) {
        modified = true;
        return '';
      }
      return match;
    });
    
    // Remove dropup styles
    content = content.replace(/\.dropup-content[^{]*\{[^}]*\}/g, () => {
      modified = true;
      return '';
    });
    
    // Remove any existing footer HTML elements
    content = content.replace(/<nav class="footer-nav"[^>]*>[\s\S]*?<\/nav>/gi, '');
    content = content.replace(/<div class="footer"[^>]*>[\s\S]*?<\/div>\s*(?=<\/body>|<script)/gi, '');
    
    // Special handling for descent.html - don't modify it much
    if (file === 'descent.html') {
      // Just ensure the unified footer script is included
      if (!content.includes('unified-footer.js')) {
        content = content.replace('</body>', '\n  <!-- Unified Footer -->\n  <script src="unified-footer.js"></script>\n</body>');
        modified = true;
      }
    } else {
      // For all other pages, ensure proper body structure
      // Check if body has flex layout
      if (!content.includes('body {') || !content.includes('display: flex')) {
        // Add or update body styles to ensure proper layout
        const bodyStyleRegex = /body\s*\{([^}]*)\}/;
        if (bodyStyleRegex.test(content)) {
          content = content.replace(bodyStyleRegex, (match, styles) => {
            if (!styles.includes('display: flex')) {
              return `body {${styles}
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }`;
            }
            return match;
          });
          modified = true;
        }
      }
      
      // Ensure unified footer script is included
      if (!content.includes('unified-footer.js')) {
        content = content.replace('</body>', '\n  <!-- Unified Footer -->\n  <script src="unified-footer.js"></script>\n</body>');
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Fixed ${file}`);
    } else {
      console.log(`○ ${file} - no changes needed`);
    }
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\n✨ Footer fixes complete!');