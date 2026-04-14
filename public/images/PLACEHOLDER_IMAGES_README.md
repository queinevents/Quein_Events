# Placeholder Images - Action Required

## Overview

This document outlines the placeholder image assets that need to be created or sourced for the Quein Event Website. All images must be optimized for dark theme backgrounds with dramatic lighting and vibrant colors.

## Status: PLACEHOLDERS ONLY

⚠️ **IMPORTANT**: The current image paths in `lib/constants.ts` reference images that do not yet exist. You need to either:
1. Source high-quality event photography
2. Create placeholder images using the specifications below
3. Use temporary placeholder services (placehold.co, unsplash.com)

## Required Images by Category

### 1. Event Category Images (Subtask 14.2)

**Location**: `public/images/categories/`

**Specifications**:
- Format: WebP with JPEG fallback
- Compression: <200KB each
- Dark theme optimized with dramatic lighting
- Dark gradient overlays for text readability

**Required Files**:

1. **private-events-featured.jpg** (1200x800px)
   - Featured category (2x size)
   - Luxury private event with elegant décor
   - Dramatic lighting and premium atmosphere
   - Alt text: "Luxury private event with elegant décor and dramatic lighting"

2. **exhibitions-featured.jpg** (800x600px)
   - Modern exhibition booth
   - LED displays and vibrant lighting
   - Professional trade show setting
   - Alt text: "Modern exhibition booth with LED displays and vibrant lighting"

3. **conferences-featured.jpg** (800x600px)
   - Conference hall with stage
   - Professional lighting and audience
   - Corporate setting
   - Alt text: "Professional conference hall with stage and audience"

4. **marriage-events-featured.jpg** (800x600px)
   - Elegant wedding venue
   - Floral arrangements and ambient lighting
   - Romantic atmosphere
   - Alt text: "Elegant wedding venue with floral arrangements and ambient lighting"

5. **festivals-featured.jpg** (800x600px)
   - Outdoor festival with stage
   - Crowd and colorful lighting
   - Energetic atmosphere
   - Alt text: "Outdoor festival with stage, crowd, and colorful lighting"

**Temporary Placeholder Command**:
```bash
# Using placehold.co (replace with real images)
curl -o public/images/categories/private-events-featured.jpg "https://placehold.co/1200x800/0A0A0A/8B5CF6?text=Private+Events"
curl -o public/images/categories/exhibitions-featured.jpg "https://placehold.co/800x600/0A0A0A/3B82F6?text=Exhibitions"
curl -o public/images/categories/conferences-featured.jpg "https://placehold.co/800x600/0A0A0A/F59E0B?text=Conferences"
curl -o public/images/categories/marriage-events-featured.jpg "https://placehold.co/800x600/0A0A0A/8B5CF6?text=Weddings"
curl -o public/images/categories/festivals-featured.jpg "https://placehold.co/800x600/0A0A0A/3B82F6?text=Festivals"
```

### 2. Expertise Section Images (Subtask 14.3)

**Location**: `public/images/expertise/`

**Specifications**:
- Format: WebP with JPEG fallback
- Size: 800x600px
- Compression: <200KB each
- Professional quality with dark venue aesthetics

**Required Files**:

1. **audio-systems.jpg**
   - Professional audio equipment in dark venue
   - Dramatic lighting on equipment
   - Alt text: "Professional audio equipment and sound system at event venue"

2. **lighting-design.jpg**
   - Dramatic stage lighting setup
   - Vibrant purple/blue/gold colors
   - Alt text: "Dramatic stage lighting setup with vibrant purple and blue colors"

3. **led-screens.jpg**
   - High-resolution LED displays at event
   - Vibrant content on screens
   - Alt text: "High-resolution LED display screens at event with vibrant content"

4. **stage-construction.jpg**
   - Custom stage build
   - Professional lighting and truss
   - Alt text: "Custom stage build with professional lighting and truss system"

5. **truss-rigging.jpg**
   - Professional rigging system
   - Dramatic lighting
   - Alt text: "Professional rigging and truss system with dramatic lighting"

6. **av-contractor.jpg**
   - Complete AV setup at event
   - Multiple screens and lighting
   - Alt text: "Complete audiovisual setup with multiple screens and lighting"

