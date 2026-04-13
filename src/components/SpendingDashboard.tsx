import { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "./SpendingDashboard.scss";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

type CategorySpending = {
  category: string;
  amount: number;
};

const spendingData: CategorySpending[] = [
  { category: "Food", amount: 500 },
  { category: "Transport", amount: 200 },
  { category: "Shopping", amount: 300 },
  { category: "Bills", amount: 400 },
];

const monthlyTrend = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Spending ($)",
      data: [1200, 1050, 1400, 1100, 1350, 1400],
      backgroundColor: "rgba(30, 58, 95, 0.85)",
      borderRadius: 6,
      hoverBackgroundColor: "rgba(30, 58, 95, 1)",
    },
  ],
};

const PALETTE = [
  "rgba(30, 58, 95, 0.9)",
  "rgba(74, 144, 226, 0.9)",
  "rgba(210, 180, 120, 0.9)",
  "rgba(120, 190, 170, 0.9)",
];

const PALETTE_BORDER = [
  "rgba(30, 58, 95, 1)",
  "rgba(74, 144, 226, 1)",
  "rgba(210, 180, 120, 1)",
  "rgba(120, 190, 170, 1)",
];

export default function SpendingDashboard() {
  const totalSpending = useMemo(
    () => spendingData.reduce((sum, item) => sum + item.amount, 0),
    []
  );

  const pieData = useMemo(
    () => ({
      labels: spendingData.map((d) => d.category),
      datasets: [
        {
          data: spendingData.map((d) => d.amount),
          backgroundColor: PALETTE,
          borderColor: PALETTE_BORDER,
          borderWidth: 2,
        },
      ],
    }),
    []
  );

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" as const, labels: { padding: 20, font: { size: 13 } } },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; parsed: number }) =>
            `${ctx.label}: $${ctx.parsed} (${((ctx.parsed / totalSpending) * 100).toFixed(1)}%)`,
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v: string | number) => `$${v}` },
        grid: { color: "rgba(0,0,0,0.06)" },
      },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__brand">
          <span className="dashboard__logo">BV</span>
          <span className="dashboard__title">BlueVault</span>
        </div>
        <h1 className="dashboard__heading">Spending Dashboard</h1>
        <div className="dashboard__user">
          <span className="dashboard__bell">&#128276;</span>
          <span className="dashboard__avatar">MC</span>
        </div>
      </header>

      <main className="dashboard__body">
        <section className="dashboard__metrics">
          <div className="metric-card">
            <div className="metric-card__icon metric-card__icon--total">$</div>
            <div className="metric-card__info">
              <span className="metric-card__label">Total Spending</span>
              <span className="metric-card__value">
                ${totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-card__icon metric-card__icon--categories">#</div>
            <div className="metric-card__info">
              <span className="metric-card__label">Categories</span>
              <span className="metric-card__value">{spendingData.length}</span>
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-card__icon metric-card__icon--avg">~</div>
            <div className="metric-card__info">
              <span className="metric-card__label">Avg per Category</span>
              <span className="metric-card__value">
                ${(totalSpending / spendingData.length).toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        <section className="dashboard__charts">
          <div className="chart-card">
            <h2 className="chart-card__title">Spending by Category</h2>
            <div className="chart-card__canvas chart-card__canvas--pie">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
          <div className="chart-card">
            <h2 className="chart-card__title">Monthly Spending Trend</h2>
            <div className="chart-card__canvas">
              <Bar data={monthlyTrend} options={barOptions} />
            </div>
          </div>
        </section>

        <section className="dashboard__table-section">
          <div className="table-card">
            <h2 className="table-card__title">Category Breakdown</h2>
            <table className="spending-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Percentage</th>
                  <th>Bar</th>
                </tr>
              </thead>
              <tbody>
                {spendingData.map((item, idx) => {
                  const pct = ((item.amount / totalSpending) * 100).toFixed(1);
                  return (
                    <tr key={item.category}>
                      <td>
                        <span
                          className="spending-table__dot"
                          style={{ backgroundColor: PALETTE_BORDER[idx] }}
                        />
                        {item.category}
                      </td>
                      <td className="spending-table__amount">
                        ${item.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="spending-table__pct">{pct}%</td>
                      <td className="spending-table__bar-cell">
                        <div className="spending-table__bar-track">
                          <div
                            className="spending-table__bar-fill"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: PALETTE_BORDER[idx],
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td className="spending-table__amount">
                    ${totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                  <td className="spending-table__pct">100%</td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
