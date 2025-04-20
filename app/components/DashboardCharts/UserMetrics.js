import { renderCustomizedLabel } from "@/modules/Charts";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Colors for PieChart
const PIE_COLORS = ["#0ea5e9", "#fbbf24"];

/**
 * @typedef {Object} SignupOverTime
 * @property {string} month
 * @property {number} total_users
 *
 * @typedef {Object} Conversion
 * @property {number} free_users
 * @property {number} paying_users
 * @property {number} conversion_rate
 *
 * @typedef {Object} UserMetricsData
 * @property {number} total_active_users
 * @property {SignupOverTime[]} signupsOverTime
 * @property {Conversion} conversion
 * @property {number} users_no_track
 */

/**
 * UserMetrics component
 * @param {{ data: UserMetricsData }} props
 */
const UserMetrics = ({ data }) => {
  if (!data) return null;

  const { total_active_users, signupsOverTime, conversion, users_no_track } = data;

  // Prepare data for PieChart
  const conversionData = [
    { name: "Free Users", value: conversion?.free_users || 0 },
    { name: "Paying Users", value: conversion?.paying_users || 0 },
  ];

  return (
    <section
      className="flex w-full flex-wrap justify-around gap-y-8 text-center"
      aria-label="User Metrics Dashboard Charts"
      tabIndex={0}
    >
      {/* Total Active Users */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Total active users: ${total_active_users}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Total Active Users</span>
        <span className="w-full text-3xl font-bold text-green-600">
          {total_active_users ?? "0"}
        </span>
      </div>

      {/* Signups Over Time (Line Chart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Signups over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Signups Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={signupsOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_users"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#0ea5e9", fill: "#fff" }}
              activeDot={{ r: 7 }}
              name="Total Users"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion PieChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Conversion chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Conversion</h2>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={conversionData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={renderCustomizedLabel}
                labelLine={false}
                isAnimationActive
              >
                {conversionData.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600">
              Free Users: <span className="font-semibold">{conversion?.free_users ?? 0}</span>
            </span>
            <span className="text-gray-600">
              Paying Users: <span className="font-semibold">{conversion?.paying_users ?? 0}</span>
            </span>
            <span className="text-gray-600">
              Conversion Rate:{" "}
              <span className="font-semibold">{conversion?.conversion_rate ?? 0}%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Users with No Tracked Products number */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Number of users with no tracked products: ${users_no_track}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Users with No Tracked Products</span>
        <span className="w-full text-3xl font-bold text-yellow-500">{users_no_track ?? 0}</span>
      </div>
    </section>
  );
};

export default UserMetrics;
