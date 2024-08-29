import React, { useContext, useEffect, useState } from "react";

import Layout from "../../layout/Layout";
import { ContextPanel } from "../../utils/ContextPanel";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../base/BaseUrl";
import axios from "axios";
import DashboardCard from "../../components/DashboardCard";

const Home = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPanelUp } = useContext(ContextPanel);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (!isPanelUp) {
          navigate("/maintenance");
          return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/panel-fetch-dashboard/202425`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboard(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
    setLoading(false);
  }, []);

  return (
    <Layout>
      <div className="mt-12">
        {loading ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            Loading...
          </div>
        ) : dashboard ? (
          <>
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Today Print
              </h2>
              <div className="flex flex-wrap">
                <DashboardCard
                  title="Current Day Print"
                  value={dashboard.current_day_printing_count}
                />
                <DashboardCard
                  title="One Day Back Print"
                  value={dashboard.one_day_back_printing_count}
                />
                <DashboardCard
                  title="Two Days Back Print"
                  value={dashboard.two_day_back_printing_count}
                />
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Print Sum
              </h2>
              <div className="flex flex-wrap">
                <DashboardCard
                  title="Current Day Sum"
                  value={dashboard.current_day_printing_sum}
                />
                <DashboardCard
                  title="One Day Back Sum"
                  value={dashboard.one_day_back_printing_sum}
                />
                <DashboardCard
                  title="Two Days Back Sum"
                  value={dashboard.two_day_back_printing_sum}
                />
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Total Print
              </h2>
              <div className="flex flex-wrap gap-6">
                <DashboardCard
                  title="Total Print Count"
                  value={dashboard.total_printing_count}
                />
                <DashboardCard
                  title="Total Print Sum"
                  value={dashboard.total_printing_sum}
                />
              </div>
            </section>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            No data available
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
