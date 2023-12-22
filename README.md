# UnityLab Backend

This repository contains the backend API for UnityLab, an e-commerce marketplace.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Issues](#issues)
- [License](#license)

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/try/download/community) (Community Edition)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ShreyaParker/unitylab-backend.git
   cd unitylab-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Environment Variables

1. Create a .env file in the root directory with the following content:

   ```env
   PORT=your-localhost-port
   MONGOURI=your-mongodb-uri
   SECRET_KEY=your-jwt-secret
   ```

2. Replace:

   `your-localhost-port`: with any available local host port such as 3000 , 5000 or 8000

   `your-mongodb-uri`: with your MongoDB connection URI

   `your-jwt-secret`: with a secret key for JWT authentication

## API Endpoints
1. Auth APIs:

   `POST /api/auth/register`: Register a user.
   
   `POST /api/auth/login`: Login a user.

3. Buyer APIs:

   `GET /api/buyer/list-of-sellers`: Get a list of all sellers.

   `GET /api/buyer/seller-catalog/:seller_id`: Get the catalog of a specific seller.

   `POST /api/buyer/create-order/:seller_id`: Create an order for a seller.

4. Seller APIs:

   `POST /api/seller/create-catalog`: Create a catalog of items.
  
   `GET /api/seller/orders`: Get a list of orders received


## Authorization Token

To interact with protected routes in this API, you need to include an authorization token in your request headers. Follow the steps below to obtain and use the token:

1. **Register or Login**: Use the following API endpoints to register or login to the system.

   - Register a new user:
     ```
     POST /api/auth/register
     ```

   - Login with existing credentials:
     ```
     POST /api/auth/login
     ```

2. **Obtain Token**: After successfully registering or logging in, the API response will include an authentication token. Extract the token from the response.

3. **Include Token in Requests**: For any request to protected routes, include the obtained token in the `Authorization` header of your HTTP request.

   Example in Postman:
   Open the request.
   Go to the "Headers" tab.
   Add a new header with the key Authorization and the value `Bearer YOUR_AUTH_TOKEN`


## Contributing

Feel free to contribute to the project. Follow the standard Git workflow:

1. Fork the repository.

2. Create a new branch (git checkout -b feature/your-feature).

3. Commit your changes (git commit -am 'Add your feature').

4. Push to the branch (git push origin feature/your-feature).

5. Open a pull request.


## Issues

If you encounter any issues or have suggestions, please open an issue on the Issues page.

## License

This project is licensed under the MIT License.
