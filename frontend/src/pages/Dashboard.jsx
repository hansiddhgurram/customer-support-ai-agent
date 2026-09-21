import DashboardStats from "../components/DashboardStats";
import AnalyticsCharts from "../components/AnalyticsCharts";
import TrendInsights from "../components/TrendInsights";

export default function Dashboard() {

  return (
    <>
      <DashboardStats />
      <AnalyticsCharts />
      <TrendInsights />
    </>
  );
}