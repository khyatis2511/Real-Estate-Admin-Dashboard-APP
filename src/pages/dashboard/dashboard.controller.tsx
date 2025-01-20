import { useEffect, useState } from "react";
import SidebarLayout from "../../components/layouts/sidebar.layout";
import DashboardView from "./dashboard.view";
import { getAnalyticsLogsAPI } from "../../lib/api/analytics.api";
import { getUserCountsAPI } from "../../lib/api/users.api";

const DashboardController: React.FC = () => {
  const [newUserCount, setNewUserCount] = useState(0);
  const [existingUserCount, setExistingUserCount] = useState(0);
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [analytics, setAnalytics] = useState(null);

  const dauData = [
    { date: '2025-01-01', count: 100 },
    { date: '2025-01-02', count: 120 },
    { date: '2025-01-03', count: 130 },
    // Add more daily data...
  ];

  const mauData = [
    { date: '2025-01', count: 500 },
    { date: '2025-02', count: 550 },
    { date: '2025-03', count: 600 },
    // Add more monthly data...
  ];

  const getAnalyticsLogs = async () => {
    try {
      const response = await getAnalyticsLogsAPI();
      if(response?.success) {
        console.log('this is re:', response);
        setAnalytics(response.data);
      }
    } catch (error) {
      console.log('[getAnalyticsLogs error :]', error);
    }
  }

  const getUserCounts = async () => {
    try {
      const response = await getUserCountsAPI();
      if(response?.success) {
        setExistingUserCount(response.data.existingUserCount);
        setNewUserCount(response.data.newUserCount);
        setTotalUserCount(response.data.totalUserCount);
      }
    } catch (error) {
      console.log('[getAnalyticsLogs error :]', error);
    }
  }

  useEffect(() => {
    getAnalyticsLogs()
    getUserCounts()
  }, []);

  return (
    <SidebarLayout>
      <DashboardView
        newUserCount={newUserCount}
        existingUserCount={existingUserCount}
        totalUserCount={totalUserCount}
        dauData={dauData}
        mauData={mauData}
      />
     </SidebarLayout>
  );
};


export default DashboardController;
  