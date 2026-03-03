const MiniChart = ({ change }) => {
  const isPositive = change >= 0;

  return (
    <div className="h-12 flex items-end gap-0.5 opacity-60">
      {[...Array(7)].map((_, i) => {
        const heights = isPositive
          ? [40, 50, 45, 60, 55, 70, 75]
          : [75, 70, 65, 60, 50, 45, 40];

        return (
          <div
            key={i}
            className={`w-1 rounded-t transition-all ${
              isPositive
                ? 'bg-gradient-to-t from-emerald-500/50 to-emerald-400/80'
                : 'bg-gradient-to-t from-rose-500/50 to-rose-400/80'
            }`}
            style={{ height: `${heights[i]}%` }}
          />
        );
      })}
    </div>
  );
};

export default MiniChart;