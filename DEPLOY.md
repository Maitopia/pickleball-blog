# GitHub Pages Deployment Guide

## Quick Start

Follow these steps to deploy your pickleball blog to GitHub Pages with automated content updates.

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon → **"New repository"**
3. Name it: `pickleball-blog` (or your preferred name)
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README (we already have one)
6. Click **"Create repository"**

## Step 2: Push Your Code to GitHub

Open terminal in your project directory and run:

```bash
cd /home/elson/clawd/pickleball-blog

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Pickleball blog with automation"

# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/pickleball-blog.git

# Push to GitHub
git branch -M main
git push -u origin main
```

> [!IMPORTANT]
> **Authentication Error?**
> If you see `Invalid username or token`, GitHub requires a **Personal Access Token (PAT)** instead of your password.
> 1. Go to **GitHub Settings** → **Developer Settings** → **Personal Access Tokens** → **Tokens (classic)**.
> 2. Click **Generate new token (classic)**.
> 3. Give it a name (e.g., "Pickleball Blog") and select the **`repo`** and **`workflow`** scopes.
> 4. Copy the token.
> 5. Run `git push` again. When asked for your password, **paste the token** instead.


## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in the left sidebar
4. Under **"Source"**, select **"GitHub Actions"**
5. Click **"Save"**

That's it! Your site will be live at:
```
https://YOUR-USERNAME.github.io/pickleball-blog
```

## Step 4: Verify Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see two workflows:
   - ✅ **Deploy to GitHub Pages** - Running
   - ⏸️ **Update Blog Content** - Scheduled for daily runs

3. Wait for the deployment to complete (usually 1-2 minutes)
4. Visit your site URL to see it live!

## Automated Content Updates

### How It Works

- **Daily Updates**: GitHub Actions runs your Python script every day at 8 AM UTC
- **Auto-Commit**: New content is automatically committed to your repo
- **Auto-Deploy**: GitHub Pages redeploys when changes are detected

### Manual Update

To trigger an update manually:

1. Go to **"Actions"** tab
2. Click **"Update Blog Content"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait for completion
5. Your site will auto-deploy with new content

### View Update Logs

1. Go to **"Actions"** tab
2. Click on any workflow run
3. Click on the job to see detailed logs

## Customization

### Change Update Schedule

Edit `.github/workflows/update-content.yml`:

```yaml
schedule:
  - cron: '0 8 * * *'  # Daily at 8 AM UTC
```

Examples:
- `0 */6 * * *` - Every 6 hours
- `0 8 * * 1` - Every Monday at 8 AM
- `0 20 * * 0` - Every Sunday at 8 PM

### Custom Domain (Optional)

1. Buy a domain (e.g., `pickleballnews.com`)
2. In repository Settings → Pages → Custom domain
3. Enter your domain and save
4. Configure DNS with your domain provider:
   - Add CNAME record pointing to `YOUR-USERNAME.github.io`

## Troubleshooting

### Deployment Failed

**Check Actions tab for errors:**
1. Go to Actions → Failed workflow
2. Click on the red X to see error details
3. Common issues:
   - Python dependency errors → Check `requirements.txt`
   - Permission errors → Ensure "Read and write permissions" in Settings → Actions → General

### Site Not Updating

**Verify workflow is running:**
1. Actions tab → "Update Blog Content"
2. Check if it's running on schedule
3. Manually trigger to test

### 404 Error: "There isn't a GitHub Pages site here"

This error usually means GitHub Pages isn't active yet or is pointing to the wrong source.

1. **Check Pages Source**:
   - Go to **Settings** -> **Pages**
   - Under **Build and deployment**, ensure **Source** is set to **"GitHub Actions"**
   - Click **Save** if you changed it.

2. **Verify Workflow Status**:
   - Go to the **Actions** tab.
   - Look for the **"Deploy to GitHub Pages"** workflow.
   - If it hasn't run yet, trigger it manually by going to **Actions** -> **Deploy to GitHub Pages** -> **Run workflow**.
   - Wait for the green checkmark (✅).

3. **Check Repository Visibility**:
   - Ensure your repository is **Public** (Settings -> General -> Change visibility).

### Other Deployment Issues

```
pickleball-blog/
├── .github/
│   └── workflows/
│       ├── update-content.yml    # Content automation
│       └── deploy-pages.yml      # Site deployment
├── automation/                   # Python scripts
├── data/                        # Auto-generated content
├── index.html                   # Main page
├── style.css                    # Styles
└── README.md                    # Documentation
```

## Next Steps

1. ✅ **Customize content** - Edit articles, tournaments, rankings
2. ✅ **Add RSS feeds** - Update `automation/config.json`
3. ✅ **Customize colors** - Edit CSS variables in `style.css`
4. ✅ **Monitor updates** - Check Actions tab regularly
5. ✅ **Share your site** - Tell the pickleball community!

## Support

- **Issues**: Open an issue on GitHub
- **Questions**: Check the README.md
- **Updates**: Star the repo to get notified of updates

---

🎾 Happy blogging! Your pickleball site is now live and auto-updating!
