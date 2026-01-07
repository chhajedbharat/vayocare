# VayoCare - Coming Soon Landing Page

![VayoCare Logo](https://img.shields.io/badge/VayoCare-Caring%20Beyond%20Distance-0d7377?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Coming%20Soon-ff6b35?style=for-the-badge)
![Launch](https://img.shields.io/badge/Launch-Q2%202025-1a3a52?style=for-the-badge)

A modern, responsive, and accessible landing page for VayoCare - an AI-powered elderly care startup in India. This page is designed to capture early interest and build a waitlist before the official Q2 2025 launch.

## 🎯 Overview

**VayoCare** is an AI-powered 24/7 monitoring and companionship platform for elderly parents living alone. Our mission is to empower families to provide exceptional care for their loved ones, regardless of distance.

### Key Features of the Platform
- 🎯 **Fall Detection**: AI-powered instant fall detection with computer vision
- 🗣️ **Voice Companion**: Multilingual AI assistant (8+ Indian languages)
- 💊 **Health Tracking**: Medication reminders, vitals monitoring, pattern analysis
- 📱 **Family Dashboard**: Real-time updates accessible from anywhere
- 🔔 **Smart Monitoring**: Motion sensors, activity pattern analysis
- 🚨 **Emergency Response**: 24/7 emergency contact system
- 🔒 **Privacy First**: Local video processing, not stored in cloud

## 📂 Project Structure

```
vayocare/
├── index.html          # Main landing page with semantic HTML5
├── styles.css          # Comprehensive CSS with design system
├── script.js           # JavaScript for animations and form handling
├── images/             # Logo and assets (to be added)
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.) for customization
- Optional: A local development server for testing

### Installation

1. **Clone or download the project**
   ```bash
   git clone https://github.com/vayocare/landing-page.git
   cd landing-page
   ```

2. **Open the landing page**
   
   **Option A: Direct file opening**
   - Simply open `index.html` in your web browser
   - Double-click the file or right-click → Open with → Your browser

   **Option B: Using a local server (recommended)**
   
   With Python:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   With Node.js (using npx):
   ```bash
   npx http-server -p 8000
   ```
   
   With VS Code Live Server extension:
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Visit the page**
   - If using local server: Open `http://localhost:8000` in your browser
   - If opened directly: The file should load in your browser

## 🎨 Design System

### Color Palette
- **Primary (Navy)**: `#1a3a52` - Trust, stability
- **Secondary (Teal)**: `#0d7377` - Health, calmness
- **Accent (Orange)**: `#ff6b35` - Care, warmth
- **Background**: `#f5f7fa` to `#e8f0f5` gradients
- **Text**: Navy for headings, `#5a7a8f` for body

### Typography
- **Font**: System fonts for optimal performance
- **Sizes**: H1: 52px, H2: 36px, H3: 28px, Body: 16-18px
- **Weights**: 400 (normal), 600 (semi-bold), 700 (bold)
- **Line Height**: 1.6-1.8 for readability

### Responsive Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px - 1439px
- **Large Desktop**: 1440px+

## 📋 Features

### ✅ Completed Features
- [x] Fully responsive design (mobile-first)
- [x] Semantic HTML5 structure
- [x] Comprehensive SEO optimization
- [x] Open Graph tags for social sharing
- [x] Email validation and form handling
- [x] Scroll animations with Intersection Observer
- [x] Glass morphism effects
- [x] Accessibility features (WCAG 2.1 AA compliant)
- [x] Keyboard navigation support
- [x] Screen reader compatibility
- [x] Local storage for preventing duplicate submissions
- [x] Loading states and error handling
- [x] Performance optimizations
- [x] Print-friendly styles

### 🔄 To Be Implemented
- [ ] Backend API integration for email submissions
- [ ] Analytics tracking (Google Analytics, Mixpanel, etc.)
- [ ] A/B testing setup
- [ ] Social media meta image creation
- [ ] Favicon set (multiple sizes)
- [ ] PWA manifest for mobile installation
- [ ] Cookie consent banner (if needed)
- [ ] Multilingual support

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --color-primary: #1a3a52;      /* Your primary color */
    --color-secondary: #0d7377;    /* Your secondary color */
    --color-accent: #ff6b35;       /* Your accent color */
    /* ... more variables */
}
```

### Updating Content

All content is in `index.html`. Key sections to customize:
- **Company info**: Meta tags in `<head>`
- **Hero section**: Main headline and tagline
- **Features**: Feature cards in solution section
- **Contact**: Email address in footer
- **Social links**: LinkedIn and Twitter URLs

### Backend Integration

To connect the email form to your backend, edit `script.js`:

```javascript
async function submitToWaitlist(email) {
    const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            email: email,
            source: 'landing_page',
            timestamp: new Date().toISOString()
        })
    });
    
    if (!response.ok) {
        throw new Error('Submission failed');
    }
    
    return response.json();
}
```

### Adding Analytics

Add your analytics code before the closing `</body>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🌐 Deployment

