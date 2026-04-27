const express = require("express");
const passport = require("passport");

const router = express.Router();

// GET /admin/login
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard");
  }

  const error = req.query.error;

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Admin Login</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f2f7f5;
            margin: 0;
            padding: 0;
          }

          .login-container {
            max-width: 420px;
            margin: 60px auto;
            background: white;
            padding: 30px;
            border-radius: 14px;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
          }

          h1 {
            color: #0f766e;
            text-align: center;
            margin-bottom: 8px;
          }

          p {
            text-align: center;
            color: #555;
          }

          label {
            display: block;
            margin-top: 18px;
            font-weight: bold;
            color: #333;
          }

          input {
            width: 100%;
            padding: 12px;
            margin-top: 6px;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 16px;
          }

          button {
            width: 100%;
            margin-top: 24px;
            padding: 12px;
            background: #0f766e;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
          }

          button:hover {
            background: #115e59;
          }

          .error {
            background: #fee2e2;
            color: #991b1b;
            padding: 10px;
            border-radius: 8px;
            margin-top: 15px;
            text-align: center;
          }

          @media (max-width: 480px) {
            .login-container {
              margin: 30px 16px;
              padding: 22px;
            }
          }
        </style>
      </head>

      <body>
        <div class="login-container">
          <h1>Hawaii Hospitality Dashboard</h1>
          <p>Admin Login</p>

          ${error ? `<div class="error">Invalid credentials. Please try again.</div>` : ""}

          <form action="/admin/login" method="POST">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="admin@example.com" 
              required 
            />

            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
            />

            <button type="submit">Log In</button>
          </form>
        </div>
      </body>
    </html>
  `);
});

// POST /admin/login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login?error=1",
  })
);

// GET /admin/logout
router.get("/logout", (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect("/admin/login");
  });
});

module.exports = router;