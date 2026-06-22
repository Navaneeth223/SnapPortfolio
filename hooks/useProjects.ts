import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Project } from '@/types/portfolio.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export function useProjects() {
  const queryClient = useQueryClient();

  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/projects`);
      return data as Project[];
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ projectId, updates }: { projectId: string; updates: Partial<Project> }) => {
      const { data } = await axios.patch(`${API_URL}/projects/${projectId}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async (orderedIds: string[]) => {
      const { data } = await axios.post(`${API_URL}/projects/reorder`, { orderedIds });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects: projects || [],
    isLoading,
    error,
    updateProject: updateMutation.mutate,
    reorderProjects: reorderMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}
