interface ContributionHeatmapProps {
  contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[];
  accentColor: string;
}

export function ContributionHeatmap({
  contributions,
  accentColor,
}: ContributionHeatmapProps) {
  // Group contributions by week
  const weeks: typeof contributions[] = [];
  let currentWeek: typeof contributions = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getLevelColor = (level: number): string => {
    const alpha = [0.1, 0.3, 0.5, 0.7, 1];
    return `${accentColor}${Math.round(alpha[level] * 255).toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#16161A] rounded-lg border border-gray-800 p-6 overflow-x-auto">
      <div className="inline-flex gap-1">
        {weeks.slice(-52).map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: getLevelColor(day.level) }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: getLevelColor(level) }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
