const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const Property = require("../models/Property");

const router = express.Router();

// GET /admin/dashboard
router.get("/dashboard", isAuthenticated, async (req, res) => {
  try {
    const properties = await Property.find({});

    const propertyRows = properties
      .map((property) => {
        return `
          <tr>
            <td>${property.name || "Unnamed Property"}</td>
            <td>${property.location || property.island || "N/A"}</td>
            <td>${property.description || "N/A"}</td>
          </tr>
        `;
      })
      .join("");

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admin Dashboard</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f2f7f5;
              margin: 0;
              padding: 0;
            }

            header {
              background: #0f766e;
              color: white;
              padding: 20px;
              text-align: center;
            }

            .container {
              max-width: 900px;
              margin: 30px auto;
              background: white;
              padding: 25px;
              border-radius: 14px;
              box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
            }

            h1, h2 {
              color: #0f766e;
            }

            .admin-info {
              background: #ecfdf5;
              padding: 12px;
              border-radius: 8px;
              margin-bottom: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
            }

            th {
              background: #ccfbf1;
            }

            .logout {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 16px;
              background: #0f766e;
              color: white;
              text-decoration: none;
              border-radius: 8px;
            }

            .logout:hover {
              background: #115e59;
            }

            @media (max-width: 600px) {
              .container {
                margin: 20px 12px;
                padding: 18px;
              }

              table {
                font-size: 14px;
              }
            }
          </style>
        </head>

        <body>
          <header>
            <h1>Hawaii Hospitality Dashboard</h1>
            <p>Protected Admin Area</p>
          </header>

          <div class="container">
            <div class="admin-info">
              <strong>Logged in as:</strong> ${req.user.email}
            </div>

            <h2>Welcome, Admin</h2>
            <p>This page is protected. Only logged-in admin users can see it.</p>

            <h2>Property List</h2>

            <table>
              <thead>
                <tr>
                  <th>Property Name</th>
                  <th>Location</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${
                  propertyRows ||
                  `<tr><td colspan="3">No properties found in MongoDB.</td></tr>`
                }
              </tbody>
            </table>

            <a class="logout" href="/admin/logout">Logout</a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error loading admin dashboard.");
  }
});

module.exports = router;