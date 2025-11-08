# notin

A modern and simple note-taking application built with Next.js, shadcn/ui, and LocalStorage.

## ✨ Features

- 📝 **Unlimited Notes** - Create as many notes as you want
- 💾 **Auto-Save** - All changes are automatically saved to LocalStorage
- 🔍 **Search** - Search your notes by title and content
- 🎨 **Modern Interface** - Beautiful and clean design with shadcn/ui
- 🌙 **Dark/Light Mode** - Toggle between themes (preference is remembered)
- 📏 **Text Size Settings** - Customize text size (Small, Medium, Large, Extra Large)
- 🔤 **Font Family Selection** - Choose between Sans, Serif, or Mono fonts
- 📥 **TXT Export** - Download your notes as .txt files
- 📱 **Responsive Design** - Works perfectly on mobile and desktop
- 🔄 **Sidebar Toggle** - Open and close the sidebar (preference is remembered)
- 📋 **Compact Mode** - Toggle compact view to see more notes at once
- 🗑️ **Note Deletion** - Confirmation modal before deleting
- 🏷️ **Dynamic Tab Title** - Selected note title appears in browser tab
- 📊 **Note Statistics** - View character count, word count, and last edited date
- 💬 **Tooltips** - Helpful tooltips on all interactive elements
- 🎯 **Welcome Modal** - Guided introduction for first-time users
- 📄 **About & Licenses** - View app information and licenses
- 🎨 **Custom Scrollbars** - Beautiful, minimal scrollbars throughout the app

## 🚀 Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide Icons](https://lucide.dev/) - Icons
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

## 📦 Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open in your browser:

[http://localhost:3000](http://localhost:3000)

## 💡 Usage

### Basic Operations

- **Create New Note**: Click the "New Note" button in the top left
- **Edit Note**: Select a note and edit it in the editor on the right
- **Delete Note**: Hover over a note and click the trash icon (confirmation required)
- **Search Notes**: Type in the search box in the sidebar

### Advanced Features

- **Theme Toggle**: Click the moon/sun icon in the sidebar to switch between dark/light mode
- **Text Size**: Select text size from the dropdown in the top right (preference is remembered)
- **Font Family**: Choose your preferred font (Sans, Serif, or Mono) from the dropdown
- **Export Note**: Click the download button in the top right to download the note as a .txt file
- **Sidebar Toggle**: Click the hamburger menu button to open/close the sidebar
- **Compact Mode**: Click the list icon next to the note count to toggle compact view
- **Note Statistics**: View character count, word count, and last edited date in the footer
- **About & Licenses**: Click "About" or "Licenses" in the footer to view app information

### Mobile Usage

- On mobile, the sidebar is closed by default
- Use the hamburger menu button to open the sidebar
- Sidebar automatically closes when a note is selected

## 📁 Project Structure

```
notes-app/
├── app/
│   ├── layout.tsx          # Main layout with metadata
│   ├── page.tsx            # Main page (minimal, delegates to NotesApp)
│   └── globals.css         # Global styles, theme, and custom scrollbars
├── components/
│   ├── NotesApp.tsx        # Main app component (orchestrates everything)
│   ├── NoteSidebar.tsx     # Left panel (note list, search, compact mode)
│   ├── NoteEditor.tsx      # Right panel (note editor)
│   ├── EditorToolbar.tsx   # Font and text size controls
│   ├── EditorFooter.tsx    # Footer with stats and links
│   ├── EmptyNoteView.tsx   # Empty state when no note is selected
│   ├── WelcomeModal.tsx    # First-time user welcome modal
│   ├── AboutModal.tsx       # About modal with app info
│   ├── DeleteConfirmModal.tsx # Delete confirmation modal
│   ├── LicensesModal.tsx   # Licenses modal
│   ├── LoadingScreen.tsx   # Loading state component
│   └── ui/                 # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── select.tsx
│       ├── scroll-area.tsx
│       ├── tooltip.tsx
│       └── modal.tsx
├── hooks/
│   ├── useLocalStorage.ts  # LocalStorage hook
│   ├── useTheme.ts         # Theme management hook
│   ├── useNotes.ts         # Notes management hook
│   ├── useDocumentTitle.ts # Document title management
│   ├── useResponsive.ts    # Responsive behavior hook
│   └── useEditorSettings.ts # Editor settings (font, text size)
├── types/
│   └── note.ts             # TypeScript types
├── lib/
│   └── utils.ts            # Utility functions (cn)
└── public/
    └── licenses.txt        # Open source licenses
```

## 🎨 Customization

### Colors

You can customize the color palette by editing CSS variables in `app/globals.css`. Variables are available for both light and dark modes.

### Components

shadcn/ui components are located in `components/ui/` and are fully customizable.

## 🛠️ Development

```bash
# Development mode
npm run dev

# Production build
npm run build

# Production server
npm start

# Linting
npm run lint
```

## 📝 Notes

- All data is stored in your browser's LocalStorage
- Data stays only on your device, nothing is sent to any server
- If you clear your browser data, your notes will be deleted
- Your notes won't be visible in different browsers or incognito mode

## 🔒 Privacy

notin works entirely client-side. No data is sent to any server. All your notes are stored only in your browser.

## 📄 License

MIT

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

## 👤 Author

[kerembeyazit](https://github.com/kerembeyazit)
