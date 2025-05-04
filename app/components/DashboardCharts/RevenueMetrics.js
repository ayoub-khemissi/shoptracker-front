/* eslint-disable no-undef */
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
  BarChart,
  Bar,
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
 * @typedef {Object} ActiveSubscription
 * @property {string} name
 * @property {number} active_subscriptions
 *
 * @typedef {Object} MrrOverTime
 * @property {string} month
 * @property {number} mrr
 *
 * @typedef {Object} PlanDistribution
 * @property {string} name
 * @property {number} user_count
 *
 * @typedef {Object} ActivePlanDistribution
 * @property {string} name
 * @property {number} active_subscriptions
 *
 * @typedef {Object} SubscriptionOverTime
 * @property {string} month
 * @property {string} plan_name
 * @property {number} subscriptions
 *
 * @typedef {Object} ChurnOverTime
 * @property {string|null} month
 * @property {number} churned
 *
 * @typedef {Object} InvoiceOverTime
 * @property {string} month
 * @property {number} total_invoices
 *
 * @typedef {Object} InvoiceByReferrerOverTime
 * @property {string} referrer_name
 * @property {string} month
 * @property {number} total_invoices
 *
 * @typedef {Object} TotalAmountPaidByReferrer
 * @property {string} referrer_name
 * @property {number} total_amount_paid
 *
 * @typedef {Object} AmountPaidByReferrerOverTime
 * @property {string} referrer_name
 * @property {string} month
 * @property {number} total_amount_paid
 *
 * @typedef {Object} RevenueMetricsData
 * @property {ActiveSubscription[]} activeSubscriptions
 * @property {number} mrr
 * @property {MrrOverTime[]} mrrOverTime
 * @property {PlanDistribution[]} plansDistribution
 * @property {ActivePlanDistribution[]} activePlansDistribution
 * @property {SubscriptionOverTime[]} subscriptionsOverTime
 * @property {number} churned_users
 * @property {ChurnOverTime[]} churnOverTime
 * @property {number} users_no_stripe
 * @property {InvoiceOverTime[]} invoicesOverTime
 * @property {number} total_invoices
 * @property {InvoiceByReferrerOverTime[]} invoicesByReferrerOverTime
 * @property {number} total_amount_paid
 * @property {TotalAmountPaidByReferrer[]} totalAmountPaidByReferrer
 * @property {AmountPaidByReferrerOverTime[]} amountPaidByReferrerOverTime
 */

/**
 * RevenueMetrics component
 * @param {{ data: RevenueMetricsData }} props
 */
