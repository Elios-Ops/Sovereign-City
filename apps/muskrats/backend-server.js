const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password' // Use App Password for Gmail
  }
});

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || 'your-spreadsheet-id';
const SHEET_RANGE = 'Sheet1!A:F';

// Initialize Google Sheets API
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json', // Download from Google Cloud Console
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  
  const authClient = await auth.getClient();
  return google.sheets({ version: 'v4', auth: authClient });
}

// Whitelist endpoint
app.post('/api/whitelist', async (req, res) => {
  try {
    const { walletAddress, email, discord, twitter, referral } = req.body;
    
    // Validate required fields
    if (!walletAddress || !email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wallet address and email are required' 
      });
    }
    
    // Add to Google Sheets
    try {
      const sheets = await getGoogleSheetsClient();
      const timestamp = new Date().toISOString();
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: SHEET_RANGE,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[
            timestamp,
            walletAddress,
            email,
            discord || '',
            twitter || '',
            referral || ''
          ]]
        }
      });
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
      // Continue even if sheets fails
    }
    
    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🚀 MuskRats Whitelist Confirmation',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f0f0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f0f0; padding: 20px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a1a; border-radius: 10px; overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%); padding: 30px; text-align: center;">
                      <h1 style="color: #ffffff; margin: 0; font-size: 28px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
                        🎉 WELCOME TO THE WHITELIST!
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td style="padding: 40px 30px; color: #ffffff;">
                      <p style="font-size: 18px; color: #00ffff; margin-bottom: 20px;">
                        Congratulations! You've secured your spot on the exclusive MuskRats whitelist.
                      </p>
                      
                      <!-- Wallet Box -->
                      <table width="100%" cellpadding="15" cellspacing="0" style="background-color: rgba(0,255,255,0.1); border: 2px solid #00ffff; border-radius: 8px; margin: 20px 0;">
                        <tr>
                          <td>
                            <p style="color: #ffea3e; font-weight: bold; margin: 0 0 10px 0; font-size: 14px;">
                              YOUR WALLET ADDRESS:
                            </p>
                            <p style="color: #ffffff; margin: 0; word-break: break-all; font-family: monospace; font-size: 14px;">
                              ${walletAddress}
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Benefits Section -->
                      <h2 style="color: #ff00ff; font-size: 22px; margin: 30px 0 20px 0;">
                        🎁 Your Whitelist Benefits:
                      </h2>
                      
                      <table width="100%" cellpadding="10" cellspacing="0" style="background-color: rgba(255,0,255,0.1); border-radius: 8px;">
                        <tr>
                          <td>
                            <p style="color: #ffffff; margin: 10px 0;">
                              ✅ <strong style="color: #00ffff;">Early Access:</strong> Mint before public launch
                            </p>
                            <p style="color: #ffffff; margin: 10px 0;">
                              ✅ <strong style="color: #00ffff;">Discounted Price:</strong> 0.028 ETH (Save 15%)
                            </p>
                            <p style="color: #ffffff; margin: 10px 0;">
                              ✅ <strong style="color: #00ffff;">Guaranteed Allocation:</strong> Your NFTs are reserved
                            </p>
                            <p style="color: #ffffff; margin: 10px 0;">
                              ✅ <strong style="color: #00ffff;">Exclusive Discord Role:</strong> Join the inner circle
                            </p>
                            <p style="color: #ffffff; margin: 10px 0;">
                              ✅ <strong style="color: #00ffff;">Future Airdrops:</strong> Priority for all drops
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Important Dates -->
                      <h2 style="color: #ffea3e; font-size: 22px; margin: 30px 0 20px 0;">
                        📅 Important Dates:
                      </h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="10">
                        <tr>
                          <td style="background-color: rgba(255,234,62,0.1); padding: 15px; border-radius: 8px; border-left: 4px solid #ffea3e;">
                            <p style="margin: 5px 0; color: #ffffff;">
                              <strong style="color: #ffea3e;">Aug 21, 2025:</strong> $MUSKRAT Token Presale Starts
                            </p>
                            <p style="margin: 5px 0; color: #ffffff;">
                              <strong style="color: #ffea3e;">Aug 28, 2025:</strong> Gutter Punk Kids NFT Mint
                            </p>
                            <p style="margin: 5px 0; color: #ffffff;">
                              <strong style="color: #ffea3e;">Sep 04, 2025:</strong> MuskRats NFT Mint
                            </p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 40px 0;">
                        <tr>
                          <td align="center">
                            <a href="https://muskrats.io" style="display: inline-block; padding: 15px 40px; background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000000; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; text-transform: uppercase;">
                              Visit MuskRats.io
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Footer -->
                      <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;">
                      
                      <p style="color: #888; font-size: 14px; text-align: center; margin: 20px 0;">
                        Questions? Join our Discord or reply to this email.<br>
                        The Underground Revolution begins soon... 🐀
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Successfully added to whitelist! Check your email for confirmation.' 
    });
    
  } catch (error) {
    console.error('Whitelist error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred. Please try again.' 
    });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }
    
    // Add to Google Sheets (contact sheet)
    try {
      const sheets = await getGoogleSheetsClient();
      const timestamp = new Date().toISOString();
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Contact!A:E',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[
            timestamp,
            name,
            email,
            subject || 'General Inquiry',
            message
          ]]
        }
      });
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
    }
    
    // Send notification email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `MuskRats Contact Form: ${subject || 'New Message'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    await transporter.sendMail(adminMailOptions);
    
    // Send confirmation to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'MuskRats - Message Received',
      html: `
        <h2>Thank you for contacting MuskRats!</h2>
        <p>We've received your message and will get back to you soon.</p>
        <p>Your message:</p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
        <p>The MuskRats Team</p>
      `
    };
    
    await transporter.sendMail(userMailOptions);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred. Please try again.' 
    });
  }
});

