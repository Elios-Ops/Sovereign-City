# MuskRats Backend Setup Guide

## Quick Setup (Going Live Tomorrow!)

### 1. Install Dependencies
```bash
cd muskrats-io
npm install express cors nodemailer googleapis dotenv body-parser
```

### 2. Gmail Setup
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Visit: https://myaccount.google.com/apppasswords
   - Select "Mail" and generate password
   - Copy the 16-character password

### 3. Google Sheets Setup
1. Create a new Google Sheet
2. Name the first sheet "Sheet1" with columns:
   - A: Timestamp
   - B: Wallet Address
   - C: Email
   - D: Discord
   - E: Twitter
   - F: Referral
3. Create a second sheet named "Contact" with columns:
   - A: Timestamp
   - B: Name
   - C: Email
   - D: Subject
   - E: Message
4. Copy the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`

### 4. Google Cloud Setup (for Sheets API)
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing
3. Enable Google Sheets API
4. Create Service Account:
   - Go to "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Download JSON key file
   - Rename to `credentials.json` and place in muskrats-io folder
5. Share your Google Sheet with the service account email

### 5. Configure Environment
1. Copy `.env.example` to `.env`
2. Fill in your credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
ADMIN_EMAIL=your-admin-email@gmail.com
GOOGLE_SHEET_ID=your-spreadsheet-id
PORT=3333
```

### 6. Start the Server
```bash
node backend-server.js
```

### 7. Test the Server
Visit: http://localhost:3333/health

## Production Deployment Options

### Option 1: Deploy to Heroku
```bash
heroku create muskrats-backend
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set GOOGLE_SHEET_ID=your-sheet-id
git push heroku main
```

### Option 2: Deploy to Railway
1. Connect GitHub repo to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically

### Option 3: Deploy to VPS (DigitalOcean/AWS)
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start backend-server.js --name muskrats-backend

# Save PM2 configuration
pm2 save
pm2 startup
```

## Update Frontend Forms

The forms need to point to your backend URL:
- Development: `http://localhost:3333`
- Production: `https://your-backend-url.com`

Update these files:
- whitelist.html (line ~469)
- contact.html (form action)

## Testing Checklist

- [ ] Whitelist form submits successfully
- [ ] Email confirmation is received
- [ ] Data appears in Google Sheet
- [ ] Contact form works
- [ ] Admin receives contact notifications

## Troubleshooting

1. **Gmail not sending**: Make sure you're using App Password, not regular password
2. **Google Sheets not updating**: Check service account has edit access to sheet
3. **CORS errors**: Update CORS_ORIGIN in .env for production domain

## Need Help?
Contact the dev team or check the issues at the GitHub repo.