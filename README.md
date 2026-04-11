
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 Arkilus Web3 AI Portfolio

A modern, full-stack Web3 portfolio application showcasing decentralized technologies integrated with AI-powered capabilities. Built with React 19, TypeScript, and Google Generative AI.

**Live Demo:** [arkilus-web3-portfolio.vercel.app](https://arkilus-web3-portfolio.vercel.app)

## ✨ Features

- 🤖 **AI Integration** - Powered by Google Generative AI for intelligent insights
- ⛓️ **Web3 Ready** - Built for decentralized web applications
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS and smooth animations
- ⚡ **Lightning Fast** - Vite for rapid development and optimized builds
- 🎭 **Component Library** - Radix UI and custom components with CVA styling
- 🛣️ **Seamless Routing** - React Router v7 for smooth navigation
- 📱 **Fully Responsive** - Mobile-first design approach
- 🎬 **Smooth Animations** - Motion library for delightful interactions

## 🛠️ Tech Stack

### Core Framework
- **React** 19.0.0 - UI library
- **TypeScript** 5.8.2 - Type safety
- **Vite** 6.2.0 - Build tool and dev server

### AI & Backend
- **Google Generative AI** 1.29.0 - AI capabilities
- **Express** 4.21.2 - Backend server
- **Better SQLite3** 12.4.1 - Local database (in nested project)

### Styling & UI
- **Tailwind CSS** 4.1.14 - Utility-first CSS
- **Radix UI** - Headless components
- **Lucide React** 0.546.0 - Icon library
- **React Icons** 5.6.0 - Additional icons
- **Motion** 12.23.24 - Animation library
- **Class Variance Authority** 0.7.1 - Component variants
- **Tailwind Merge** 3.5.0 - Utility merging

### Router & Utilities
- **React Router DOM** 7.13.1 - Client-side routing
- **Embla Carousel React** 8.6.0 - Carousel component
- **CLSX** 2.1.1 - Utility classname merger
- **Dotenv** 17.2.3 - Environment configuration

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run clean` | Remove dist folder |
| `npm run lint` | Run TypeScript type checking |

## 📁 Project Structure

```
arkilus-web3-portfolio/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── portfolio-final/    # Final portfolio examples
├── public/             # Static assets
├── dist/               # Production build (generated)
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind CSS configuration
└── README.md           # This file
```

## 🎨 Styling

The project uses **Tailwind CSS v4** with a mobile-first approach. Custom components are created using the **Class Variance Authority** pattern for flexibility and maintainability.

```typescript
import { cva } from "class-variance-authority"

const button = cva("px-4 py-2", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-900"
    }
  }
})
```

## 🤖 AI Integration

The project integrates **Google Generative AI** for intelligent features. Configure your API key in `.env.local`:

```typescript
import { GoogleGenerativeAI } from "@google/genai"

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY)
```

## 🔧 Development Tips

- **Hot Module Replacement (HMR)**: Vite provides instant updates during development
- **TypeScript Checking**: Run `npm run lint` to check for type errors
- **Component Composition**: Use Radix UI primitives for accessible, unstyled components
- **Environment Variables**: All client-side env vars must be prefixed with `VITE_`

## 📊 Language Composition

- **TypeScript** 95.5%
- **CSS** 1.6%
- **JavaScript** 1.1%
- **HTML** 1.1%
- **Other** 0.7%

## 🚀 Deployment

The project is configured for easy deployment to **Vercel**:

1. Connect your GitHub repository to Vercel
2. Vercel automatically detects Vite configuration
3. Set environment variables in Vercel project settings
4. Deploy on every push to main branch

**Current Deployment**: [arkilus-web3-portfolio.vercel.app](https://arkilus-web3-portfolio.vercel.app)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🔗 Resources

- 🌐 [Live Demo](https://arkilus-web3-portfolio.vercel.app)
- 📚 [React Documentation](https://react.dev)
- ⚡ [Vite Documentation](https://vitejs.dev)
- 🎨 [Tailwind CSS Documentation](https://tailwindcss.com)
- 🤖 [Google Generative AI](https://ai.google.dev)
- 🧩 [Radix UI](https://www.radix-ui.com)

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the maintainers.

---

<div align="center">
  <strong>Built with ❤️ by Arkilus</strong>
</div>

