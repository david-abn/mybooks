'use client';
import { useEffect, useState } from "react";
import Welcome from "../ui/dashboard/welcome";
import { useAuth } from "../context/auth-context";
import config from "../utils/config";

export default function Home() {

  const apiUrl = config.apiUrl;
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<BookMetricsData | undefined>();
  const { user } = useAuth();

  const fetchDashboardMetrics = async () => {
    try {
      const dashboardResponse = await fetch(`${apiUrl}/api/dashboard`, {
        credentials: 'include'
      })
      const dashboardData = await dashboardResponse.json();
      setData(dashboardData);

    } catch (err) {
      console.error('Unable to fetch dashboard data:', err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetchDashboardMetrics();
    }
  }, [user])

  return (
    <>
      {!loading && data ?
        <Welcome data={data} user={user} />
        :
        <span> Loading ..</span>
      }
    </>
  )
}
