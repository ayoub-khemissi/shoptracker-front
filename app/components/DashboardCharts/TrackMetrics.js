import { renderCustomizedLabel } from "@/modules/Charts";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Colors for charts
const CHART_COLORS = [
  "#0ea5e9",
  "#fbbf24",
  "#34d399",
  "#a78bfa",
  "#f472b6",
  "#f87171",
  "#60a5fa",
  "#facc15",
  "#10b981",
  "#6366f1",
  "#fb7185",
  "#f59e42",
];

/**
 * @typedef {Object} TrackStatus
 * @property {string} status
 * @property {number} count
 *
 * @typedef {Object} EnabledDisabled
 * @property {number} enabled
 * @property {number} disabled
 *
 * @typedef {Object} TrackingSuccess
 * @property {number} total_ok
 * @property {number} total_ko
 * @property {number} success_rate
 *
 * @typedef {Object} TracksByPlan
 * @property {string} plan_name
 * @property {number} total_tracks
 *
 * @typedef {Object} TracksCreatedOverTime
 * @property {string} day
 * @property {number} tracks_created
 *
 * @typedef {Object} TracksByWeekday
 * @property {string} weekday
 * @property {number} total
 *
 * @typedef {Object} TracksWithThresholdOverTime
 * @property {string} month
 * @property {number} tracks_with_threshold
 *
 * @typedef {Object} TrackMetricsData
 * @property {number} avg_tracks_per_user
 * @property {TrackStatus[]} trackStatus
 * @property {EnabledDisabled} enabledDisabled
 * @property {TrackingSuccess} trackingSuccess
 * @property {TracksByPlan[]} tracksByPlan
 * @property {TracksCreatedOverTime[]} tracksCreatedOverTime
 * @property {TracksByWeekday[]} tracksByWeekday
 * @property {TracksWithThresholdOverTime[]} tracksWithThresholdOverTime
 */

/**
 * TrackMetrics component
 * @param {{ data: TrackMetricsData }} props
 */
const TrackMetrics = ({ data }) => {
  if (!data) return null;

  const {
    avg_tracks_per_user,
    trackStatus,
    enabledDisabled,
    trackingSuccess,
    tracksByPlan,
    tracksCreatedOverTime,
    tracksByWeekday,
    tracksWithThresholdOverTime,
  } = data;

  // Prepare enabled/disabled data for PieChart
  const enabledDisabledData = [
    { name: "Enabled", value: enabledDisabled?.enabled || 0 },
    { name: "Disabled", value: enabledDisabled?.disabled || 0 },
  ];

  // Prepare tracking success data for PieChart
  const trackingSuccessData = [
    { name: "Success", value: trackingSuccess?.total_ok || 0 },
    { name: "Failure", value: trackingSuccess?.total_ko || 0 },
  ];

  return (
    <section
      className="flex w-full flex-wrap justify-around gap-y-8 text-center"
      aria-label="Track Metrics Dashboard Charts"
      tabIndex={0}
    >
      {/* Average Tracks Per User Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Average tracks per user: ${avg_tracks_per_user}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Average Tracks Per User</span>
        <span className="w-full text-3xl font-bold text-blue-600">
          {avg_tracks_per_user?.toFixed(2) ?? "0.00"}
        </span>
      </div>

      {/* Track Status PieChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Track status distribution chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Track Status Distribution</h2>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={trackStatus || []}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#0ea5e9"
              dataKey="count"
              nameKey="status"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive
            >
              {(trackStatus || []).map((_, idx) => (
                <Cell key={`cell-status-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Enabled/Disabled PieChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Enabled/Disabled tracks chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Enabled vs Disabled Tracks</h2>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={enabledDisabledData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#34d399"
              dataKey="value"
              nameKey="name"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive
            >
              {enabledDisabledData.map((_, idx) => (
                <Cell key={`cell-enabled-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tracking Success Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Tracking success rate: ${trackingSuccess?.success_rate ?? 0}%`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Tracking Success Rate</span>
        <span className="w-full text-3xl font-bold text-green-600">
          {trackingSuccess?.success_rate ?? 0}%
        </span>
      </div>

      {/* Tracking Success PieChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Tracking success/failure chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Success vs Failure</h2>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={trackingSuccessData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#10b981"
              dataKey="value"
              nameKey="name"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive
            >
              {trackingSuccessData.map((_, idx) => (
                <Cell key={`cell-success-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Tracks By Plan BarChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Tracks by plan chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Tracks By Plan</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={tracksByPlan || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="plan_name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_tracks" fill="#6366f1" name="Tracks" maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tracks Created Over Time LineChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Tracks created over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Tracks Created Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={tracksCreatedOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tracks_created"
              stroke="#0ea5e9"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#0ea5e9", fill: "#fff" }}
              activeDot={{ r: 7 }}
              name="Tracks Created"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tracks By Weekday BarChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Tracks by weekday chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Tracks By Weekday</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={tracksByWeekday || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="weekday" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#fbbf24" name="Tracks" maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tracks With Threshold Over Time LineChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Tracks with threshold over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Tracks With Threshold Over Time
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={tracksWithThresholdOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="tracks_with_threshold"
              stroke="#f472b6"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#f472b6", fill: "#fff" }}
              activeDot={{ r: 7 }}
              name="Tracks With Threshold"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TrackMetrics;
