# Deployment Instructions for GitHub Pages

Your portfolio website is ready to be deployed to GitHub Pages at `https://anujkr2407.github.io/`

## Step-by-Step Deployment Guide

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in to your account (@anujkr2407)
2. Click the "+" icon in the top-right corner and select "New repository"
3. **Important**: Name the repository exactly: `anujkr2407.github.io`
4. Keep it **Public**
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### 2. Push Your Code to GitHub

Run these commands in your terminal (from the portfolio-website directory):

```bash
# Add the GitHub repository as remote origin
git remote add origin https://github.com/anujkr2407/anujkr2407.github.io.git

# Push your code to GitHub
git push -u origin main
```

If you get an authentication error, you may need to:
- Use GitHub's Personal Access Token instead of password
- Or set up SSH keys for GitHub

### 3. Verify GitHub Pages Deployment

1. Go to your repository on GitHub: `https://github.com/anujkr2407/anujkr2407.github.io`
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", ensure it's set to "Deploy from a branch"
5. Select branch: `main` and folder: `/ (root)`
6. Click "Save"

### 4. Access Your Live Website

After a few minutes, your website will be live at:
**https://anujkr2407.github.io/**

GitHub will automatically deploy any changes you push to the main branch.

## Making Updates

To update your website after deployment:

```bash
# 1. Make your changes to the files
# 2. Stage the changes
git add .

# 3. Commit with a descriptive message
git commit -m "Update: Description of your changes"

# 4. Push to GitHub
git push origin main
```

Your website will automatically update within a few minutes.

## Troubleshooting

### Website not loading?
- Wait 5-10 minutes after first deployment
- Check GitHub Pages settings are correct
- Ensure repository name is exactly `anujkr2407.github.io`

### Changes not appearing?
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Wait a few minutes for GitHub Pages to rebuild

### Authentication issues?
If you can't push to GitHub:

1. **Using Personal Access Token:**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Using SSH:**
   - Generate SSH key: `ssh-keygen -t ed25519 -C "aka24.ak7@gmail.com"`
   - Add to GitHub: Settings → SSH and GPG keys
   - Change remote URL: `git remote set-url origin git@github.com:anujkr2407/anujkr2407.github.io.git`

## Custom Domain (Optional)

To use a custom domain like `anujkumar.dev`:

1. Buy domain from domain registrar
2. Add CNAME file to repository with your domain
3. Configure DNS settings with your registrar
4. Update GitHub Pages settings with custom domain

## Performance Optimization

Your website is already optimized with:
- Lazy loading for images
- Debounced scroll events
- Minified animations
- Efficient particle system
- LocalStorage for theme preference

For further optimization:
- Compress images before adding
- Consider adding service worker for PWA
- Use CDN for Font Awesome and Google Fonts

---

Need help? Contact: aka24.ak7@gmail.com
