# 🌟 Social Media Full Stack Application

A modern full-stack social media platform with real-time chat, post sharing, user interactions, and more.

## 📖 Project Overview

This is a complete social media platform featuring user authentication, post management, real-time messaging, user following, Reels videos, and more. Built with React + Spring Boot technology stack for a smooth user experience.

## 🚀 Technology Stack

### Frontend
- **React 19** - Modern frontend framework
- **Vite** - Fast build tool
- **Material-UI (MUI)** - Modern UI component library
- **TailwindCSS** - Utility-first CSS framework
- **Redux + Redux Thunk** - State management
- **React Router** - Routing management
- **Formik + Yup** - Form handling and validation
- **Axios** - HTTP client
- **SockJS + STOMP** - WebSocket real-time communication

### Backend
- **Spring Boot 3.5.6** - Java enterprise framework
- **Spring Security** - Security authentication
- **Spring Data JPA** - Data persistence
- **Hibernate** - ORM framework
- **MySQL** - Relational database
- **JWT** - Stateless authentication
- **WebSocket** - Real-time communication
- **Maven** - Project management tool

## ✨ Key Features

### 🔐 User Authentication
- User registration and login
- JWT Token authentication
- Password encryption storage
- Automatic login state maintenance

### 📝 Post Management
- Create, edit, delete posts
- Image upload and display
- Like and comment functionality
- Post saving feature

### 💬 Real-time Chat
- One-on-one private messaging
- Real-time message push
- Image message support
- Chat history

### 🎥 Reels (Short Videos)
- Short video creation and sharing
- Video playback functionality
- User interactions

### 👥 User Interactions
- User search
- Follow/unfollow
- User profile management
- Popular user recommendations

### 🌙 User Experience
- Dark theme support
- Responsive design
- Smooth animations
- Intuitive user interface


## 🛠️ Installation and Setup

### Prerequisites
- **Node.js** >= 18.0.0
- **Java** >= 17
- **MySQL** >= 8.0
- **Maven** >= 3.6

### Database Configuration

1. Create MySQL database:
```sql
CREATE DATABASE social_media;
```

2. Update backend configuration file `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/social_media
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Backend Setup

1. Navigate to Spring Boot project directory:
```bash
cd springBoot/demo
```

2. Start the backend service:
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

Backend service will start at `http://localhost:5454`

### Frontend Setup

1. Navigate to React project directory:
```bash
cd react
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend application will start at `http://localhost:3000`



## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```
Build artifacts will be in the `dist/` directory

### Backend Deployment
```bash
./mvnw clean package
```
JAR file will be in the `target/` directory


## 🌟 Features in Detail

### Authentication System
- Secure user registration with email validation
- JWT-based stateless authentication
- Password strength validation
- Automatic token refresh

### Post System
- Rich text and image posts
- Real-time like and comment updates
- Post privacy settings
- Content moderation capabilities

### Messaging System
- End-to-end real-time messaging
- File and image sharing
- Message status indicators
- Chat history persistence

### User Profile System
- Customizable user profiles
- Profile picture upload
- User activity tracking
- Privacy settings



### Backend
```cmd
cd springboot/demo
mvn spring-boot:run
```
