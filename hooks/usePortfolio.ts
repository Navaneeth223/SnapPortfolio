import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Portfolio } from '@/types/portfolio.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export function usePortfolio() {
  const queryClient = useQueryClient();

  const { data: portfolio, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/portfolio/me`);
      return data as Portfolio;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<Portfolio>) => {
      const { data } = await axios.patch(`${API_URL}/portfolio/me`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });

  const publishMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`${API_URL}/portfolio/me/publish`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
    },
  });

  return {
    portfolio,
    isLoading,
    error,
    updatePortfolio: updateMutation.mutate,
    publishPortfolio: publishMutation.mutate,
    isUpdating: updateMutation.isPending,
    isPublishing: publishMutation.isPending,
  };
}
