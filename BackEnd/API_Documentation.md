# API Documentation

## Authentication APIs

### Register User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully. Please verify your email to activate your account.",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "isVerified": "boolean"
    }
  }
  ```

### Verify Email
- **URL**: `/api/auth/verify_email`
- **Method**: `POST`
- **Description**: Verifies a user's email address.
- **Request Body**:
  ```json
  {
    "email": "string",
    "code": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Email verified successfully",
    "token": "string"
  }
  ```

### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in a user and returns a token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```

### Reset Password
- **URL**: `/api/auth/reset-password/:token`
- **Method**: `PATCH`
- **Description**: Resets a user's password.
- **Request Body**:
  ```json
  {
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset successfully"
  }
  ```
  # Google Authentication APIs

## Google Login
- **URL**: `/api/auth/google`
- **Method**: `GET`
- **Description**: Initiates the Google OAuth2 authentication flow.
- **Request Parameters**: None
- **Response**: Redirects the user to the Google login page.

## Google Callback
- **URL**: `/api/auth/google/callback`
- **Method**: `GET`
- **Description**: Handles the callback from Google after authentication.
  - Verifies the user and generates a JWT token.
  - If authentication fails, the user is redirected to `/login`.

- **Response (Success)**:
  ```json
  {
    "message": "Google authentication successful",
    "token": "string",
    "user": {
      "email": "string",
      "name": "string",
      "role": "string"
    }
  }
  ```

- **Response (Error)**:
  ```json
  {
    "message": "Google authentication failed",
    "error": "string"
  }
  ```


---

## User APIs

### Get All Users (Admin)
- **URL**: `/api/admin/users`
- **Method**: `GET`
- **Description**: Retrieves all users (admin only).
- **Response**:
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "isVerified": "boolean"
    }
  ]
  ```

### Delete User (Admin)
- **URL**: `/api/admin/users/:email`
- **Method**: `DELETE`
- **Description**: Deletes a user by email (admin only).
- **Response**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

---

## Court APIs

### Add Court (Admin)
- **URL**: `/api/admin/courts`
- **Method**: `POST`
- **Description**: Adds a new court (admin only).
- **Request Body**:
  ```json
  {
    "name": "string",
    "location": "string",
    "type": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Court added successfully",
    "court": {
      "id": "string",
      "name": "string",
      "location": "string",
      "type": "string"
    }
  }
  ```

### Update Court (Admin)
- **URL**: `/api/admin/courts/:id`
- **Method**: `PATCH`
- **Description**: Updates an existing court by ID (admin only).
- **Request Body**:
  ```json
  {
    "name": "string",
    "location": "string",
    "type": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Court updated successfully"
  }
  ```

### Delete Court (Admin)
- **URL**: `/api/admin/courts/:id`
- **Method**: `DELETE`
- **Description**: Deletes a court by ID (admin only).
- **Response**:
  ```json
  {
    "message": "Court deleted successfully"
  }
  ```

---

## Reservation APIs

### Get Reservations by User
- **URL**: `/api/reservations/user/:user`
- **Method**: `GET`
- **Description**: Retrieves reservations for a specific user.
- **Response**:
  ```json
  [
    {
      "id": "string",
      "court": "string",
      "date": "string",
      "status": "string"
    }
  ]
  ```

### Add Reservation
- **URL**: `/api/reservations`
- **Method**: `POST`
- **Description**: Adds a new reservation.
- **Request Body**:
  ```json
  {
    "court": "string",
    "date": "string"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Reservation created successfully",
    "reservation": {
      "id": "string",
      "court": "string",
      "date": "string",
      "status": "string"
    }
  }
  ```

### Cancel Reservation
- **URL**: `/api/reservations/:id/cancel`
- **Method**: `PATCH`
- **Description**: Cancels a reservation by ID.
- **Response**:
  ```json
  {
    "message": "Reservation cancelled successfully"
  }
  ```
