import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

function VisitorOriginChart({ origin }) {
  const data = {
    labels: ["Domestic", "Japan", "Canada", "Other"],
    datasets: [
      {
        label: "Visitor Origin",
        data: [origin.domestic, origin.japan, origin.canada, origin.other],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="chart-card">
      <h3>Visitor Origin</h3>
      <Pie data={data} />
    </section>
  );
}

export default VisitorOriginChart;