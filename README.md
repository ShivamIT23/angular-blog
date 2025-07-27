# SoulScript - Modern Blog Platform

A modern, responsive blog platform built with Angular 19, featuring rich text editing, user authentication, and a beautiful UI with dark mode support.

## 🌟 Features

### ✨ Core Features
- **Rich Text Editor**: Powered by Quill.js for creating beautiful blog posts
- **User Authentication**: Secure login/register system with JWT tokens
- **Blog Management**: Create, edit, delete, and manage your blog posts
- **Category System**: 13+ categories with beautiful icons and color coding
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Automatic dark/light theme switching
- **Like System**: Interactive like functionality for blog posts
- **Profile Management**: Change profile photos and manage user settings

### 🎨 UI/UX Features
- **Modern Design**: Clean, minimalist interface with smooth animations
- **Pagination**: Smart pagination with server-side caching
- **Search & Filter**: Category-based filtering and search functionality
- **Loading States**: Beautiful loading animations and skeleton screens
- **Error Handling**: User-friendly error messages and validation
- **Accessibility**: ARIA labels and keyboard navigation support

### 🔧 Technical Features
- **Angular 19**: Latest Angular framework with standalone components
- **TypeScript**: Full type safety and modern JavaScript features
- **Tailwind CSS 4**: Utility-first CSS framework for rapid styling
- **RxJS**: Reactive programming for state management
- **HTTP Interceptors**: Automatic token handling and error management
- **Route Guards**: Protected routes for authenticated users
- **Caching**: Smart caching system for improved performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd angular-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     backendUrl: 'http://localhost:8000' // Your backend API URL
   };
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:4200`

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── home/                 # Landing page
│   │   ├── blogs/                # Blog listing with pagination
│   │   ├── blog-details/         # Individual blog view
│   │   ├── create/               # Blog creation/editing
│   │   ├── my-blogs/             # User's blog management
│   │   ├── login/                # Authentication
│   │   ├── register/             # User registration
│   │   ├── change-photo/         # Profile photo management
│   │   ├── admin/                # Admin panel
│   │   └── Icons/                # Reusable icon components
│   ├── services/
│   │   ├── blogs.service.ts      # Blog CRUD operations
│   │   ├── users.service.ts      # User management
│   │   └── title.service.ts      # Title management
│   ├── guards/
│   │   └── auth.guard.ts         # Route protection
│   └── app.routes.ts             # Application routing
├── environments/                 # Environment configuration
└── styles.css                    # Global styles
```

## 🛠️ Available Scripts

```bash
# Development
npm start          # Start development server
npm run build      # Build for production
npm run watch      # Build with watch mode

# Testing
npm test           # Run unit tests
npm run e2e        # Run end-to-end tests

# Code Generation
ng generate component component-name
ng generate service service-name
ng generate guard guard-name
```

## 🎯 Key Components

### Blog Management
- **Create/Edit**: Rich text editor with image uploads
- **Categories**: 13 predefined categories with custom styling
- **Pagination**: Smart pagination with caching
- **Search**: Category-based filtering

### User Features
- **Authentication**: JWT-based login/register
- **Profile**: Photo upload and management
- **My Blogs**: Personal blog dashboard
- **Likes**: Interactive like system

### Admin Features
- **Dashboard**: Admin panel for content management
- **User Management**: User administration tools

## 🎨 Styling

The application uses **Tailwind CSS 4** with:
- Custom color palette
- Responsive design system
- Dark mode support
- Smooth animations and transitions
- Component-based styling

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Route Guards**: Protected routes for authenticated users
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: HTML sanitization for user content

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interactions
- Adaptive layouts

## 🚀 Performance Features

- **Lazy Loading**: Route-based code splitting
- **Caching**: Smart caching for blogs and user data
- **Optimized Images**: Responsive image handling
- **Bundle Optimization**: Tree-shaking and minification

## 🔧 Configuration

### Environment Variables
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  backendUrl: 'http://localhost:8000'
};
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      // Custom theme extensions
    }
  },
  plugins: []
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Version History

- **v1.0.0**: Initial release with core blog functionality
- **v1.1.0**: Added like system and improved UI
- **v1.2.0**: Enhanced pagination and performance optimizations

---

**Built with ❤️ using Angular 19 and Tailwind CSS**
