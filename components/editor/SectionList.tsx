'use client';

import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Eye, EyeOff } from 'lucide-react';
import { SECTION_TYPES } from '@/lib/constants';

interface Section {
  id: string;
  label: string;
  isVisible: boolean;
  required: boolean;
}

function SortableSection({ section, onToggle }: { section: Section; onToggle: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 p-3 bg-bg-surface border border-border-default rounded-md hover:border-border-strong transition-colors"
    >
      {/* Drag Handle */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-text-muted hover:text-text-primary"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Section Label */}
      <span className="flex-1 font-medium">
        {section.label}
        {section.required && (
          <span className="text-xs text-text-muted ml-2">(required)</span>
        )}
      </span>

      {/* Visibility Toggle */}
      <button
        onClick={onToggle}
        disabled={section.required}
        className={`${
          section.required
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-bg-muted'
        } p-2 rounded transition-colors`}
        title={section.isVisible ? 'Hide section' : 'Show section'}
      >
        {section.isVisible ? (
          <Eye className="w-4 h-4 text-accent-primary" />
        ) : (
          <EyeOff className="w-4 h-4 text-text-muted" />
        )}
      </button>
    </div>
  );
}

export function SectionList() {
  const [sections, setSections] = useState<Section[]>(
    SECTION_TYPES.map((section) => ({
      id: section.id,
      label: section.label,
      isVisible: true,
      required: section.required,
    }))
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleVisibility = (id: string) => {
    setSections((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isVisible: !item.isVisible } : item
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((s) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {sections.map((section) => (
            <SortableSection
              key={section.id}
              section={section}
              onToggle={() => toggleVisibility(section.id)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
