# Salon Management System

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

A comprehensive salon management system built with Spring Boot backend and React frontend applications for both administrators and clients.

## 🏗️ Architecture

### Backend (Spring Boot)

- **Framework**: Spring Boot 3.2.2 with Java 17
- **Database**: MySQL with JPA/Hibernate
- **Security**: JWT-based authentication
- **API Documentation**: OpenAPI/Swagger
- **Monitoring**: Spring Boot Actuator
- **Build Tool**: Maven

### Frontend

- **Admin Panel**: React 18.2.0 with Material-UI
- **Client Portal**: React 18.2.0 with Bootstrap
- **State Management**: Redux
- **HTTP Client**: Axios

## 📁 Project Structure

```
salon-management-system/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/com/jamsy/shop/
│   │   ├── config/            # Configuration classes
│   │   ├── controller/        # REST Controllers
│   │   ├── dto/              # Data Transfer Objects
│   │   │   ├── request/      # Request DTOs
│   │   │   └── response/     # Response DTOs
│   │   ├── entity/           # JPA Entities
│   │   ├── exception/        # Exception handling
│   │   ├── repository/       # Data Access Layer
│   │   ├── service/          # Business Logic
│   │   ├── auth/             # Authentication logic
│   │   ├── constants/        # Application constants
│   │   └── utilities/        # Utility classes
│   ├── src/main/resources/
│   │   ├── application.yml           # Main configuration
│   │   ├── application-dev.yml      # Development profile
│   │   ├── application-prod.yml     # Production profile
│   │   └── FinancialReport.jrxml    # Report template
│   └── src/test/java/        # Test classes
├── frontend-admin/            # Admin Panel (React)
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── actions/         # Redux actions
│   │   ├── reducers/        # Redux reducers
│   │   ├── store/           # Redux store
│   │   └── utils/           # Utility functions
├── frontend-client/           # Client Portal (React)
│   └── src/                 # Similar structure to admin
└── process/                  # Project documentation
```

## 🚀 Features

### Core Functionality

- **User Management**: Registration, authentication, role-based access
- **Appointment Booking**: Schedule and manage salon appointments
- **Employee Management**: Staff scheduling and attendance tracking
- **Service Management**: Define and manage salon services
- **Product Inventory**: Track and manage salon products
- **Financial Reporting**: Generate reports and track revenue
- **Customer Reviews**: Collect and manage customer feedback
- **Contact Management**: Handle customer inquiries

### Technical Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Security**: Different access levels for admin/client
- **File Upload**: Handle image and document uploads
- **API Documentation**: Interactive Swagger UI
- **Environment Profiles**: Separate configs for dev/prod
- **Exception Handling**: Centralized error management
- **Data Validation**: Request/response validation
- **Audit Logging**: Track entity changes
- **Health Monitoring**: Application health endpoints

## 🛠️ Installation & Setup

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.8 or higher

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/MuhammedJamzeeth/Salon-Management-System.git
   cd Salon-Management-System/backend
   ```

2. **Configure Database**

   ```sql
   CREATE DATABASE salon_management;
   CREATE DATABASE salon_management_dev; -- For development
   ```

3. **Update Configuration**

   - Copy `application.yml` and update database credentials
   - Or set environment variables:
     ```bash
     export DB_URL=jdbc:mysql://localhost:3306/salon_management
     export DB_USERNAME=your_username
     export DB_PASSWORD=your_password
     export JWT_SECRET=your_jwt_secret_key
     ```

4. **Build and Run**

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Access API Documentation**
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - Health Check: http://localhost:8080/actuator/health

### Frontend Setup

#### Admin Panel

```bash
cd frontend-admin
npm install
npm start
```

Access at: http://localhost:3000

#### Client Portal

```bash
cd frontend-client
npm install
npm start
```

Access at: http://localhost:3001

## 🔧 Configuration

### Environment Profiles

- **Development** (`dev`):

  - H2/MySQL database
  - Detailed logging
  - All actuator endpoints enabled

- **Production** (`prod`):
  - MySQL database only
  - Minimal logging
  - Restricted actuator endpoints

### Environment Variables

| Variable          | Description           | Default                                        |
| ----------------- | --------------------- | ---------------------------------------------- |
| `DB_URL`          | Database URL          | `jdbc:mysql://localhost:3306/salon_management` |
| `DB_USERNAME`     | Database username     | `root`                                         |
| `DB_PASSWORD`     | Database password     | `jamzee`                                       |
| `JWT_SECRET`      | JWT signing key       | (default provided)                             |
| `JWT_EXPIRATION`  | JWT expiration time   | `60000000` (1 day)                             |
| `FILE_UPLOAD_DIR` | File upload directory | `./uploads`                                    |

## 📊 API Endpoints

### Authentication

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh token
- `POST /api/v1/auth/logout` - User logout

### Core Resources

- `/api/v1/users` - User management
- `/api/v1/appointments` - Appointment management
- `/api/v1/employees` - Employee management
- `/api/v1/services` - Service management
- `/api/v1/products` - Product management
- `/api/v1/financial` - Financial reporting
- `/api/v1/reviews` - Review management
- `/api/v1/contact` - Contact management

## 🧪 Testing

### Run Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend-admin
npm test

cd frontend-client
npm test
```

### Test Coverage

- Unit tests for service layer
- Integration tests for API endpoints
- Frontend component tests

## 🚀 Deployment

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment

1. Build the application: `mvn clean package`
2. Deploy JAR file to server
3. Configure production database
4. Set environment variables
5. Start application: `java -jar salon-management-shop.jar`

## 🔒 Security

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration
- Input validation
- SQL injection prevention
- XSS protection

## 📈 Monitoring

- Health checks via Spring Boot Actuator
- Application metrics
- Custom business metrics
- Log aggregation support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: Muhammed Jamzeeth
- **Repository**: [GitHub](https://github.com/MuhammedJamzeeth/Salon-Management-System)

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Email: support@salonmanagement.com

---

**Happy Coding! 🎉**
