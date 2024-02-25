'use client';
import { useEffect, useState } from "react";
import Welcome from "../ui/dashboard/welcome";
import { useAuth } from "../context/auth-context";

export default function Home() {


  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BookMetricsData | undefined>();

  const fetchDashboardMetrics = async () => {
    try {
      const dashboardResponse = await fetch('https://localhost:4000/api/dashboard', {
        credentials: 'include'
      })
      const dashboardData = await dashboardResponse.json();
      console.log(dashboardData);
      setData(dashboardData);
    } catch (err) {
      console.error('Unable to fetch dashboard data:', err);

    }
    setLoading(false);
  }

  useEffect(() => {

    // if (loading) return;
    fetchDashboardMetrics();

  }, [])
  return (
    <>
      <Welcome data={data} loading={loading} />

      {/* Display total number of books in bookshelf.
    Display number of books read
    Display number of books not started */}
    </>
  )
}
