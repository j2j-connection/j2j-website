# GitHub Deployment Commands

## After creating your GitHub repo, run these commands:

```bash
# 1. Add your GitHub repo as remote (REPLACE with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/j2j-website.git

# 2. Push your code to GitHub
git branch -M main
git push -u origin main
```

## Then follow these steps on GitHub.com:

1. **Go to your repo** → Settings tab
2. **Scroll down to "Pages"** in left sidebar
3. **Source**: Deploy from a branch
4. **Branch**: main
5. **Folder**: / (root)
6. **Click "Save"**
7. **Add custom domain**: Enter `j2j.info`
8. **Wait for green checkmark**

## DNS Configuration (at your domain registrar):

Add these DNS records where you bought j2j.info:

```
Type: A     | Name: @   | Value: 185.199.108.153
Type: A     | Name: @   | Value: 185.199.109.153  
Type: A     | Name: @   | Value: 185.199.110.153
Type: A     | Name: @   | Value: 185.199.111.153
Type: CNAME | Name: www | Value: YOUR_USERNAME.github.io
```

## After Setup:
- GitHub Pages URL: `https://YOUR_USERNAME.github.io/j2j-website`
- Custom domain: `https://j2j.info` (after DNS propagates)

Your repo is ready to push! 🚀