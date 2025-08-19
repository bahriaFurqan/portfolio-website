# Portfolio Deployment Guide - Custom Domain

## Option 1: Deploy to Netlify (Recommended)

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com) and sign up
2. Connect your GitHub account (recommended)

### Step 2: Deploy Your Site
1. **Drag & Drop Method:**
   - Go to your Netlify dashboard
   - Drag the `build` folder from your project to the Netlify deploy area
   - Your site will be live instantly with a random URL

2. **GitHub Method (Recommended):**
   - Push your code to GitHub
   - In Netlify, click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy!

### Step 3: Add Custom Domain
1. In your Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the DNS configuration instructions

## Option 2: Deploy to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com) and sign up
2. Connect your GitHub account

### Step 2: Deploy
1. Import your GitHub repository
2. Vercel will auto-detect it's a React app
3. Click "Deploy"
4. Your site will be live instantly

### Step 3: Add Custom Domain
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS as instructed

## Option 3: Deploy to GitHub Pages

### Step 1: Prepare Repository
1. Push your code to GitHub
2. Add this to your `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Step 2: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 3: Deploy
```bash
npm run deploy
```

### Step 4: Add Custom Domain
1. Create a `CNAME` file in the `public` folder
2. Add your domain name to the file
3. Configure DNS with your domain provider

## Option 4: Traditional Web Hosting

### Step 1: Upload Files
1. Upload the contents of the `build` folder to your web hosting
2. Make sure to upload to the `public_html` or `www` directory

### Step 2: Configure Domain
1. Point your domain to your hosting provider
2. Configure DNS settings as required by your host

## DNS Configuration for Custom Domain

### For Netlify/Vercel:
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify) or 76.76.19.19 (Vercel)

Type: CNAME
Name: www
Value: your-site.netlify.app (or vercel.app)
```

### For GitHub Pages:
```
Type: CNAME
Name: @
Value: yourusername.github.io
```

## SSL Certificate
- **Netlify/Vercel**: Automatic SSL included
- **GitHub Pages**: Automatic SSL included
- **Traditional Hosting**: Purchase SSL certificate or use Let's Encrypt

## Recommended: Netlify Steps

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag `build` folder to deploy area
   - Get your live URL

3. **Add Custom Domain:**
   - Go to Site Settings → Domain Management
   - Add your domain
   - Configure DNS with your domain provider

4. **SSL Certificate:**
   - Netlify provides free SSL automatically
   - Your site will be secure with HTTPS

## What's Your Domain Name?
Please let me know your domain name so I can provide specific DNS configuration instructions! 