// Proposal submission endpoint
app.post('/api/submit-proposal', async (req, res) => {
  try {
    const {
      proposerName,
      proposerEmail,
      discord,
      walletAddress,
      proposalTitle,
      proposalSummary,
      proposalDetails,
      category,
      impact,
      budget,
      timeline,
      team,
      risks,
      attachments
    } = req.body;
    
    // Generate proposal ID
    const proposalId = Math.floor(Math.random() * 9000) + 1000;
    
    // Add to Google Sheets (proposals sheet)
    try {
      const sheets = await getGoogleSheetsClient();
      const timestamp = new Date().toISOString();
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Proposals!A:P',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[
            timestamp,
            proposalId,
            proposerName,
            proposerEmail,
            discord || '',
            walletAddress || '',
            proposalTitle,
            proposalSummary,
            proposalDetails,
            category,
            impact,
            budget || '',
            timeline || '',
            team || '',
            risks || '',
            attachments || ''
          ]]
        }
      });
    } catch (sheetError) {
      console.error('Google Sheets error:', sheetError);
    }
    
    // Send confirmation email to proposer
    const proposerMailOptions = {
      from: process.env.EMAIL_USER,
      to: proposerEmail,
      subject: `MuskRats Proposal #${proposalId} Received`,
      html: `
        <h2>Your proposal has been submitted!</h2>
        <p>Proposal ID: #${proposalId}</p>
        <p>Title: ${proposalTitle}</p>
        <p>The Council will review your proposal within 72 hours.</p>
        <p>You'll receive updates via email and Discord.</p>
      `
    };
    
    await transporter.sendMail(proposerMailOptions);
    
    // Send notification to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Proposal #${proposalId}: ${proposalTitle}`,
      html: `
        <h2>New Proposal Submitted</h2>
        <p><strong>ID:</strong> #${proposalId}</p>
        <p><strong>From:</strong> ${proposerName} (${proposerEmail})</p>
        <p><strong>Title:</strong> ${proposalTitle}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Impact:</strong> ${impact}</p>
        <p><strong>Summary:</strong> ${proposalSummary}</p>
      `
    };
    
    await transporter.sendMail(adminMailOptions);
    
    res.json({ 
      success: true, 
      proposalId: proposalId,
      message: 'Proposal submitted successfully!' 
    });
    
  } catch (error) {
    console.error('Proposal submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred. Please try again.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MuskRats backend is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 MuskRats backend server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});