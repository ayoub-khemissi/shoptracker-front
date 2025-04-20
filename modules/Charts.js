/**
 * Customized label for pie charts
 * @param {{ cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }} param
 * @returns {JSX.Element}
 */
export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {(percent * 100).toFixed(0)}%
    </text>
  );
};
