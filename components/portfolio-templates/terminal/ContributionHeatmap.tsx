import { GitHubContribution } from '@/types/github.types';

interface ContributionHeatmapProps {
  contributions: GitHubContribution[];
  accentColor: string;
}

export function ContributionHeatmap({
  contributions,
  accentColor,
}: ContributionHeatmapProps) {
  // Group contributions by week
  const weeks: GitHubContribution[][] = [];
  let currentWeek: GitHubContribution[] = [];

  contributions.forEach((contrib, index) => {
    const date = new Date(contrib.date);
    const dayOfWeek = date.getDay();

    currentWeek.push(contrib);

    // If Sunday (6) or last item, complete the week
    if (dayOfWeek === 6 || index === contributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const getLevelColor = (level: number): string => {
    const colors = {
      0: '#161B22',
      1: `${accentColor}33`, // 20% opacity
      2: `${accentColor}66`, // 40% opacity
      3: `${accentColor}99`, // 60% opacity
      4: accentColor, // 100%
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  return (
    <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 overflow-x-auto">
      <div className="flex gap-1">
        {weeks.slice(-52).map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className="w-3 h-3 rounded-sm transition-colors hover:ring-1 hover:ring-[#E6EDF3]"
                style={{ backgroundColor: getLevelColor(day.level) }}
                title={`${day.date}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-[#7D8590]">
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
