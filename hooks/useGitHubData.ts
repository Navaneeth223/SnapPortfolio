import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GitHubUserData } from '@/types/github.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export function useGitHubData() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['github-data'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/github/user`);
      return data as GitHubUserData;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const syncMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${API_URL}/github/sync`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['github-data'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    githubData: data,
    isLoading,
    error,
    syncGitHub: syncMutation.mutate,
    isSyncing: syncMutation.isPending,
    lastSynced: data?.lastSynced,
  };
}