const RevenueMetrics = ({ data }) => {
  if (!data) return null;

  const {
    activeSubscriptions,
    mrr,
    mrrOverTime,
    invoicesOverTime,
    total_invoices,
    invoicesByReferrerOverTime,
    total_amount_paid,
    totalAmountPaidByReferrer,
    amountPaidByReferrerOverTime,
    plansDistribution,
    activePlansDistribution,
    subscriptionsOverTime,
    churned_users,
    churnOverTime,
    users_no_stripe,
  } = data;

  // Prepare data for stacked BarChart: amount paid by referrer over time
  const paidReferrerNames = Array.from(
    new Set(amountPaidByReferrerOverTime?.map((i) => i.referrer_name) || []),
  );
  const paidReferrerMonths = Array.from(
    new Set(amountPaidByReferrerOverTime?.map((i) => i.month) || []),
  );
  const amountPaidByReferrerByMonth = paidReferrerMonths.map((month) => {
    const monthData = { month };
    paidReferrerNames.forEach((referrer) => {
      const found = amountPaidByReferrerOverTime?.find(
        (i) => i.month === month && i.referrer_name === referrer,
      );
      monthData[referrer] = found ? found.total_amount_paid : 0;
    });
    return monthData;
  });

  // Prepare data for horizontal BarChart: total amount paid by referrer
  const totalAmountPaidByReferrerData = (totalAmountPaidByReferrer || []).map((item, idx) => ({
    ...item,
    color: CHART_COLORS[idx % CHART_COLORS.length],
  }));

  // Prepare data for stacked BarChart: invoices by referrer over time
  const referrerNames = Array.from(
    new Set(invoicesByReferrerOverTime?.map((i) => i.referrer_name) || []),
  );
  const referrerMonths = Array.from(new Set(invoicesByReferrerOverTime?.map((i) => i.month) || []));
  const invoicesByReferrerByMonth = referrerMonths.map((month) => {
    const monthData = { month };
    referrerNames.forEach((referrer) => {
      const found = invoicesByReferrerOverTime?.find(
        (i) => i.month === month && i.referrer_name === referrer,
      );
      monthData[referrer] = found ? found.total_invoices : 0;
    });
    return monthData;
  });

  // Prepare subscriptions over time for stacked BarChart
  const plans = Array.from(new Set(subscriptionsOverTime?.map((s) => s.plan_name) || []));
  const months = Array.from(new Set(subscriptionsOverTime?.map((s) => s.month) || []));
  const subscriptionsByMonth = months.map((month) => {
    const monthData = { month };
    plans.forEach((plan) => {
      const found = subscriptionsOverTime.find((s) => s.month === month && s.plan_name === plan);
      monthData[plan] = found ? found.subscriptions : 0;
    });
    return monthData;
  });

  return (
    <section
      className="flex w-full flex-wrap justify-around gap-y-8 text-center"
      aria-label="Revenue Metrics Dashboard Charts"
      tabIndex={0}
    >
      {/* MRR Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Current Monthly Recurring Revenue: $${mrr}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Current MRR</span>
        <span className="w-full text-3xl font-bold text-green-600">
          ${mrr?.toFixed(2) ?? "0.00"}
        </span>
      </div>

      {/* MRR Over Time (Line Chart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="MRR over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">MRR Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={mrrOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="mrr"
              stroke="#34d399"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#34d399", fill: "#fff" }}
              activeDot={{ r: 7 }}
              name="MRR"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Invoices Over Time (Line Chart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Invoices over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Invoices Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={invoicesOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total_invoices"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#6366f1", fill: "#fff" }}
              activeDot={{ r: 7 }}
              name="Total Invoices"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Total Invoices Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Total Invoices: ${total_invoices}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Total Invoices</span>
        <span className="w-full text-3xl font-bold text-blue-600">
          {total_invoices?.toLocaleString() ?? "0"}
        </span>
      </div>

      {/* Total Amount Paid Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Total Amount Paid: $${total_amount_paid?.toFixed(2) ?? "0.00"}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Total Amount Paid</span>
        <span className="w-full text-3xl font-bold text-green-700">
          $
          {total_amount_paid?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }) ?? "0.00"}
        </span>
      </div>

      {/* Invoices By Referrer Over Time (Stacked Bar Chart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Invoices by Referrer Over Time Chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Invoices by Referrer Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={invoicesByReferrerByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {referrerNames.map((referrer, idx) => (
              <Bar
                key={referrer}
                dataKey={referrer}
                stackId="a"
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                name={referrer}
                isAnimationActive
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Total Amount Paid By Referrer (Horizontal Bar Chart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Total Amount Paid By Referrer Chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Total Amount Paid By Referrer</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart
            layout="vertical"
            data={totalAmountPaidByReferrerData}
            margin={{ left: 40, right: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals />
            <YAxis dataKey="referrer_name" type="category" tick={{ fontSize: 12 }} width={120} />
            <Tooltip
              formatter={(value) =>
                `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            />
            <Bar dataKey="total_amount_paid" isAnimationActive>
              {totalAmountPaidByReferrerData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Amount Paid By Referrer Over Time (Stacked Bar Chart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Amount Paid By Referrer Over Time Chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">
          Amount Paid By Referrer Over Time
        </h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={amountPaidByReferrerByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value) =>
                `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              }
            />
            <Legend />
            {paidReferrerNames.map((referrer, idx) => (
              <Bar
                key={referrer}
                dataKey={referrer}
                stackId="a"
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                name={referrer}
                isAnimationActive
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Plans Distribution PieChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Plans distribution chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Plans Distribution</h2>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={plansDistribution || []}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#0ea5e9"
              dataKey="user_count"
              nameKey="name"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive
            >
              {(plansDistribution || []).map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Active Plans Distribution PieChart */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Active plans distribution chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Active Plans Distribution</h2>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={activePlansDistribution || []}
              cx="50%"
              cy="50%"
              outerRadius={90}
              fill="#6366f1"
              dataKey="active_subscriptions"
              nameKey="name"
              label={renderCustomizedLabel}
              labelLine={false}
              isAnimationActive
            >
              {(activePlansDistribution || []).map((_, idx) => (
                <Cell key={`cell-active-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Subscriptions Over Time (Stacked BarChart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Subscriptions over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Subscriptions Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={subscriptionsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            {plans.map((plan, idx) => (
              <Bar
                key={plan}
                dataKey={plan}
                stackId="a"
                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                name={plan}
                maxBarSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Active Subscriptions (BarChart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Active subscriptions chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Active Subscriptions</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={activeSubscriptions || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="active_subscriptions"
              fill="#0ea5e9"
              name="Active Subscriptions"
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Churned Users Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Churned users: ${churned_users}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">Churned Users</span>
        <span className="w-full text-3xl font-bold text-red-500">{churned_users ?? 0}</span>
      </div>

      {/* Users Without Stripe Customer ID Card */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label={`Users without Stripe customer ID: ${users_no_stripe}`}
        tabIndex={0}
      >
        <span className="text-lg font-semibold text-gray-700">
          Users Without Stripe Customer ID
        </span>
        <span className="w-full text-3xl font-bold text-indigo-500">{users_no_stripe ?? 0}</span>
      </div>

      {/* Churn Over Time (BarChart) */}
      <div
        className="flex w-full flex-wrap rounded-xl border border-gray-100 bg-white p-6 shadow xl:w-5/12"
        aria-label="Churn over time chart"
        tabIndex={0}
      >
        <h2 className="mb-4 text-lg font-semibold text-gray-700">Churn Over Time</h2>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={churnOverTime || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="churned" fill="#f87171" name="Churned Users" maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RevenueMetrics;
