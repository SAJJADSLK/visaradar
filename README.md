# SpinPick — Random Decisions, Made Beautiful

A fast, elegant, and fully-featured spin wheel application for names, tasks, prizes, and decisions. Create beautiful wheels, spin with satisfying animations, and make fair random selections instantly.

## ✨ Features

### Core Functionality
- **🎡 Create Wheels** — Add unlimited entries with custom colors
- **🎯 Spin & Win** — Smooth animations with satisfying sound effects
- **💾 Save Locally** — All wheels stored in browser (no account needed)
- **📱 Responsive Design** — Works perfectly on desktop, tablet, and mobile
- **🎨 6 Custom Themes** — Rainbow, Ocean, Sunset, Forest, Neon, Pastel

### Advanced Features
- **⚖️ Weighted Entries** — Control probability for each entry (1-10x weight)
- **👥 Team Division** — Automatically split entries into balanced teams or pairs
- **📊 CSV Import/Export** — Bulk upload entries or download results
- **🔊 Sound Effects** — Ticking during spin, fanfare on winner reveal
- **🖥️ Full-Screen Mode** — Distraction-free spinning experience
- **🌙 Dark Mode** — Easy on the eyes in any lighting

### Use Cases
- **🏫 Classrooms** — Random student picks, subject selection
- **🎉 Party Games** — Truth or Dare, dares, challenges
- **🍽️ Lunch Picker** — End the "where should we eat?" debate
- **🎁 Prize Draws** — Fair raffle for events & giveaways
- **💼 Team Meetings** — Who presents next? Who leads?
- **🎮 Gaming** — Random game modes, challenge pickers

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run preview
```

### Deploy to Vercel
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📋 Usage

### Creating a Wheel
1. Click **"Create a Wheel"** on the home page
2. Add entries (names, options, tasks, etc.)
3. Choose a theme color
4. Click **"Save Wheel"** to store locally

### Spinning
1. Select a wheel from **"My Wheels"**
2. Click the wheel or press **"Spin"**
3. Watch the animation and sound effects
4. Winner is highlighted at the top

### Team Division
1. Go to **"Teams"** page
2. Add members
3. Choose division mode (teams, pairs, or groups)
4. Click **"Divide Now"**
5. Export results as CSV

### Advanced Options
- **Weighted Entries** — Set weight (1-10) for each entry to control odds
- **Sound Toggle** — Enable/disable ticking and fanfare sounds
- **Theme Selection** — Choose from 6 color themes
- **Full-Screen Mode** — Click the fullscreen icon for immersive spinning

## 🛠️ Technology Stack

- **Frontend** — React 19 + TypeScript
- **Styling** — Tailwind CSS 4 + shadcn/ui
- **State Management** — React Hooks + localStorage
- **Animations** — CSS transitions + Framer Motion
- **Build Tool** — Vite 7
- **Deployment** — Vercel (recommended)

## 📁 Project Structure

```
spinpick_clone/
├── client/
│   ├── src/
│   │   ├── pages/           # Page components (Home, Wheels, Teams, Wheel)
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx          # Main app component
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── public/              # Static assets
│   └── index.html           # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── vercel.json              # Vercel deployment config
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
```

## 🎨 Design System

### Colors
- **Primary** — Purple (#7c3aed)
- **Secondary** — Indigo (#4f46e5)
- **Accent** — Orange (#f97316)
- **Background** — White/Light Purple

### Typography
- **Display** — Plus Jakarta Sans (Bold, 600-700 weight)
- **Body** — DM Sans (Regular, 400-500 weight)

### Spacing
- Base unit: 4px
- Padding: 4px, 8px, 12px, 16px, 20px, 24px, 32px
- Gap: 8px, 12px, 16px, 20px, 24px

## 🔒 Privacy & Security

- ✅ **No Backend** — All data stored locally in browser
- ✅ **No Tracking** — No analytics or user tracking
- ✅ **No Ads** — Clean, ad-free experience
- ✅ **No Accounts** — No login or registration required
- ✅ **Open Source** — Transparent and auditable code

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **Bundle Size** — ~150KB (gzipped)
- **Load Time** — <1 second
- **First Paint** — <500ms
- **Lighthouse Score** — 95+

## 🐛 Troubleshooting

### Wheels not saving?
- Check browser localStorage is enabled
- Try a different browser
- Clear browser cache and retry

### Sound not working?
- Check browser volume settings
- Verify Web Audio API is enabled
- Try a different browser

### Animations laggy?
- Close other browser tabs
- Update your browser
- Try hardware acceleration settings

## 📝 License

MIT License — Feel free to use, modify, and distribute.

## 🤝 Contributing

Found a bug or have a feature request? Feel free to open an issue or submit a pull request.

## 📞 Support

For questions or issues:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review browser console for error messages
3. Test in a different browser
4. Clear cache and retry

---

**Ready to spin?** Visit the live site or deploy your own instance on Vercel!

Made with ❤️ for making random decisions beautiful.
