"use client";

import { useEffect, useState } from "react";
import Title from "../components/Title";
import Section from "../components/Section";
import Input from "../components/Input";
import Button from "../components/Button";
import { useToast } from "../contexts/ToastContext";
import { fetchData } from "@/modules/Fetch";
import { useRouter, useSearchParams } from "next/navigation";
import Constants from "@/utils/Constants";
import UserMetrics from "../components/DashboardCharts/UserMetrics";
import RevenueMetrics from "../components/DashboardCharts/RevenueMetrics";
import TrackMetrics from "../components/DashboardCharts/TrackMetrics";

const { DASHBOARD_TAB_REVENUE_METRICS, DASHBOARD_TAB_USER_METRICS, DASHBOARD_TAB_TRACK_METRICS } =
  Constants;

const Dashboard = () => {
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dataVizData, setDataVizData] = useState(null);
  const [tab, setTab] = useState(searchParams.get("tab") || DASHBOARD_TAB_REVENUE_METRICS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    const response = await fetchData("/dashboard", "POST", { username, password });

    switch (response?.status) {
      case 200:
        setDataVizData((await response.json()).data);
        showToast("Data refreshed successfully 🎉", "success");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }

    setIsRefreshing(false);
  };

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    setTab(currentTab || DASHBOARD_TAB_REVENUE_METRICS);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    const response = await fetchData("/dashboard", "POST", { username, password });

    switch (response?.status) {
      case 200: {
        const { data } = await response.json();
        setDataVizData(data);
        break;
      }

      case 401:
        showToast("Invalid credentials.", "error");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  return (
    <>
      <title>Dashboard | ShopTracker</title>
      <meta name="description" content="Dashboard page for ShopTracker." />
      <Section>
        <div className="flex items-center justify-center pb-3">
          <Title className="relative inline-block pb-2 text-3xl lg:text-4xl">
            📊 Dashboard
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-secondary via-tertiary to-quaternary"></div>
          </Title>
        </div>
        {!dataVizData ? (
          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-md flex-col items-center space-y-6">
              <form className="flex w-full max-w-md flex-col space-y-4" onSubmit={handleSubmit}>
                <Input
                  id="username"
                  labelText="Username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                  id="password"
                  labelText="Password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex items-center justify-end">
                  <Button type="quaternary" buttonType="submit">
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-center pb-3 sm:flex-nowrap sm:space-x-4">
              <Button
                locked
                className={`m-1 transition-all duration-300 ${tab === DASHBOARD_TAB_REVENUE_METRICS ? "shadow-lg shadow-secondary/10" : ""}`}
                type={tab === DASHBOARD_TAB_REVENUE_METRICS ? "primary" : "contrast"}
                defaultCursor
                onClick={() => {
                  router.push(`/dashboard?tab=${DASHBOARD_TAB_REVENUE_METRICS}`);
                }}
              >
                Revenue Metrics
              </Button>
              <Button
                locked
                className={`m-1 transition-all duration-300 ${tab === DASHBOARD_TAB_USER_METRICS ? "shadow-lg shadow-secondary/10" : ""}`}
                type={tab === DASHBOARD_TAB_USER_METRICS ? "primary" : "contrast"}
                defaultCursor
                onClick={() => {
                  router.push(`/dashboard?tab=${DASHBOARD_TAB_USER_METRICS}`);
                }}
              >
                User Metrics
              </Button>
              <Button
                locked
                className={`m-1 transition-all duration-300 ${tab === DASHBOARD_TAB_TRACK_METRICS ? "shadow-lg shadow-secondary/10" : ""}`}
                type={tab === DASHBOARD_TAB_TRACK_METRICS ? "primary" : "contrast"}
                defaultCursor
                onClick={() => {
                  router.push(`/dashboard?tab=${DASHBOARD_TAB_TRACK_METRICS}`);
                }}
              >
                Track Metrics
              </Button>
              <Button
                className={`m-1 transition-all duration-300`}
                type="quaternary"
                onClick={handleRefreshData}
                disabled={isRefreshing}
              >
                💫 Refresh Data 💫
              </Button>
            </div>
            <div className="flex items-center justify-center">
              {tab === DASHBOARD_TAB_REVENUE_METRICS && (
                <RevenueMetrics data={dataVizData?.revenueMetrics} />
              )}
              {tab === DASHBOARD_TAB_USER_METRICS && (
                <UserMetrics data={dataVizData?.userMetrics} />
              )}
              {tab === DASHBOARD_TAB_TRACK_METRICS && (
                <TrackMetrics data={dataVizData?.trackMetrics} />
              )}
            </div>
          </>
        )}
      </Section>
    </>
  );
};

export default Dashboard;
