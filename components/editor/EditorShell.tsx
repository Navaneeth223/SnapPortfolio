'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LivePreviewFrame } from './LivePreviewFrame';
import { 
  FileText, 
  FolderOpen, 
  Palette, 
  Globe, 
  Monitor, 
  Smartphone,
  ArrowLeft,
  Save,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEditorStore } from '@/hooks/useEditorStore';
import { toast } from 'sonner';

type EditorTab = 'content' | 'projects' | 'design' | 'domain';

interface EditorShellProps {
  children: ReactNode;
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
}

const tabs = [
  { id: 'content' as EditorTab, label: 'Content', icon: FileText },
  { id: 'projects' as EditorTab, label: 'Projects', icon: FolderOpen },
  { id: 'design' as EditorTab, label: 'Design', icon: Palette },
  { id: 'domain' as EditorTab, label: 'Domain', icon: Globe },
];

export function EditorShell({ children, activeTab, onTabChange }: EditorShellProps) {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const { isDirty } = useEditorStore();

  const handleSave = async () => {
    // TODO: Implement save to backend
    toast.success('Changes saved successfully');
  };

  const handlePublish = async () => {
    // TODO: Implement publish
    toast.success('Portfolio published!');
  };

  return (
    <div className="h-screen flex flex-col bg-bg-base">
      {/* Top Bar */}
      <header className="bg-bg-surface border-b border-border-subtle px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="h-6 w-px bg-border-default" />
          <h1 className="font-display font-semibold text-lg">Portfolio Editor</h1>
          {isDirty && (
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
              Unsaved changes
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleSave} disabled={!isDirty}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button size="sm" onClick={handlePublish}>
            <Eye className="w-4 h-4 mr-2" />
            Publish
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Controls */}
        <div className="w-[420px] border-r border-border-subtle bg-bg-surface flex flex-col">
          {/* Tabs */}
          <div className="border-b border-border-subtle">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2',
                      activeTab === tab.id
                        ? 'border-accent-primary text-accent-primary bg-accent-tint'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-bg-muted'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </div>

        {/* Right Panel: Live Preview */}
        <div className="flex-1 bg-bg-muted flex flex-col">
          {/* Preview Controls */}
          <div className="bg-bg-surface border-b border-border-subtle px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={cn(
                  'p-2 rounded transition-colors',
                  previewDevice === 'desktop'
                    ? 'bg-accent-tint text-accent-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-muted'
                )}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={cn(
                  'p-2 rounded transition-colors',
                  previewDevice === 'mobile'
                    ? 'bg-accent-tint text-accent-primary'
                    : 'text-text-muted hover:text-text-primary hover:bg-bg-muted'
                )}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-text-muted">
              Live Preview
            </span>
          </div>

          {/* Preview Frame */}
          <div className="flex-1 p-6 overflow-auto">
            <LivePreviewFrame device={previewDevice} />
          </div>
        </div>
      </div>
    </div>
  );
}