**Temporary Placeholder Command**:
```bash
curl -o public/images/expertise/audio-systems.jpg "https://placehold.co/800x600/0A0A0A/8B5CF6?text=Audio+Systems"
curl -o public/images/expertise/lighting-design.jpg "https://placehold.co/800x600/0A0A0A/3B82F6?text=Lighting+Design"
curl -o public/images/expertise/led-screens.jpg "https://placehold.co/800x600/0A0A0A/F59E0B?text=LED+Screens"
curl -o public/images/expertise/stage-construction.jpg "https://placehold.co/800x600/0A0A0A/8B5CF6?text=Stage+Construction"
curl -o public/images/expertise/truss-rigging.jpg "https://placehold.co/800x600/0A0A0A/3B82F6?text=Truss+Rigging"
curl -o public/images/expertise/av-contractor.jpg "https://placehold.co/800x600/0A0A0A/F59E0B?text=AV+Contractor"
```

### 3. Team Member Photos (Subtask 14.4)

**Location**: `public/images/team/`

**Specifications**:
- Format: WebP with JPEG fallback
- Size: 400x400px (circular crop)
- Compression: <100KB each
- Professional headshots with good lighting

**Required Files**:

1. **founder.jpg** - Ahmed Al-Mansouri, Founder & CEO
2. **event-director.jpg** - Layla Hassan, Event Director
3. **technical-lead.jpg** - Omar Al-Thani, Technical Lead
4. **creative-designer.jpg** - Fatima Al-Kuwari, Creative Designer
5. **operations-manager.jpg** - Mohammed Al-Dosari, Operations Manager

**Temporary Placeholder Command**:
```bash
curl -o public/images/team/founder.jpg "https://placehold.co/400x400/1A1A1A/8B5CF6?text=Founder"
curl -o public/images/team/event-director.jpg "https://placehold.co/400x400/1A1A1A/3B82F6?text=Event+Director"
curl -o public/images/team/technical-lead.jpg "https://placehold.co/400x400/1A1A1A/F59E0B?text=Technical+Lead"
curl -o public/images/team/creative-designer.jpg "https://placehold.co/400x400/1A1A1A/8B5CF6?text=Creative+Designer"
curl -o public/images/team/operations-manager.jpg "https://placehold.co/400x400/1A1A1A/3B82F6?text=Operations+Manager"
```

### 4. Testimonial Client Photos (Subtask 14.5)

**Location**: `public/images/testimonials/`

**Specifications**:
- Format: WebP with JPEG fallback
- Size: 100x100px (circular crop)
- Compression: <50KB each
- Professional headshots

**Required Files**:

1. **client-1.jpg** - Sarah Al-Mansoori
2. **client-2.jpg** - Mohammed Al-Thani
3. **client-3.jpg** - Layla Hassan
4. **client-4.jpg** - David Chen
5. **client-5.jpg** - Fatima Al-Kuwari
6. **client-6.jpg** - Ahmed Al-Dosari

**Temporary Placeholder Command**:
```bash
curl -o public/images/testimonials/client-1.jpg "https://placehold.co/100x100/1A1A1A/8B5CF6?text=Client+1"
curl -o public/images/testimonials/client-2.jpg "https://placehold.co/100x100/1A1A1A/3B82F6?text=Client+2"
curl -o public/images/testimonials/client-3.jpg "https://placehold.co/100x100/1A1A1A/F59E0B?text=Client+3"
curl -o public/images/testimonials/client-4.jpg "https://placehold.co/100x100/1A1A1A/8B5CF6?text=Client+4"
curl -o public/images/testimonials/client-5.jpg "https://placehold.co/100x100/1A1A1A/3B82F6?text=Client+5"
curl -o public/images/testimonials/client-6.jpg "https://placehold.co/100x100/1A1A1A/F59E0B?text=Client+6"
```

### 5. Gallery Images (Subtask 14.6)

**Location**: `public/images/gallery/`

**Specifications**:
- Format: WebP with JPEG fallback
- Sizes: Varying aspect ratios
  - Landscape: 600x400px
  - Portrait: 600x800px
  - Wide: 800x600px
- Compression: <200KB each
- Dramatic lighting and vibrant colors

**Required Files** (25 images):

**Conferences** (5 images):
- conference-1.jpg, conference-2.jpg, conference-3.jpg, conference-4.jpg, conference-5.jpg

**Weddings** (5 images):
- wedding-1.jpg, wedding-2.jpg, wedding-3.jpg, wedding-4.jpg, wedding-5.jpg

**Festivals** (5 images):
- festival-1.jpg, festival-2.jpg, festival-3.jpg, festival-4.jpg, festival-5.jpg

