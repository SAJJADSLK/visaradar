# SpinPick — Complete Feature Documentation

## Core Features

### 1. **Spin Wheel Creation & Customization**
- Create custom wheels with unlimited entries
- Add, edit, and remove entries dynamically
- Real-time wheel visualization with color-coded segments
- Automatic text sizing based on entry count
- Support for up to 16 visible entries with labels

### 2. **Spinning & Winner Selection**
- **Fixed Winner Logic**: Accurate winner selection based on pointer position at top of wheel
- Smooth 3.5-second spin animation with easing
- Random winner selection from all entries
- Instant winner announcement with toast notification
- "Spin Again" button after result for quick re-spins

### 3. **Theme System**
- **6 Pre-built Themes**: Rainbow, Ocean, Sunset, Forest, Neon, Pastel
- Custom color palettes for each theme
- One-click theme switching
- Persistent theme selection during session

### 4. **Local Storage & Persistence**
- **Automatic Saving**: All wheel configurations saved to browser localStorage
- **Wheel Storage Hook** (`useWheelStorage`): Manage wheel data with save, update, delete operations
- **No Account Required**: Data persists across browser sessions
- Maximum 1000 wheels stored locally

### 5. **Winner History Tracking**
- **History Hook** (`useWinnerHistory`): Track all spin results
- View recent winners in a dedicated history panel
- Statistics per wheel showing win counts
- Up to 1000 history records maintained
- Clear history anytime

### 6. **Import & Export**
- **CSV Export**: Download wheel entries as CSV file
- **CSV Import**: Upload CSV files to populate wheel entries
- Easy data migration between wheels
- Compatible with spreadsheet applications

### 7. **Share & Collaboration**
- **Shareable Links**: Generate unique URLs for wheel sharing
- **URL-based Sharing**: Recipients can view and spin shared wheels
- **Copy to Clipboard**: One-click link copying
- No account needed to share or receive wheels

### 8. **Full-Screen Mode**
- Immersive spinning experience
- Larger wheel visualization
- Dedicated full-screen exit button
- Perfect for presentations and events

### 9. **Responsive Design**
- **Mobile-First**: Optimized for phones, tablets, and desktops
- Touch-friendly interface
- Adaptive layouts for all screen sizes
- Fast loading and smooth interactions

### 10. **SEO Optimization**
- Comprehensive meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card support
- Schema.org structured data
- Robots.txt and sitemap.xml
- Canonical URLs

### 11. **AdSense Ready**
- AdSense script integration in HTML
- Multiple ad placement zones (top, middle, bottom)
- Responsive ad containers
- Compliant ad format declarations

## Pages & Navigation

| Page | Route | Features |
|------|-------|----------|
| **Home** | `/` | Landing page, hero section, use-case cards, features grid, FAQ, CTA |
| **Create Wheel** | `/wheel/new` | Full wheel editor with all advanced features |
| **My Wheels** | `/wheels` | Saved wheels gallery, quick access to previous wheels |
| **Teams** | `/teams` | Team generation placeholder (coming soon) |
| **Puzzle** | `/puzzle` | Puzzle mode placeholder (coming soon) |
| **Challenge** | `/challenge` | Challenge mode placeholder (coming soon) |

## Technical Implementation

### Hooks
- **`useWheelStorage`**: Manages wheel CRUD operations with localStorage
- **`useWinnerHistory`**: Tracks and retrieves winner history
- **`useMobile`**: Responsive breakpoint detection (from template)

### Components
- **`Header`**: Sticky navigation with responsive menu
- **`SpinWheel`**: Reusable wheel component with customizable entries
- **`ThemeSelector`**: Theme picker with 6 pre-built options

### Styling
- **Tailwind CSS 4** with custom theme tokens
- **Plus Jakarta Sans** for headings (bold, geometric)
- **DM Sans** for body text (readable, friendly)
- Purple accent color (`#7c3aed`) throughout
- Soft lavender gradients and subtle shadows

### Animation
- **Spin Animation**: 3.5s cubic-bezier easing for realistic feel
- **Fade-up Entrance**: Staggered animations for page load
- **Hover Effects**: Smooth transitions on interactive elements
- **Result Display**: Animated winner announcement

## Browser Compatibility
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Metrics
- **Lighthouse Score**: Target >90
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## Data Privacy
- **No Backend Storage**: All data stored locally in browser
- **No User Tracking**: No analytics beyond optional Umami
- **No Ads Tracking**: AdSense only (user can opt out)
- **No Third-party Data**: Minimal external dependencies

## Future Enhancements
- Sound effects toggle (tick sounds during spin, fanfare on win)
- Weighted entries (custom probability per entry)
- Multi-draw mode (pick multiple winners)
- Team generator (divide into balanced groups)
- Puzzle mode (reveal challenges)
- Challenge mode (daily challenges)
- Dark mode theme
- PWA support (offline capability)
- Mobile app versions

## Known Limitations
- Maximum 16 visible entry labels on wheel (text truncation after)
- Local storage limited to ~5MB per browser
- No cross-device synchronization
- No backend authentication or user accounts

## Support & Feedback
For issues, suggestions, or feature requests, please contact support or submit feedback through the website.
