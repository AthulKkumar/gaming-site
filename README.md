
# Gaming Centre - Modern Full-Stack Gaming Platform

A complete migration from session-based Handlebars application to modern React SPA with JWT authentication.

## 🚀 Features

### Frontend (React 18 + Vite)
- ⚛️ React 18 with Hooks and Context API
- 🎨 Tailwind CSS with component-scoped styling (@apply)
- 🔐 JWT-based authentication with HttpOnly cookies
- 🎮 Interactive games with real-time score tracking
- 📱 Responsive design for all screen sizes
- 🏆 Global leaderboards and user profiles

### Backend (Node.js + Express)
- 🏗️ SOLID principles architecture
- 🔒 JWT authentication with bcrypt password hashing
- 🛡️ Security middleware (helmet, cors, rate limiting)
- ✅ Input validation with express-validator
- 🗄️ MongoDB with Mongoose ODM
- 📊 Comprehensive scoring and coins system

### Games Available
- 🔤 **Word Scrambler** - Unscramble words to earn points
- 🐍 **Snake Game** - Classic snake with growing mechanics  
- 🧠 **Memory Game** - Card matching with difficulty levels
- ⭕ **Tic Tac Toe** - Strategic game against AI

## 📁 Project Structure

```
├── /client                 # React frontend
│   ├── /src
│   │   ├── /components     # Reusable UI components
│   │   ├── /pages          # Route-based page components  
│   │   ├── /games          # Game components
│   │   ├── /context        # React context providers
│   │   ├── /hooks          # Custom React hooks
│   │   ├── /services       # API service functions
│   │   └── /styles         # Component-scoped CSS
│   ├── package.json        # Client dependencies
│   └── vite.config.js      # Vite configuration
├── /server                 # Express backend
│   ├── /controllers        # Request handlers
│   ├── /routes             # API route definitions
│   ├── /services           # Business logic
│   ├── /models             # MongoDB schemas
│   ├── /middleware         # Custom middleware
│   ├── /validators         # Input validation rules
│   ├── /utils              # Utility functions
│   └── server.js           # Main server file
├── package.json            # Root scripts and meta
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- MongoDB Atlas account or local MongoDB
- Git

### Quick Start

1. **Clone and install dependencies**
```bash
git clone <your-repo>
cd gaming-website
npm run install:all
```

2. **Environment Configuration**
Create `config.env` in the root directory:
```env
# Database
DATABASE_URL=mongodb://localhost:27017/gaming-website
# or MongoDB Atlas:
# DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/gaming-website

# JWT Secret (use a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Environment
NODE_ENV=development

# URLs
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
```

3. **Start Development Servers**
```bash
# Start both client and server concurrently
npm run dev

# Or start individually:
npm run server:dev  # Backend on :5000
npm run client:dev  # Frontend on :3000
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## 🎮 How to Play

### For Guests
- 🎯 Play any game without registration
- 📊 See your scores locally
- 🚪 Optional signup prompt after each game

### For Registered Users  
- 💰 Earn coins based on performance
- 📈 Track high scores and progress
- 🏆 Compete on global leaderboards
- 🔓 Unlock advanced games with coin requirements

### Game Progression
- **Word Scrambler**: 10 coins per game, unlocked by default
- **Tic Tac Toe**: 8 coins per game, unlocked by default  
- **Memory Game**: 12 coins per game, requires 20 coins
- **Snake Game**: 15 coins per game, requires 30 coins

## 🏗️ Architecture Highlights

### SOLID Principles Implementation

**Single Responsibility**: Each module handles one concern
- Controllers handle HTTP requests/responses
- Services contain business logic
- Models define data structure
- Middleware handles cross-cutting concerns

**Open/Closed**: Extensible without modification
- New games can be added without changing existing code
- Plugin-style middleware architecture
- Service-oriented API design

**Liskov Substitution**: Services are interchangeable
- AuthService can be swapped for different auth providers
- GameService can support multiple scoring algorithms

**Interface Segregation**: Focused, minimal interfaces
- Separate auth, game, and user APIs
- Component-specific prop interfaces

**Dependency Inversion**: High-level modules don't depend on details
- Controllers depend on service abstractions
- Services depend on repository interfaces

### Security Features
- 🔐 JWT tokens stored in HttpOnly cookies
- 🛡️ Password hashing with bcrypt (salt rounds: 12)
- 🚫 Rate limiting (100 requests per 15 minutes)
- 🔒 Input validation and sanitization
- 🛡️ CORS protection with credentials support
- 🧹 Security headers via Helmet

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Games
- `POST /api/games/result` - Submit game score (authenticated)
- `POST /api/games/guest-complete` - Guest game completion
- `GET /api/games/access/:game` - Check game access
- `GET /api/games/stats` - User game statistics
- `GET /api/games/leaderboard/:game` - Game-specific leaderboard

### Users
- `GET /api/users/profile` - User profile
- `GET /api/users/leaderboard` - Global leaderboard
- `GET /api/users/all` - All users (admin)

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-production-secret
CLIENT_URL=https://yourdomain.com
```

## 🔄 Migration Summary

This project was successfully migrated from:

**Before**: Handlebars + Session-based auth + Vanilla JS
**After**: React SPA + JWT auth + Modern architecture

### Key Improvements
- ✅ Modern React 18 with hooks and context
- ✅ JWT authentication replacing sessions  
- ✅ SOLID principles backend architecture
- ✅ Component-scoped CSS with Tailwind
- ✅ Guest play with optional signup
- ✅ Comprehensive error handling
- ✅ Security best practices
- ✅ Scalable folder structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

---

Built with ❤️ using React, Express, and MongoDB 

