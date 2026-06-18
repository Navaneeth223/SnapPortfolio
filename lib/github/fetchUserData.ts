import { Octokit } from '@octokit/rest';
import { GitHubUserData, GitHubRepo, GitHubContribution } from '@/types/github.types';
import { createGitHubClient, createGraphQLClient } from './client';
import { fetchContributions } from './contributionGraph';

export async function fetchUserData(
  username: string,
  accessToken?: string
): Promise<GitHubUserData> {
  const octokit = accessToken
    ? createGitHubClient(accessToken)
    : new Octokit();

  try {
    // Fetch user profile
    const { data: user } = await octokit.users.getByUsername({ username });

    // Fetch repositories (sorted by updated, exclude forks by default)
    const { data: repos } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
    });

    // Filter out forks and empty repos
    const activeRepos = repos.filter(
      (repo) => !repo.fork && (repo.description || repo.stargazers_count > 0)
    );

    // Calculate language statistics across all repos
    const languageStats = await calculateLanguageStats(octokit, username, activeRepos);

    // Fetch contribution data
    let contributions: GitHubContribution[] = [];
    if (accessToken) {
      try {
        contributions = await fetchContributions(username, accessToken);
      } catch (error) {
        console.error('Failed to fetch contributions:', error);
      }
    }

    // Calculate total stars
    const totalStars = activeRepos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    return {
      user,
      repos: activeRepos,
      languages: languageStats,
      contributions,
      totalStars,
    };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw new Error('Failed to fetch GitHub data. Please check the username and try again.');
  }
}

async function calculateLanguageStats(
  octokit: Octokit,
  username: string,
  repos: GitHubRepo[]
): Promise<{ name: string; percent: number; bytes: number }[]> {
  const languageMap = new Map<string, number>();

  // Fetch language data for each repo
  await Promise.all(
    repos.slice(0, 50).map(async (repo) => {
      try {
        const { data: languages } = await octokit.repos.listLanguages({
          owner: username,
          repo: repo.name,
        });

        Object.entries(languages).forEach(([lang, bytes]) => {
          languageMap.set(lang, (languageMap.get(lang) || 0) + bytes);
        });
      } catch (error) {
        // Repo might be private or deleted, skip it
        console.warn(`Failed to fetch languages for ${repo.name}`);
      }
    })
  );

  // Convert to array and calculate percentages
  const totalBytes = Array.from(languageMap.values()).reduce((a, b) => a + b, 0);

  const languages = Array.from(languageMap.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percent: (bytes / totalBytes) * 100,
    }))
    .sort((a, b) => b.bytes - a.bytes);

  return languages;
}

export function guessRoleFromLanguages(
  languages: { name: string; percent: number }[]
): string {
  if (!languages.length) return 'Developer';

  const top = languages[0].name;
  const topThree = languages.slice(0, 3).map((l) => l.name);

  // Frontend patterns
  if (
    topThree.some((l) =>
      ['JavaScript', 'TypeScript', 'Vue', 'Svelte'].includes(l)
    )
  ) {
    return 'Full Stack Developer';
  }

  // Backend patterns
  if (
    topThree.some((l) => ['Python', 'Go', 'Rust', 'Java', 'C++'].includes(l))
  ) {
    return 'Backend Developer';
  }

  // Mobile patterns
  if (topThree.some((l) => ['Swift', 'Kotlin', 'Dart'].includes(l))) {
    return 'Mobile Developer';
  }

  // Data/ML patterns
  if (top === 'Python' || topThree.includes('R') || topThree.includes('Julia')) {
    return 'Software Engineer';
  }

  return 'Developer';
}

export function generateAutoBio(
  user: GitHubUserData['user'],
  languages: { name: string; percent: number }[],
  totalStars: number,
  repoCount: number
): string {
  const role = guessRoleFromLanguages(languages);
  const topLanguages = languages
    .slice(0, 3)
    .map((l) => l.name)
    .join(', ');

  return `${role} who builds with ${topLanguages}. ${repoCount} public projects, ${totalStars} stars earned.`;
}
