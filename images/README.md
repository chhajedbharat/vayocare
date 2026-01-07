# Images Directory

This directory is for storing VayoCare brand assets and media files.

## Required Assets

### Logo Files
- `logo.png` - Main logo (recommended: 500x500px, transparent background)
- `logo-white.png` - White version for dark backgrounds
- `favicon.ico` - Browser favicon (16x16, 32x32, 48x48)
- `apple-touch-icon.png` - iOS home screen icon (180x180px)

### Social Media
- `og-image.jpg` - Open Graph image for social sharing (1200x630px)
- `twitter-card.jpg` - Twitter card image (1200x600px)

### Optional
- `hero-image.jpg` - Hero section background or illustration
- `feature-icons/` - Custom feature icons (if replacing emojis)

## Image Optimization Guidelines

1. **Format**:
   - Use WebP with JPG/PNG fallback for photos
   - Use SVG for logos and icons (scalable, small file size)
   - Use PNG for images requiring transparency

2. **Compression**:
   - Use tools like TinyPNG, Squoosh.app, or ImageOptim
   - Target: <100KB per image for web
   - Compress without visible quality loss

3. **Responsive Images**:
   - Provide multiple sizes for different screen resolutions
   - Use `srcset` attribute in HTML

4. **Alt Text**:
   - All images must have descriptive alt text
   - Decorative images: `alt=""`

## Current Status

Currently using inline SVG for logo (no external files needed). Add image files here as the brand assets are created.

## Tools for Creating Assets

- **Logo Design**: Figma, Adobe Illustrator, Canva
- **Image Optimization**: TinyPNG, Squoosh, ImageOptim
- **Favicon Generation**: RealFaviconGenerator.net
- **Social Media Images**: Canva templates

---

*This directory is currently empty. Add image assets as they become available.*
