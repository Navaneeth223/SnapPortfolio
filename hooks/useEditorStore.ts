import { create } from 'zustand';
import { Portfolio, Project } from '@/types/portfolio.types';

interface EditorState {
  portfolio: Partial<Portfolio> | null;
  projects: Project[];
  isDirty: boolean;
  
  setPortfolio: (portfolio: Partial<Portfolio>) => void;
  updatePortfolio: (updates: Partial<Portfolio>) => void;
  setProjects: (projects: Project[]) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  reorderProjects: (orderedIds: string[]) => void;
  setIsDirty: (isDirty: boolean) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  portfolio: null,
  projects: [],
  isDirty: false,

  setPortfolio: (portfolio) => set({ portfolio, isDirty: false }),
  
  updatePortfolio: (updates) =>
    set((state) => ({
      portfolio: { ...state.portfolio, ...updates },
      isDirty: true,
    })),

  setProjects: (projects) => set({ projects, isDirty: false }),

  updateProject: (projectId, updates) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === projectId ? { ...p, ...updates } : p
      ),
      isDirty: true,
    })),

  reorderProjects: (orderedIds) =>
    set((state) => ({
      projects: orderedIds
        .map((id) => state.projects.find((p) => p._id === id))
        .filter(Boolean) as Project[],
      isDirty: true,
    })),

  setIsDirty: (isDirty) => set({ isDirty }),

  reset: () => set({ portfolio: null, projects: [], isDirty: false }),
}));
