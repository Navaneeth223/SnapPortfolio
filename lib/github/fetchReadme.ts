import { Octokit } from '@octokit/rest';

export async function fetchReadme(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    const { data } = await octokit.repos.getReadme({
      owner,
      repo,
    });

    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8');

    return extractReadmeExcerpt(content);
  } catch (error) {
    // README doesn't exist
    return null;
  }
}

function extractReadmeExcerpt(markdown: string): string | null {
  // Remove badges (shields.io and similar)
  let content = markdown.replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, '');
  content = content.replace(/!\[.*?\]\(.*?\)/g, '');

  // Remove markdown headers
  content = content.replace(/^#{1,6}\s+/gm, '');

  // Remove code blocks
  content = content.replace(/```[\s\S]*?```/g, '');
  content = content.replace(/`[^`]+`/g, '');

  // Remove links but keep text
  content = content.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

  // Remove HTML tags
  content = content.replace(/<[^>]+>/g, '');

  // Split into paragraphs
  const paragraphs = content
    .split('\n\n')
    .map((p) => p.trim())
    .filter((p) => p.length > 40); // Minimum 40 chars

  // Look for "About" or "Features" section
  const aboutIndex = paragraphs.findIndex(
    (p) =>
      p.toLowerCase().includes('about') ||
      p.toLowerCase().includes('features') ||
      p.toLowerCase().includes('description')
  );

  if (aboutIndex !== -1 && paragraphs[aboutIndex + 1]) {
    return truncateToSentence(paragraphs[aboutIndex + 1], 200);
  }

  // Return first substantial paragraph
  if (paragraphs[0]) {
    return truncateToSentence(paragraphs[0], 200);
  }

  return null;
}

function truncateToSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // Try to cut at sentence boundary
  const truncated = text.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastExclamation = truncated.lastIndexOf('!');
  const lastQuestion = truncated.lastIndexOf('?');

  const lastSentenceEnd = Math.max(lastPeriod, lastExclamation, lastQuestion);

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.slice(0, lastSentenceEnd + 1);
  }

  // Cut at word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.slice(0, lastSpace) + '...';
}
