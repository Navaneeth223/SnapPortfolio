'use client';

import { useState } from 'react';
import { EditorShell } from '@/components/editor/EditorShell';
import { ContentTab } from '@/components/editor/ContentTab';
import { ProjectsTab } from '@/components/editor/ProjectsTab';
import { DesignTab } from '@/components/editor/DesignTab';
import { DomainTab } from '@/components/editor/DomainTab';

type EditorTab = 'content' | 'projects' | 'design' | 'domain';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<EditorTab>('content');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'content':
        return <ContentTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'design':
        return <DesignTab />;
      case 'domain':
        return <DomainTab />;
      default:
        return null;
    }
  };

  return (
    <EditorShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderTabContent()}
    </EditorShell>
  );
}
