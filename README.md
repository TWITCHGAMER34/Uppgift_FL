# Student Project

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run database migrations:
    ```sh
    npm run migrate
    ```
4. Start the server:
    ```sh
    npm start
    ```
5. Open `index.html` in your browser to access the application.

## Routes

- `POST /register` - Register a new user.
- `POST /login` - Login a user.
- `GET /homepage` - Access the homepage.

## Instructions to Start Coding Routes

1. **Register Route**:
   - Open `server.js`.
   - Locate the `/register` route.
   - Add logic to insert a new user into the database.
   - **Tip**: Use `knex('users').insert({ username, password })` to insert a new user.
   - **Tip**: Handle errors gracefully and send appropriate HTTP status codes.

2. **Login Route**:
   - Open `server.js`.
   - Locate the `/login` route.
   - Add logic to authenticate the user.
   - **Tip**: Use `knex('users').where({ username, password }).first()` to find the user.
   - **Tip**: Send a 401 status code for invalid credentials and 200 for successful login.

3. **Homepage Route**:
   - Open `server.js`.
   - Locate the `/homepage` route.
   - Add logic to display the homepage content.
   - **Tip**: Use `res.send('<h1>Welcome to the homepage!</h1>')` to send HTML content.
   - **Tip**: Ensure the route is accessible only after successful login (optional).

## Tips and Tricks

- **Use Async/Await**: For cleaner and more readable code, use async/await for database operations.
- **Error Handling**: Always handle errors and send meaningful responses to the client.
- **Validation**: Validate user input to prevent SQL injection and other security issues.
- **Environment Variables**: Use environment variables to manage sensitive information like database connection strings.
- **Testing**: Test your routes using tools like Postman or curl to ensure they work as expected.