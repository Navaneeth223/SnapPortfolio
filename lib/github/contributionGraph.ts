import { createGraphQLClient } from './client';
import { GitHubContribution } from '@/types/github.types';

const CONTRIBUTION_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions(
  username: string,
  accessToken: string
): Promise<GitHubContribution[]> {
  const graphqlClient = createGraphQLClient(accessToken);

  // Fetch last 365 days
  const to = new Date();
  const from = new Date();
  from.setFullYear(from.getFullYear() - 1);

  try {
    const result: any = await graphqlClient(CONTRIBUTION_QUERY, {
      username,
      from: from.toISOString(),
      to: to.toISOString(),
    });

    const days = result.user.contributionsCollection.contributionCalendar.weeks.flatMap(
      (week: any) => week.contributionDays
    );

    return days.map((day: any) => ({
      date: day.date,
      count: day.contributionCount,
      level: mapContributionLevel(day.contributionLevel),
    }));
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }
}

function mapContributionLevel(level: string): 0 | 1 | 2 | 3 | 4 {
  const mapping: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return mapping[level] || 0;
}
