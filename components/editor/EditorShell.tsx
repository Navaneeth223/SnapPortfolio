'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LivePreviewFrame } from './LivePreviewFrame';
import { 
  FileText, 
  FolderGit2, 
  Palette, 
  Globe, 
  Save,
  Eye,
  EyeOff,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useEditorStore } from '@/hooks/useEditorStore';
import { toast } from 'sonner';

type EditorTab = 'content' | 'projects' | 'design' | 'domain';

interface EditorShellProps {
  activeTab: EditorTab;
  onTabChange: (tab: EditorTab) => void;
  children: ReactNode;
}

const tabs = [
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'design', label: 'Design', icon: Palette },
  { id: 'domain', label: 'Domain', icon: Globe },
] as const;

export function EditorShell({ activeTab, onTabChange, children }: EditorShellProps) {
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(true);
  const { isDirty } = useEditorStore();

  const handleSave = async () => {
    // TODO: Implement save logic
    toast.success('Changes saved!');
  };

  const handlePublish = async () => {
    // TODO: Implement publish logic
    toast.success('Portfolio published!');
  };

  return (
    <div className="h-screen flex flex-col bg-bg-base">
      {/* Top Bar */}
      <header className="bg-bg-surface border-b border-border-subtle px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-accent-primary rounded-md" />
            <span className="font-display font-bold">SnapPortfolio</span>
          </Link>
          
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as EditorTab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-accent-tint text-accent-primary'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-muted'
                  }`}
                >
                  <Icon className="w-4 h-4 inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSave}
            disabled={!isDirty}
          >
            <Save className="w-4 h-4 mr-2" />
            {isDirty ? 'Save Draft' : 'Saved'}
          </Button>
          <Button size="sm" onClick={handlePublish}>
            Publish →
          </Button>
        </div>
      </header>

      {/* Main Editor Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Controls */}
        <aside className="w-[420px] border-r border-border-subtle bg-bg-surface overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </aside>

        {/* Right: Live Preview */}
        <main className="flex-1 flex flex-col bg-bg-muted">
          {/* Preview Controls */}
          <div className="bg-bg-surface border-b border-border-subtle px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  previewDevice === 'desktop'
                    ? 'bg-accent-tint text-accent-primary'
                    : 'text-text-secondary hover:bg-bg-muted'
                }`}
                title="Desktop view"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  previewDevice === 'mobile'
                    ? 'bg-accent-tint text-accent-primary'
                    : 'text-text-secondary hover:bg-bg-muted'
                }`}
                title="Mobile view"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="text-text-secondary hover:text-text-primary text-sm flex items-center gap-2"
            >
              {showPreview ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show Preview
                </>
              )}
            </button>
          </div>

          {/* Preview Frame */}
          {showPreview && (
            <div className="flex-1 p-6 overflow-auto">
              <LivePreviewFrame device={previewDevice} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
