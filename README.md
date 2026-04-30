# Smart-Local-Service 🏠 🛠️

<div align="center">

**Smart-Local-Service** is a premium full-stack service marketplace that bridges the gap between household needs and verified local professionals.

[Features](#-core-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Setup](#-setup) • [API Docs](#-api-endpoints) • [Contributing](#-contributing)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

---

## 🎯 Overview

In a world where finding reliable local help often depends on unverified listings and word-of-mouth, **Smart-Local-Service** provides a verified digital identity for professionals and a seamless booking experience for users. Whether it's an emergency plumbing fix or a routine electrical check, our platform ensures a secure, transparent, and role-based ecosystem.

**Currently Supporting:**
- ✅ User Authentication & Authorization
- ✅ Provider Profile Management
- ✅ Advanced Booking System
- ✅ Real-time Chat & Notifications
- ✅ Review & Rating System
- ✅ Provider Analytics & Dashboard
- ✅ Admin Management Panel

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
| --- | --- |
| **React 19.2** | UI Framework with latest features |
| **Vite** | Lightning-fast build tool |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Redux Toolkit** | State management |
| **Socket.io Client** | Real-time communication |
| **Chart.js** | Analytics visualization |
| **Framer Motion** | Smooth animations |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
| --- | --- |
| **Node.js** | Runtime environment |
| **Express.js 5.2** | Web framework |
| **MongoDB & Mongoose** | Database & ODM |
| **Socket.io** | Real-time events |
| **JWT** | Secure authentication |
| **Passport.js** | OAuth strategy |
| **Cloudinary** | Image storage & management |
| **Brevo** | Email notifications |

---

## ✨ Core Features

### 👤 For Users
- 🔐 **Secure Authentication** - Email verification & Google OAuth integration
- 🔍 **Verified Provider Browsing** - Explore curated, approved service providers
- 📋 **Rich Provider Profiles** - View portfolios, experience, ratings, and reviews
- 📅 **Advanced Booking System** - Schedule services with custom details & pricing
- 💬 **Real-time Chat** - Direct messaging with service providers
- 🔔 **Smart Notifications** - Stay updated on booking status & messages
- ⭐ **Rating & Reviews** - Share experiences and help the community

### 🧰 For Service Providers
- 🏪 **Digital Storefront** - Create professional profiles with ID verification
- 📊 **Real-time Dashboard** - Accept, reject, or complete service bookings
- 📈 **Advanced Analytics**
  - **Trust Score** - Automatically calculated based on performance
  - **Earnings Tracker** - Monitor total revenue and growth
  - **Performance Charts** - Visual insights via Chart.js
- 💬 **Direct Messaging** - Communicate with clients in real-time
- 📱 **Mobile-friendly Interface** - Manage bookings on the go

### 🛡️ For Administrators
- 📊 **Platform Dashboard** - High-level analytics on revenue and user growth
- ✅ **Provider Vetting** - Manage and approve professional listings
- 🏆 **Leaderboards** - Monitor top-performing providers
- 📈 **Commission Flow** - Track platform earnings
- 👥 **User Management** - Moderate users and handle disputes

---

## ⚙️ Technical Highlights

- **🔒 Role-Based Access Control (RBAC)** - Strict authorization for Users, Providers, and Admins
- **📱 Responsive Design** - Glassmorphic UI optimized for all screen sizes
- **⚡ Real-time Architecture** - WebSocket-based communication via Socket.io
- **🗄️ Scalable API** - RESTful endpoints with clean separation of concerns
- **🔑 Secure Token Management** - JWT with refresh token strategy
- **🖼️ Cloud Storage** - Cloudinary integration for reliable image hosting
- **📧 Automated Emails** - Brevo SMTP for transactional emails

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Cloudinary** account
- **Brevo** account for emails
- **Google OAuth credentials** (for social login)

### Clone the Repository
```bash
git clone https://github.com/HarshitRaj2712/Smart-Local-Service.git
cd Smart-Local-Service
```

### Backend Setup

1. **Navigate to Backend Directory**
```bash
cd Backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment Variables**
```bash
cp .env.example .env
```

4. **Configure .env File**
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_token_secret

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Brevo Email Service
BREVO_API_KEY=your_brevo_api_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

5. **Start Development Server**
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to Frontend Directory**
```bash
cd Frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment Variables**
```bash
cp .env.example .env
```

4. **Configure .env File**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

5. **Start Development Server**
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 📁 Project Structure

```
Smart-Local-Service/
├── Backend/
│   ├── config/              # Configuration files (Cloudinary, Passport)
│   ├── controllers/         # Business logic for routes
│   ├── middleware/          # Auth, upload, error handling
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API endpoints
│   ├── socket/              # WebSocket handlers
│   ├── utils/               # Helper functions
│   ├── server.js            # Main server file
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── api/             # API client configuration
│   │   ├── app/             # Redux store setup
│   │   ├── component/       # Reusable components
│   │   ├── features/        # Redux slices
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication Routes
```
POST   /api/auth/signup              # User registration
POST   /api/auth/login               # User login
POST   /api/auth/verify-email        # Email verification
POST   /api/auth/forgot-password     # Request password reset
POST   /api/auth/reset-password      # Reset password
```

### Provider Routes
```
GET    /api/provider/all             # List all providers
GET    /api/provider/:id             # Get provider details
POST   /api/provider/profile         # Create provider profile
PUT    /api/provider/profile         # Update provider profile
GET    /api/provider/analytics       # Get analytics data
```

### Booking Routes
```
GET    /api/booking/                 # Get user bookings
POST   /api/booking/create           # Create new booking
PUT    /api/booking/:id              # Update booking status
GET    /api/booking/:id              # Get booking details
```

### Chat Routes
```
GET    /api/chat/conversations       # Get all chats
POST   /api/chat/send                # Send message
GET    /api/chat/:conversationId     # Get conversation messages
```

### Review Routes
```
POST   /api/review/create            # Create review
GET    /api/review/provider/:id      # Get provider reviews
```

### Notification Routes
```
GET    /api/notification/            # Get user notifications
PUT    /api/notification/:id         # Mark as read
```

> Full API documentation available in API docs folder

---

## 🔐 Authentication Flow

1. **User Registration** → Email verification link sent
2. **Email Verification** → Account activated
3. **Login** → JWT token generated
4. **Token Storage** → Stored in secure HTTP-only cookies
5. **API Requests** → Token included in Authorization header
6. **Token Refresh** → Automatic refresh on expiration

**OAuth Integration:**
- Google authentication for quick signup/login
- Automatic profile creation on first OAuth login

---

## 💬 Real-time Features

### Socket.io Events

**Chat Events**
- `message:send` - Send message
- `message:receive` - Receive message
- `typing:start` - User typing indicator
- `typing:stop` - User stopped typing

**Notification Events**
- `notification:new` - New notification
- `notification:read` - Notification marked as read

**Booking Events**
- `booking:updated` - Booking status changed
- `booking:created` - New booking created

---

## 🧪 Testing

```bash
# Backend
cd Backend
npm test

# Frontend
cd Frontend
npm run lint
```

---

## 🔮 Future Roadmap

- [ ] **Payment Gateway** - Razorpay/Stripe integration for secure transactions
- [ ] **Geolocation Services** - Find nearest providers based on GPS
- [ ] **AI Recommendations** - Smart matching based on user history
- [ ] **Advanced Search Filters** - Filter by service type, price, rating
- [ ] **Service Subscriptions** - Monthly service packages
- [ ] **Mobile App** - React Native for iOS/Android
- [ ] **Provider Verification** - Advanced ID & credential verification
- [ ] **Dispute Resolution** - Built-in mediation system
- [ ] **Multi-language Support** - i18n for global reach

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Get Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit with descriptive messages (`git commit -m 'Add AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

### Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep PRs focused and reasonably sized

### Reporting Issues
- Check existing issues first
- Provide detailed bug reports with reproduction steps
- Include screenshots/error logs when applicable

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Harshit Raj** - [@HarshitRaj2712](https://github.com/HarshitRaj2712)

---

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Icons by Lucide React
- Charts powered by Chart.js
- Hosting & database services by MongoDB Atlas & Vercel

---

## 📞 Support

For support, email: support@smartlocalservice.com or open an issue on GitHub.

---

<div align="center">

**[⬆ back to top](#smart-local-service-)**

</div>

