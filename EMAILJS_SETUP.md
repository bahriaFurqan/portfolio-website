# EmailJS Setup Guide

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. Verify your email address

## Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```html
Subject: New Message from {{name}} - Portfolio Contact

Hello Furqan,

You have received a new message from your portfolio website:

Name: {{name}}
Email: {{email}}
Message: {{message}}

Best regards,
Your Portfolio Website
```

4. Note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., `user_def456`)

## Step 5: Update the Code
Replace the placeholder values in `src/App.js`:

```javascript
const result = await emailjs.sendForm(
  'YOUR_SERVICE_ID',     // Replace with your actual Service ID
  'YOUR_TEMPLATE_ID',    // Replace with your actual Template ID
  formRef.current,
  'YOUR_PUBLIC_KEY'      // Replace with your actual Public Key
);
```

## Step 6: Test the Form
1. Start your development server: `npm start`
2. Go to the contact section
3. Fill out the form and submit
4. Check your email for the message

## Features Added:
- ✅ Form validation (name, email, message required)
- ✅ Email format validation
- ✅ Loading state with spinner
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Smooth animations for status messages
- ✅ Disabled state during submission

## Free Plan Limits:
- 200 emails per month
- Perfect for portfolio websites

## Troubleshooting:
- Make sure all IDs are correct
- Check browser console for errors
- Verify your email service is properly connected
- Ensure your template variables match the form field names 