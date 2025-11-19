# Deploy NIT Mentoring Portal to GitHub Pages

This guide will help you deploy the Students Mentoring Portal to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- Node.js 18+ installed locally

## 🚀 Quick Deployment Steps

### Step 1: Download Your Project from Replit

1. In Replit, click on the three dots menu (⋮) at the top
2. Select "Download as zip"
3. Extract the zip file to your local machine

### Step 2: Prepare for GitHub

1. Open the extracted folder in your terminal
2. Replace `package.json` with `package.github.json`:
   ```bash
   mv package.github.json package.json
   ```

3. Edit `vite.config.github.ts` and replace `'your-repo-name'` with your actual repository name:
   ```typescript
   const REPO_NAME = 'nit-mentoring-portal'; // Change this!
   ```

### Step 3: Create GitHub Repository

1. Go to GitHub.com and create a new repository (e.g., `nit-mentoring-portal`)
2. **Important**: Make the repository **PUBLIC** (GitHub Pages requires public repos on free accounts)
3. Do **NOT** initialize with README, .gitignore, or license

### Step 4: Push to GitHub

Run these commands in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - NIT Mentoring Portal"

# Add your GitHub repository as remote (replace with your username and repo name)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under "Workflow permissions", select **Read and write permissions**
4. Click **Save**

### Step 6: Configure GitHub Pages

1. In your repository, go to **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Click **Save**

### Step 7: Deploy!

The GitHub Action will automatically run and deploy your site. You can:
- Watch the deployment progress in the **Actions** tab
- Once complete, your site will be live at:
  ```
  https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
  ```

## 🔄 Making Updates

After your initial deployment, every time you push to the `main` branch, GitHub Actions will automatically rebuild and redeploy your site:

```bash
# Make changes to your code
git add .
git commit -m "Update XYZ feature"
git push
```

## 📝 Alternative: Manual Deployment with gh-pages

If you prefer manual deployment instead of automatic GitHub Actions:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Deploy:
   ```bash
   npm run deploy
   ```

This will build and push to the `gh-pages` branch. Then:
- Go to **Settings** → **Pages**
- Set Source to **Deploy from a branch**
- Select **gh-pages** branch and **/ (root)**

## 🛠️ Troubleshooting

### Blank page or 404 errors?
- Verify the `base` path in `vite.config.github.ts` matches your repository name **exactly**
- Include the trailing slash: `base: '/repo-name/'`

### Build fails?
- Check the Actions tab for error messages
- Ensure all dependencies are listed in package.json
- Try building locally first: `npm run build`

### Images not loading?
- Ensure images are in the `attached_assets` folder
- They're imported using the `@assets` alias which is configured to work

## 📂 What Gets Deployed?

Only the **frontend application** gets deployed to GitHub Pages:
- All form components
- PDF generation (jsPDF)
- Student data stored in browser localStorage
- NIT branding and watermarked background
- Photo upload functionality

The Express backend is not needed since all data is stored locally in the browser.

## 🎯 Your Live Site

After successful deployment, your portal will be accessible at:
```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Share this URL with faculty members who need to access the mentoring portal!

## 📱 Features Available

✅ 5-step form flow for student mentoring
✅ Student photo upload
✅ PDF report generation with NIT branding
✅ All data stored locally (no database needed)
✅ Works offline after first load
✅ Mobile responsive design

---

**Need help?** Check the GitHub Actions logs in your repository's Actions tab for deployment status and any errors.
