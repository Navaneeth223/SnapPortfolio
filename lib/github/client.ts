import { Octokit } from '@octokit/rest';
import { graphql } from '@octokit/graphql';

export function createGitHubClient(accessToken: string) {
  return new Octokit({
    auth: accessToken,
    userAgent: 'SnapPortfolio/1.0.0',
  });
}

export function createGraphQLClient(accessToken: string) {
  return graphql.defaults({
    headers: {
      authorization: `token ${accessToken}`,
    },
  });
}
