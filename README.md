# Authify Dashboard

A modern, full-stack task management application built with React and Node.js, featuring secure user authentication and real-time task operations.

## 🚀 Features

- **Secure Authentication**: JWT-based login/signup with password hashing
- **Task Management**: Create, read, update, and delete tasks
- **User Profiles**: Personalized user dashboard
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Instant task synchronization
- **Protected Routes**: Secure access control

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd authify-dashboard
```

### 2. Backend Setup
```bash
cd server
npm install
```

**Required Backend Packages:**
```json
{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^5.1.0",
    "express-validator": "^7.3.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.19.3",
    "morgan": "^3.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.10"
  }
}
```

### 3. Frontend Setup
```bash
cd client
npm install
```

**Required Frontend Packages:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "lucide-react": "^0.263.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "eslint": "^8.38.0",
    "postcss": "^8.4.23",
    "tailwindcss": "^3.3.0",
    "vite": "^4.3.0"
  }
}
```

### 4. Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/authify-dashboard
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/authify-dashboard

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5000
```

## 🏃♂️ Running the Application

### Start Backend Server
```bash
cd server
npm run dev    # Development mode with auto-restart
# or
npm start      # Production mode
```

### Start Frontend Development Server
```bash
cd client
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📁 Project Structure

```
authify-dashboard/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context
│   │   ├── pages/         # Page components
│   │   └── assets/        # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── package.json
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🎨 Features Overview

### Authentication System
- Secure user registration and login
- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes and middleware

### Task Management
- Create tasks with title and description
- Edit tasks inline
- Delete tasks with confirmation
- Real-time task updates

### User Interface
- Modern dark theme design
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive user experience

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🚀 Deployment

### Backend Deployment
1. Set environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if MongoDB is running
- Verify environment variables in `.env`
- Ensure all dependencies are installed

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check CORS configuration
- Confirm API base URL in axios config

**Authentication issues:**
- Clear browser localStorage
- Check JWT secret configuration
- Verify token expiration settings

## 📞 Support

For support and questions, please open an issue in the repository.