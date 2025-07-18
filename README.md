# 🕉️ Bhakti Seva Tracker

[![React Native](https://img.shields.io/badge/React%20Native-0.73.6-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~50.0.14-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-^5.1.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A comprehensive spiritual practice tracking application designed to help devotees monitor and enhance their spiritual journey through systematic seva (service) activities, meditation practices, and devotional commitments.

## 📱 Live Demo

- **PWA (Progressive Web App)**: [seva-tracker.vercel.app](https://seva-tracker-aq0h6367u-anshs-projects-3836b193.vercel.app)
- **Mobile App Repository**: [github.com/patela22/seva-tracker-mobile](https://github.com/patela22/seva-tracker-mobile)
- **PWA Repository**: [github.com/patela22/seva-tracker-pwa](https://github.com/patela22/seva-tracker-pwa)

## 🎯 Core Features

### 🧘‍♀️ Spiritual Practice Tracking

- **Daily Meditation**: Track mindfulness, transcendental, and loving-kindness meditation sessions
- **Prayer & Chanting**: Log japa, bhajan, and mantra practices with duration and repetition counts
- **Scripture Study**: Monitor reading of sacred texts with chapter/verse tracking and insights
- **Temple Visits**: Record spiritual experiences and activities at holy places

### 🤲 Service Activities (Seva)

- **Community Service**: Track volunteer work and service hours
- **Charitable Giving**: Log donations of money, food, clothing, and other contributions
- **Seva Activities**: Document various forms of selfless service
- **Kirtan & Devotional Music**: Record participation in group singing and musical worship

### 📊 Progress Management

- **Task Organization**: Categorize spiritual activities with custom labels and types
- **Calendar Integration**: Visual timeline of spiritual commitments and achievements
- **Progress Overview**: Comprehensive dashboard showing spiritual journey metrics
- **Status Tracking**: Monitor completion status (Complete, Partial, Incomplete)

### 🔔 Smart Notifications

- **Daily Reminders**: Automated notifications for seva completion (8 PM daily)
- **Push Notifications**: Cross-platform notification support
- **Custom Scheduling**: Flexible notification timing for different activities

## 🏗️ Technical Architecture

### Frontend Framework

```typescript
React Native 0.73.6 + Expo SDK 50
TypeScript for type safety
NativeWind for Tailwind CSS styling
React Navigation for seamless navigation
```

### State Management

```typescript
React Context API for global state
TanStack Query for server state management
Local AsyncStorage for offline persistence
Real-time data synchronization
```

### UI/UX Components

```typescript
React Native Paper for Material Design
Bottom Sheet modals for enhanced UX
Custom animations with React Native Reanimated
Gesture handling with React Native Gesture Handler
```

### Data Storage

```typescript
// Local Storage Implementation
AsyncStorage (Mobile) + localStorage (Web)
Cross-platform data persistence
Mock authentication system
Offline-first architecture
```

## 📂 Project Structure

```
client/
├── 📱 App.tsx                    # Main application entry point
├── 🔧 app.json                   # Expo configuration
├── 📦 package.json               # Dependencies and scripts
├── 🎨 tailwind.config.js         # Tailwind CSS configuration
├── 📁 assets/                    # Static resources
│   ├── 🖼️ icons/                # App icons and images
│   ├── 🎨 calendar/             # Calendar-specific assets
│   └── ⚡ task-creation/        # Task creation UI assets
├── 📁 components/               # Reusable UI components
│   ├── 🏠 home/                 # Home screen components
│   ├── 📅 calendar/             # Calendar components
│   ├── 🔍 filter/               # Filtering components
│   └── 🗃️ AddSevaModal.tsx      # Seva creation modal
├── 📁 contexts/                 # React Context providers
│   └── 🌐 SevaTrackerContext.tsx # Global app state
├── 📁 layouts/                  # Layout components
│   └── 📐 MainLayout.tsx        # Primary app layout
├── 📁 navigation/               # Navigation configuration
│   ├── 🧭 Router.tsx            # Main router
│   ├── 📱 AppNavigation.tsx     # App navigation stack
│   └── 🔗 types.ts              # Navigation types
├── 📁 screens/                  # Application screens
│   ├── 🔐 Auth/                 # Authentication screens
│   ├── 👤 Profile/              # Profile management
│   ├── 📋 TaskCreation/         # Task creation flow
│   └── 📱 Home.tsx              # Main dashboard
├── 📁 services/                 # Business logic layer
│   ├── 🔐 auth.ts               # Authentication service
│   ├── 💾 localStorage.ts       # Storage utilities
│   ├── 🕉️ seva.ts               # Seva management
│   ├── 👥 user.ts               # User management
│   └── 🔔 notifications.ts      # Push notifications
└── 📁 types/                    # TypeScript definitions
    ├── 🕉️ seva.ts               # Seva data models
    ├── 📋 task.ts               # Task data models
    └── 🎨 type.tsx              # UI type definitions
```

## 🚀 Getting Started

### Prerequisites

```bash
Node.js >= 16.0.0
npm or yarn package manager
Expo CLI (optional, project includes local CLI)
iOS Simulator / Android Emulator (for mobile testing)
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/patela22/seva-tracker-mobile.git
cd seva-tracker-mobile
```

2. **Install dependencies**

```bash
cd client
npm install
```

3. **Configure environment**

```bash
# Copy environment template
cp .env.example .env.local

# Update configuration values
EXPO_PROJECT_ID=your_expo_project_id
```

### Development

**Start development server**

```bash
npm run start
```

**Platform-specific development**

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web
```

**Code quality**

```bash
# Type checking
npm run ts:check

# Linting
npm run lint
npm run lint:fix

# Code formatting
npm run format
npm run check
```

## 🌐 PWA Deployment

### Building for Web

```bash
# Export web build
npx expo export --platform web

# Output directory: dist/
```

### Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Custom domain configuration available
```

#### Alternative Platforms

- **Netlify**: Drag-and-drop `dist/` folder
- **GitHub Pages**: Push to `gh-pages` branch
- **Firebase Hosting**: `firebase deploy`
- **Surge.sh**: `surge dist/`

### PWA Features

```json
{
  "name": "Bhakti Seva Tracker",
  "short_name": "Seva Tracker",
  "display": "standalone",
  "theme_color": "#3B82F6",
  "background_color": "#ffffff",
  "start_url": "/",
  "scope": "/",
  "orientation": "portrait"
}
```

## 🔧 Configuration

### App Configuration (`app.json`)

```json
{
  "expo": {
    "name": "Bhakti Seva Tracker",
    "slug": "bhakti-seva-tracker",
    "version": "1.0.0",
    "orientation": "portrait",
    "platforms": ["ios", "android", "web"],
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### Navigation Structure

```typescript
type AppStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Home: undefined;
  Profile: undefined;
  SevaList: undefined;
  Calendar: undefined;
  TaskCreation: { taskType: string };
  Settings: undefined;
};
```

## 📊 Data Models

### Seva Task Model

```typescript
interface SevaTask {
  id: string;
  title: string;
  date: string;
  completed: boolean;
  userId: string;
  type?: SevaType;
  notes?: string;
  duration?: number;
  location?: string;
}
```

### Task Types

```typescript
enum TypeOfTask {
  MEDITATION = "Daily Meditation",
  PRAYER = "Prayer & Chanting",
  CHARITY = "Charitable Giving",
  SERVICE = "Community Service",
  STUDY = "Scripture Study",
  TEMPLE = "Temple Visit",
  SEVA = "Seva Activities",
  FASTING = "Fasting",
  KIRTAN = "Kirtan & Devotional Music",
  OTHER = "Other",
}
```

## 🎨 Design System

### Color Palette

```css
:root {
  --sevatracker-blue: #3b82f6;
  --sevatracker-white: #ffffff;
  --sevatracker-black: #000000;
  --sevatracker-gray: #6b7280;
}
```

### Typography

```typescript
// Primary Font: Manrope
font - sevatracker - manrope(400, 600, 700, 800);

// Secondary Font: Montserrat
font - sevatracker - montserrat(400, 600, 700);
```

### Component Library

- **Buttons**: Custom pressable components with haptic feedback
- **Modals**: Bottom sheet modals with backdrop blur
- **Forms**: Styled text inputs with validation
- **Cards**: Elevated containers with shadow effects
- **Navigation**: Tab and stack navigation with custom styling

## 🔐 Authentication System

### Mock Authentication

```typescript
// Local storage-based auth for POC
interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
}

// Authentication methods
signIn(email: string, password: string)
signUp(email: string, password: string)
signOut()
getCurrentAuthUser()
```

### Session Management

- Persistent login state across app restarts
- Automatic token refresh simulation
- Secure credential storage in AsyncStorage

## 🔔 Push Notifications

### Notification Categories

```typescript
// Daily reminders
{
  title: 'Seva Reminder',
  body: "Did you finish today's seva?",
  trigger: { hour: 20, minute: 0, repeats: true }
}

// Custom scheduling
{
  title: 'Meditation Time',
  body: 'Your daily meditation session awaits',
  trigger: { seconds: customDelay }
}
```

### Platform Support

- **iOS**: Native push notifications with UNUserNotificationCenter
- **Android**: Firebase Cloud Messaging integration
- **Web**: Service Worker-based notifications

## 📱 Cross-Platform Features

### React Native Web Integration

```typescript
// Platform-specific code
import { Platform } from "react-native";

if (Platform.OS === "web") {
  // Web-specific implementation
} else {
  // Mobile-specific implementation
}
```

### Storage Compatibility

```typescript
// Unified storage interface
const storage = {
  setItem: Platform.OS === "web" ? localStorage.setItem : AsyncStorage.setItem,
  getItem: Platform.OS === "web" ? localStorage.getItem : AsyncStorage.getItem,
};
```

## 🧪 Testing

### Unit Testing

```bash
# Run tests
npm test

# Coverage report
npm run test:coverage
```

### E2E Testing

```bash
# Detox configuration for mobile
npm run test:e2e

# Playwright for web
npm run test:web
```

## 🚀 Performance Optimization

### Bundle Optimization

- **Code Splitting**: Dynamic imports for screens
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: WebP format with fallbacks
- **Lazy Loading**: Deferred component loading

### Memory Management

- **State Cleanup**: Proper useEffect cleanup
- **Image Caching**: Optimized image loading
- **Navigation Optimization**: Screen freezing on blur

## 🔍 Monitoring & Analytics

### Error Tracking

```typescript
// Sentry integration
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
});
```

### Performance Monitoring

- **Flipper Integration**: Development debugging
- **React DevTools**: Component inspection
- **Metro Bundler**: Build optimization analysis

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

```bash
# Pre-commit hooks
npm run pre-commit

# Includes:
# - TypeScript type checking
# - ESLint linting
# - Prettier formatting
# - Import sorting
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team**: For the excellent development platform
- **React Native Community**: For the robust ecosystem
- **Spiritual Communities**: For inspiration and guidance
- **Open Source Contributors**: For the amazing libraries used

## 📞 Support

- **Documentation**: [React Native Docs](https://reactnative.dev/docs/getting-started)
- **Community**: [Expo Discord](https://discord.gg/expo)
- **Issues**: [GitHub Issues](https://github.com/patela22/seva-tracker-mobile/issues)

---

<div align="center">
  <p>Built with ❤️ for the spiritual community</p>
  <p>May this app help you on your journey of devotion and service 🕉️</p>
</div>
