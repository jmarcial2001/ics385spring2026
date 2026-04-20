import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import WeatherWidget from "./WeatherWidget";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard({ selectedIsland }) {
  const monthlyVisitorsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: `${selectedIsland} Visitors (in thousands)`,
        data: [684, 712, 798, 820, 845, 833],
        borderWidth: 1,
      },
    ],
  };

  const revenueTrendData = {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: [
      {
        label: "Visitor Spending ($ millions)",
        data: [980, 1240, 1385, 1490, 1560],
        tension: 0.3,
      },
    ],
  };

  const visitorTypeData = {
    labels: ["Couples", "Families", "Business", "Solo"],
    datasets: [
      {
        label: "Visitor Types",
        data: [34, 31, 21, 14],
      },
    ],
  };

  return (
    <section className="dashboard">
      <h2>Visitor Statistics Dashboard</h2>

      <div className="chart-box">
        <h3>Monthly Visitors</h3>
        <Bar data={monthlyVisitorsData} />
      </div>

      <div className="chart-box">
        <h3>Tourism Revenue Trend</h3>
        <Line data={revenueTrendData} />
      </div>

      <div className="chart-box">
        <h3>Visitor Type Breakdown</h3>
        <Pie data={visitorTypeData} />
      </div>

      <WeatherWidget />
    </section>
  );
}

export default Dashboard;