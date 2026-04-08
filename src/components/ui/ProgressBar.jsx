export default function ProgressBar({ value, color = "brand", size = "md", showLabel = false }) {
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };
  const colors = {
    brand: "bg-brand-500",
    forest: "bg-forest-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
  };
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-gray-700">{value}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full ${heights[size]}`}>
        <div
          className={`${heights[size]} rounded-full ${colors[color]} transition-all duration-700`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}