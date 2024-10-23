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
    - **Exact Instructions**:
      ```javascript
      app.post('/register', async (req, res) => {
          const { username, password } = req.body; // Extract username and password from request body
          try {
              await knex('users').insert({ username, password }); // Insert new user into the database
              res.status(201).send('User registered successfully'); // Send success response
          } catch (error) {
              res.status(500).send('Error registering user'); // Send error response if registration fails
          }
      });
      ```
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
            - Ensure the route is accessible only after successful login.
            - **Exact Instructions**:
              ```javascript
              // Configure session middleware
              app.use(session({
                  secret: 'keyboard cat', // Secret key for signing the session ID cookie
                  resave: false, // Do not save session if unmodified
                  saveUninitialized: true // Save uninitialized sessions
              }));
  
              // Middleware to check if the user is authenticated
              const isAuthenticated = (req, res, next) => {
                  if (req.session && req.session.userId) { // Check if session and userId exist
                      return next(); // User is authenticated, proceed to the next middleware/route handler
                  } else {
                      res.status(401).send('Unauthorized'); // User is not authenticated, send 401 status
                  }
              };
  
              app.get('/homepage', isAuthenticated, (req, res) => {
              console.log("success")
              res.sendFile(path.join(__dirname, 'homepage.html')); // Serve the homepage.html file
              });
              ```

## Tips and Tricks

- **Use Async/Await**: For cleaner and more readable code, use async/await for database operations.
- **Error Handling**: Always handle errors and send meaningful responses to the client.
- **Validation**: Validate user input to prevent SQL injection and other security issues.
- **Testing**: Test your routes using tools like Postman or curl to ensure they work as expected.