### Netlify (Recommended)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy with these settings:
   - Build command: (leave empty)
   - Publish directory: `.`

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy
```

### Vercel

```bash
npm install -g vercel
vercel
```

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`)
4. Save and wait for deployment

### Traditional Hosting (cPanel, FTP)

1. Upload all files to your hosting via FTP
2. Ensure `index.html` is in the root directory
3. Set proper file permissions (644 for files, 755 for directories)

## 📊 Performance

### Current Metrics
- **Lighthouse Score Target**: >90 (all categories)
- **Load Time Target**: <3 seconds on 3G
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s

### Optimization Tips
- Images are inline SVG (no HTTP requests)
- No external dependencies or frameworks
- Minified CSS and JavaScript for production
- Lazy loading for below-the-fold content
- Efficient animations with CSS transforms

### Production Build

Before deploying, minify your files:

**CSS Minification:**
```bash
# Using online tools or:
npx clean-css-cli styles.css -o styles.min.css
```

**JavaScript Minification:**
```bash
npx terser script.js -o script.min.js
```

Then update `index.html` to reference minified files:
```html
<link rel="stylesheet" href="styles.min.css">
<script src="script.min.js"></script>
```

## ♿ Accessibility

This landing page follows WCAG 2.1 Level AA guidelines:

- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ Color contrast ratio ≥ 4.5:1
- ✅ Alt text for images
- ✅ Screen reader announcements
- ✅ Skip-to-content link

### Testing Accessibility

Use these tools:
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome Lighthouse audit
- Screen reader testing (NVDA, JAWS, VoiceOver)

## 🐛 Browser Support

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ iOS Safari (last 2 versions)
- ✅ Android Chrome (last 2 versions)

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly tap targets (minimum 48px)
- Fast-loading on 3G networks
- Optimized for small screens (320px+)
- No horizontal scroll on any device

## 🔒 Privacy & Security

- No cookies used (GDPR compliant by default)
- Email stored in localStorage (client-side only)
- No external scripts or trackers (before analytics added)
- Privacy-first approach mentioned in content

## 📧 Contact & Support

- **Email**: hello@vayocare.com
- **Website**: https://vayocare.com
- **LinkedIn**: https://linkedin.com/company/vayocare
- **Twitter**: https://twitter.com/vayocare

## 📄 License

© 2025 VayoCare. All rights reserved.

This code is proprietary. Do not use, copy, or distribute without explicit permission from VayoCare.

## 🙏 Acknowledgments

- Design inspired by modern healthcare and SaaS landing pages
- Icons and emojis from Unicode standard
- Built with modern web standards and best practices

## 📝 Changelog

### Version 1.0.0 (January 2025)
- Initial release
- Complete responsive landing page
- Email waitlist functionality
- Scroll animations
- SEO optimization
- Accessibility features

---

**Built with ❤️ in India for VayoCare**

*Launching Q2 2025 - Join the waitlist today!*
