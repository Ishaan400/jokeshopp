# Joke Shop API

A RESTful API backend for the Joke Shop e-commerce platform, built with Node.js, Express, and MongoDB.

> **Note**: The frontend for this application is built using AI.

## API Endpoints

### Authentication

#### Register User
```http
POST /api/users
```

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

Response:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

#### Login User
```http
POST /api/users/login
```

Request Body:
```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

Response:
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "JWT_TOKEN"
}
```

### Products

#### Get All Products
```http
GET /api/products
```

Query Parameters:
- `category` (optional): Filter products by category

Response:
```json
[
  {
    "_id": "product_id",
    "name": "Product Name",
    "price": 19.99,
    "description": "Product description",
    "image": "image_url",
    "warning": "Optional warning message",
    "category": "Product category"
  }
]
```

#### Get Single Product
```http
GET /api/products/:id
```

Response:
```json
{
  "_id": "product_id",
  "name": "Product Name",
  "price": 19.99,
  "description": "Product description",
  "image": "image_url",
  "warning": "Optional warning message",
  "category": "Product category"
}
```

### Cart

> **Note**: All cart endpoints require authentication. Include the JWT token in the Authorization header:
> ```
> Authorization: Bearer YOUR_JWT_TOKEN
> ```

#### Get User Cart
```http
GET /api/cart
```

Response:
```json
{
  "_id": "cart_id",
  "user": "user_id",
  "items": [
    {
      "product": {
        "_id": "product_id",
        "name": "Product Name",
        "price": 19.99,
        "description": "Product description",
        "image": "image_url",
        "category": "Product category"
      },
      "quantity": 1
    }
  ]
}
```

#### Add Item to Cart
```http
POST /api/cart
```

Request Body:
```json
{
  "productId": "product_id",
  "quantity": 1
}
```

Response: Updated cart object

#### Remove Item from Cart
```http
DELETE /api/cart/:productId
```

Response: Updated cart object

## Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  price: Number,
  description: String,
  image: String,
  warning: String (optional),
  category: String
}
```

### Cart Model
```javascript
{
  user: ObjectId (ref: 'User'),
  items: [{
    product: ObjectId (ref: 'Product'),
    quantity: Number
  }]
}
```

## Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000 (default)
JWT_SECRET=your_jwt_secret_key
```

## Project Structure

```
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── userController.js     # Authentication handlers
│   ├── productController.js  # Product route handlers
│   └── cartController.js     # Cart route handlers
├── middleware/
│   ├── authMiddleware.js     # JWT authentication middleware
│   └── errorMiddleware.js    # Error handling middleware
├── models/
│   ├── userModel.js         # User schema
│   ├── productModel.js      # Product schema
│   └── cartModel.js         # Cart schema
├── routes/
│   ├── userRoutes.js        # Authentication routes
│   ├── productRoutes.js     # Product routes
│   └── cartRoutes.js        # Cart routes
├── utils/
│   └── generateToken.js     # JWT token generator
└── server.js                # Main application file
```

## Authentication

The API uses JSON Web Tokens (JWT) for authentication:

1. Users register or login to receive a JWT token
2. The token must be included in the Authorization header for protected routes
3. Tokens expire after 30 days
4. Password hashing is handled automatically using bcrypt
5. Email addresses must be unique

## Error Handling

The API uses a consistent error response format:

```json
{
  "message": "Error message",
  "stack": "Error stack trace (development only)"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

Authentication-specific errors:
- 401: Invalid credentials
- 401: No token provided
- 401: Invalid token
- 400: User already exists (during registration)

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Request body parsing with size limits
- Error handling middleware
- MongoDB connection error handling
- Protected routes middleware
- Token expiration
- Secure password storage