**Exhibitions** (4 images):
- exhibition-1.jpg, exhibition-2.jpg, exhibition-3.jpg, exhibition-4.jpg

**Concerts** (4 images):
- concert-1.jpg, concert-2.jpg, concert-3.jpg, concert-4.jpg

**Other** (2 images):
- gala-1.jpg, launch-1.jpg

**Temporary Placeholder Script**:
```bash
# Conferences
for i in {1..5}; do
  curl -o "public/images/gallery/conference-$i.jpg" "https://placehold.co/800x600/0A0A0A/8B5CF6?text=Conference+$i"
done

# Weddings
for i in {1..5}; do
  curl -o "public/images/gallery/wedding-$i.jpg" "https://placehold.co/600x800/0A0A0A/3B82F6?text=Wedding+$i"
done

# Festivals
for i in {1..5}; do
  curl -o "public/images/gallery/festival-$i.jpg" "https://placehold.co/800x600/0A0A0A/F59E0B?text=Festival+$i"
done

# Exhibitions
for i in {1..4}; do
  curl -o "public/images/gallery/exhibition-$i.jpg" "https://placehold.co/600x400/0A0A0A/8B5CF6?text=Exhibition+$i"
done

# Concerts
for i in {1..4}; do
  curl -o "public/images/gallery/concert-$i.jpg" "https://placehold.co/800x600/0A0A0A/3B82F6?text=Concert+$i"
done

# Other
curl -o public/images/gallery/gala-1.jpg "https://placehold.co/600x400/0A0A0A/F59E0B?text=Gala"
curl -o public/images/gallery/launch-1.jpg "https://placehold.co/800x600/0A0A0A/8B5CF6?text=Product+Launch"
```

## Image Sourcing Recommendations

### Free Stock Photo Sources
1. **Unsplash** (https://unsplash.com/)
   - Search: "event", "conference", "wedding", "concert", "exhibition"
   - Filter: Dark lighting, professional quality
   - License: Free for commercial use

2. **Pexels** (https://www.pexels.com/)
   - Search: "event production", "stage lighting", "corporate event"
   - Filter: High quality, dark aesthetic
   - License: Free for commercial use

3. **Pixabay** (https://pixabay.com/)
   - Search: "event", "festival", "wedding venue"
   - Filter: Large size, professional
   - License: Free for commercial use

### Paid Stock Photo Sources
1. **Shutterstock** (https://www.shutterstock.com/)
2. **Getty Images** (https://www.gettyimages.com/)
3. **Adobe Stock** (https://stock.adobe.com/)

### Professional Photography
- Hire a professional event photographer
- Capture real Quein events
- Ensure proper lighting and composition
- Get signed releases for client photos

## Image Optimization Tools

### Online Tools
1. **Squoosh** (https://squoosh.app/)
   - WebP conversion
   - Quality optimization
   - Side-by-side comparison

2. **TinyPNG** (https://tinypng.com/)
   - PNG and JPEG compression
   - Batch processing
   - API available

### Command Line Tools
1. **ImageMagick**
   ```bash
   # Convert to WebP
   convert input.jpg -quality 85 output.webp
   
   # Resize
   convert input.jpg -resize 800x600 output.jpg
   ```

2. **Sharp** (Node.js)
   ```javascript
   const sharp = require('sharp');
   
   sharp('input.jpg')
     .resize(800, 600)
     .webp({ quality: 85 })
     .toFile('output.webp');
   ```

## Dark Theme Optimization Checklist

For each image, ensure:
- [ ] Good contrast on dark backgrounds (#0A0A0A, #1A1A1A)
- [ ] Dramatic lighting that works with dark theme
- [ ] Vibrant colors (purple/blue/gold accents) where appropriate
- [ ] Dark gradient overlays for text readability (if needed)
- [ ] Proper compression (<200KB for most images)
- [ ] WebP format with JPEG fallback
- [ ] Descriptive alt text in constants.ts
- [ ] Tested on actual dark backgrounds

## Next Steps

1. **Immediate**: Use placeholder images for development
2. **Short-term**: Source temporary stock photos
3. **Long-term**: Capture professional event photography
4. **Ongoing**: Optimize and update images as needed

## Notes

- All image paths in `lib/constants.ts` are already configured with proper alt text
- The website will build successfully with placeholder images
- Replace placeholders with real images before production deployment
- Ensure all images have proper licensing and permissions
- Test images on dark backgrounds before finalizing
