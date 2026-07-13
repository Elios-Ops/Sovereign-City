# 🚨 URGENT: MuskRats Backend Setup for Tomorrow's Launch

## Account: muskratsio@gmail.com

### Step 1: Gmail App Password (5 minutes)
1. Sign in to muskratsio@gmail.com
2. Go to: https://myaccount.google.com/security
3. Enable 2-Factor Authentication if not already enabled
4. Go to: https://myaccount.google.com/apppasswords
5. Select "Mail" from dropdown
6. Click "Generate"
7. Copy the 16-character password (looks like: xxxx xxxx xxxx xxxx)

### Step 2: Create Google Sheet (3 minutes)
1. While logged in as muskratsio@gmail.com
2. Go to: https://sheets.google.com
3. Create new spreadsheet named "MuskRats Whitelist & Forms"
4. Set up Sheet 1 (rename to "Whitelist"):
   - Column A: Timestamp
   - Column B: Wallet Address
   - Column C: Email
   - Column D: Discord
   - Column E: Twitter
   - Column F: Referral

5. Add Sheet 2 (name it "Contact"):
   - Column A: Timestamp
   - Column B: Name
   - Column C: Email
   - Column D: Subject
   - Column E: Message

6. Add Sheet 3 (name it "Proposals"):
   - Column A: Timestamp
   - Column B: Proposal ID
   - Column C: Proposer Name
   - Column D: Email
   - (Add more columns as needed)

7. Copy the Sheet ID from URL:
   `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`

### Step 3: Google Cloud Setup (10 minutes)
1. Go to: https://console.cloud.google.com/
2. Sign in with muskratsio@gmail.com
3. Create new project called "MuskRats-Backend"
4. Enable Google Sheets API:
   - Click "APIs & Services" > "Enable APIs"
   - Search "Google Sheets API"
   - Click Enable

5. Create Service Account:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name: "muskrats-sheets-service"
   - Click "Create and Continue"
   - Skip optional steps, click "Done"

6. Get the credentials file:
   - Click on the service account you created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose JSON
   - Download the file
   - Rename it to `credentials.json`
   - Place in /Users/codydewitt/Desktop/Ai_APP/muskrats-io/

7. Share your Google Sheet:
   - Copy the service account email (looks like: muskrats-sheets-service@muskrats-backend.iam.gserviceaccount.com)
   - Open your Google Sheet
   - Click Share
   - Paste the service account email
   - Give "Editor" access

### Step 4: Create .env file (2 minutes)
```bash
cd /Users/codydewitt/Desktop/Ai_APP/muskrats-io/
cp .env.example .env
```

Edit .env file:
```env
# Email Configuration
EMAIL_USER=muskratsio@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # Your 16-char app password (no spaces)
ADMIN_EMAIL=muskratsio@gmail.com

# Google Sheets Configuration  
GOOGLE_SHEET_ID=your-sheet-id-here

# Server Configuration
PORT=3333
```

### Step 5: Install & Test (5 minutes)
```bash
# Install dependencies
npm install express cors nodemailer googleapis dotenv body-parser

# Test the server locally
node backend-server.js

# In another terminal, test the health check
curl http://localhost:3333/health
```

### Step 6: Quick Deployment Options

#### Option A: Deploy to Render.com (FREE & EASY - Recommended)
1. Push code to GitHub
2. Go to https://render.com
3. Sign up with GitHub
4. New > Web Service
5. Connect your repo
6. Settings:
   - Build Command: `npm install`
   - Start Command: `node backend-server.js`
7. Add environment variables from .env
8. Deploy!

#### Option B: Deploy to Railway.app (Also Free)
1. Go to https://railway.app
2. Sign in with GitHub
3. New Project > Deploy from GitHub repo
4. Add environment variables
5. Deploy!

### Step 7: Update Frontend URLs
Once deployed, update these files with your backend URL:
- whitelist.html (line ~459)
- contact.html (line ~297)
- proposal.html (line ~701)

Replace `https://muskrats-backend.herokuapp.com` with your actual URL like:
- Render: `https://muskrats-backend.onrender.com`
- Railway: `https://muskrats-backend.railway.app`

### Test Checklist Before Launch
- [ ] Whitelist form submits and emails arrive
- [ ] Contact form works
- [ ] Proposal form works
- [ ] Data appears in Google Sheets
- [ ] All emails going to muskratsio@gmail.com

### Need Help?
If you get stuck on any step, the forms will still work with localStorage as fallback, so the site won't break. You can set up the backend after launch if needed.

### 🚀 You've got this! The underground revolution starts tomorrow!