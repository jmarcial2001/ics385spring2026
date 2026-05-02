import { useEffect, useState } from "react";
import IslandSelector from "../components/IslandSelector";
import WeatherWidget from "../components/WeatherWidget";
import KPICards from "../components/KPICards";
import VisitorArrivalsChart from "../components/VisitorArrivalsChart";
import VisitorOriginChart from "../components/VisitorOriginChart";

function AdminDashboard() {
  const [selectedIsland, setSelectedIsland] = useState("Oahu");
  const [dashboardData, setDashboardData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [offerTitle, setOfferTitle] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function checkLogin() {
      try {
        const response = await fetch("http://localhost:3000/admin/check", {
          credentials: "include",
        });

        const data = await response.json();

        if (data.loggedIn) {
          setAdminUser(data.user);
        } else {
          setStatus("You must log in to view the admin dashboard.");
        }
      } catch (error) {
        console.error("Login check error:", error);
        setStatus("Could not check login status.");
      }
    }

    checkLogin();
  }, []);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/dashboard?island=${selectedIsland}`
        );

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchDashboardData();
  }, [selectedIsland]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await fetch("http://localhost:3000/properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    }

    fetchProperties();
  }, []);

  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:3000/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setAdminUser(null);
        setStatus("Logged out successfully.");
      } else {
        setStatus("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      setStatus("Something went wrong logging out.");
    }
  }

  async function handleOfferSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: offerTitle,
          message: offerMessage,
        }),
      });

      if (response.ok) {
        setStatus("Special offer posted successfully.");
        setOfferTitle("");
        setOfferMessage("");
      } else {
        setStatus("You must be logged in to post an offer.");
      }
    } catch (error) {
      console.error("Offer error:", error);
      setStatus("Something went wrong posting the offer.");
    }
  }

  if (!dashboardData) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Malama Waikiki Resort Admin Dashboard</h2>

          {adminUser ? (
            <p className="admin-subtitle">
              Logged in as <strong>{adminUser.email}</strong>
            </p>
          ) : (
            <p className="admin-subtitle">Admin session not active.</p>
          )}
        </div>

        <button onClick={handleLogout}>Log Out</button>
      </div>

      {status && <p className="form-message">{status}</p>}

      <section className="admin-summary-grid">
        <div className="admin-summary-card">
          <h3>Total Properties</h3>
          <p>{properties.length}</p>
        </div>

        <div className="admin-summary-card">
          <h3>Selected Island</h3>
          <p>{selectedIsland}</p>
        </div>

        <div className="admin-summary-card">
          <h3>Dashboard City</h3>
          <p>{dashboardData.city}</p>
        </div>
      </section>

      <div className="dashboard-top">
        <IslandSelector
          selectedIsland={selectedIsland}
          setSelectedIsland={setSelectedIsland}
        />

        <WeatherWidget city={dashboardData.city} />
      </div>

      <KPICards metrics={dashboardData.metrics} />

      <div className="chart-grid">
        <VisitorArrivalsChart arrivals={dashboardData.arrivals} />
        <VisitorOriginChart origin={dashboardData.origin} />
      </div>

      <section className="section admin-panel-section">
        <h2>Property Records</h2>
        <p>
          These records are pulled from MongoDB and show the properties currently
          stored in the project database.
        </p>

        <div className="property-table-wrapper">
          <table className="property-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Island</th>
                <th>Type</th>
                <th>Target Segment</th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr key={property._id}>
                  <td>{property.name}</td>
                  <td>{property.island}</td>
                  <td>{property.type}</td>
                  <td>{property.targetSegment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section admin-panel-section">
        <h2>Post Special Offer</h2>
        <p>
          Admins can post one active special offer or announcement that appears
          on the public marketing page.
        </p>

        <form className="offer-form" onSubmit={handleOfferSubmit}>
          <input
            type="text"
            placeholder="Offer title"
            value={offerTitle}
            onChange={(event) => setOfferTitle(event.target.value)}
            required
          />

          <textarea
            placeholder="Offer message"
            value={offerMessage}
            onChange={(event) => setOfferMessage(event.target.value)}
            required
          />

          <button type="submit">Post Offer</button>
        </form>
      </section>
    </main>
  );
}

export default AdminDashboard;