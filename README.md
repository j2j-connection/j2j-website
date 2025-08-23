# J2J Connection Website

A modern, responsive website for J2J Connection showcasing AI solutions for stronger communities, featuring a video carousel and BIKR diagnostic AI app.

## Features

- **Modern Design**: Black and gold theme with professional typography
- **Responsive Layout**: Works perfectly on all devices
- **Video Carousel**: 4-video showcase with auto-play and manual controls
- **BIKR Section**: Detailed information about your diagnostic AI app
- **Smooth Animations**: Professional transitions and hover effects
- **Mobile Optimized**: Touch-friendly navigation and interactions

## File Structure

```
website/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Customization

### Adding Your Videos

Replace the video placeholders in `index.html`:

```html
<div class="video-item">
    <video autoplay muted loop>
        <source src="path/to/your/video.mp4" type="video/mp4">
    </video>
</div>
```

### Updating BIKR Screenshots

Replace the screenshot placeholders with your actual app screenshots:

```html
<div class="screenshot-placeholder">
    <img src="path/to/your/screenshot.png" alt="BIKR Dashboard">
</div>
```

### Color Scheme

The current theme uses:
- **Primary**: Black (#000000)
- **Accent**: Gold (#FFD700) and Orange (#FFA500)
- **Text**: White and light grays

To change colors, update the CSS variables in `styles.css`.

## Deployment Options

### Option 1: Netlify (Recommended - Free)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial J2J website"
   git remote add origin https://github.com/yourusername/j2j-website.git
   git push -u origin main
   ```

2. **Deploy on Netlify**:
   - Connect your GitHub repo
   - Build command: (leave empty - static site)
   - Publish directory: `/` (root)
   - Your site will be live at `https://your-site.netlify.app`

3. **Custom Domain**: Point your `j2j.info` domain to Netlify

### Option 2: Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow prompts** and your site will be live

### Option 3: GitHub Pages (Free)

1. **Enable GitHub Pages** in your repo settings
2. **Select source branch** (usually `main`)
3. **Your site will be live** at `https://yourusername.github.io/repo-name`

## Local Development

1. **Open the files** in your browser:
   - Double-click `index.html`
   - Or use a local server

2. **Using Python** (if installed):
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

3. **Using Node.js** (if installed):
   ```bash
   npx serve .
   ```

## Updating Content

### Text Changes
- Edit content directly in `index.html`
- Update company information, descriptions, etc.

### Styling Changes
- Modify `styles.css` for design updates
- Adjust colors, fonts, spacing, etc.

### Functionality Changes
- Update `script.js` for new features
- Modify carousel timing, animations, etc.

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Chrome Mobile
- **Features**: CSS Grid, Flexbox, ES6+ JavaScript

## Performance

- **Optimized images**: Use WebP format when possible
- **Minified CSS/JS**: Consider minifying for production
- **CDN**: Use CDN for external fonts and libraries

## Next Steps

1. **Add your videos** from Google Veo
2. **Include BIKR screenshots** and real content
3. **Deploy to your preferred platform**
4. **Point your domain** to the new hosting
5. **Test on all devices** and browsers

## Support

For questions or customizations, refer to the code comments or modify the files directly. The website is built with standard web technologies for easy maintenance and updates.
