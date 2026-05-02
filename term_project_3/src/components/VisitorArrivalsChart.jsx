import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function VisitorArrivalsChart({ arrivals }) {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Visitor Arrivals (in thousands)",
        data: arrivals,
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="chart-card">
      <h3>Visitor Arrivals</h3>
      <Bar data={data} />
    </section>
  );
}

export default VisitorArrivalsChart;