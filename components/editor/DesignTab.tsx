'use client';

import { useState } from 'react';
import { TEMPLATES, FONT_PAIRS, COLOR_PRESETS } from '@/lib/constants';
import { useEditorStore } from '@/hooks/useEditorStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Sparkles } from 'lucide-react';

export function DesignTab() {
  const { portfolio, updatePortfolio } = useEditorStore();
  const [customColor, setCustomColor] = useState(portfolio?.accentColor || '#FF5A1F');

  const handleTemplateChange = (templateId: string) => {
    updatePortfolio({ template: templateId as any });
  };

  const handleColorChange = (color: string) => {
    setCustomColor(color);
    updatePortfolio({ accentColor: color });
  };

  const handleColorModeChange = (mode: 'light' | 'dark' | 'auto') => {
    updatePortfolio({ colorMode: mode });
  };

  const handleFontChange = (fontPair: string) => {
    updatePortfolio({ fontPair });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Design</h2>
        <p className="text-sm text-text-secondary">
          Customize the look and feel
        </p>
      </div>

      {/* Template Picker */}
      <section className="space-y-4">
        <Label>Template</Label>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleTemplateChange(template.id)}
              className={`relative text-left p-3 rounded-lg border-2 transition-all ${
                portfolio?.template === template.id
                  ? 'border-accent-primary bg-accent-tint'
                  : 'border-border-default hover:border-border-strong'
              }`}
            >
              {portfolio?.template === template.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-accent-primary rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-xs font-mono text-text-muted">
                  [{template.id}]
                </span>
              </div>
              <h4 className="font-semibold text-sm">{template.name}</h4>
              <p className="text-xs text-text-secondary mt-1">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Color Picker */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Accent Color</Label>
          <Button variant="ghost" size="sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Auto from avatar
          </Button>
        </div>

        {/* Preset Colors */}
        <div className="grid grid-cols-6 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.hex}
              onClick={() => handleColorChange(preset.hex)}
              className={`aspect-square rounded-lg border-2 transition-all relative ${
                portfolio?.accentColor === preset.hex
                  ? 'border-text-primary scale-110'
                  : 'border-transparent hover:scale-105'
              }`}
              style={{ backgroundColor: preset.hex }}
              title={preset.name}
            >
              {portfolio?.accentColor === preset.hex && (
                <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
              )}
            </button>
          ))}
        </div>

        {/* Custom Color */}
        <div className="flex gap-2">
          <Input
            type="color"
            value={customColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-16 h-10 cursor-pointer"
          />
          <Input
            type="text"
            value={customColor}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#FF5A1F"
            className="flex-1 font-mono"
          />
        </div>
      </section>

      {/* Color Mode */}
      <section className="space-y-4">
        <Label>Color Mode</Label>
        <div className="grid grid-cols-3 gap-2">
          {(['light', 'dark', 'auto'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => handleColorModeChange(mode)}
              className={`py-2 px-3 text-sm rounded-md border-2 font-medium transition-all ${
                portfolio?.colorMode === mode
                  ? 'border-accent-primary bg-accent-tint text-accent-primary'
                  : 'border-border-default hover:border-border-strong'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <Label>Typography</Label>
        <div className="space-y-2">
          {Object.entries(FONT_PAIRS).map(([key, pair]) => (
            <button
              key={key}
              onClick={() => handleFontChange(key)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                portfolio?.fontPair === key
                  ? 'border-accent-primary bg-accent-tint'
                  : 'border-border-default hover:border-border-strong'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{pair.name}</span>
                {portfolio?.fontPair === key && (
                  <Check className="w-4 h-4 text-accent-primary" />
                )}
              </div>
              <div className="text-sm text-text-secondary space-y-1">
                <div>Display: {pair.display}</div>
                <div>Body: {pair.body}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* GitHub Stats */}
      <section className="space-y-4">
        <Label>GitHub Stats Display</Label>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={portfolio?.showContributionGraph}
              onChange={(e) =>
                updatePortfolio({ showContributionGraph: e.target.checked })
              }
              className="w-4 h-4 rounded border-border-default text-accent-primary focus:ring-accent-ring"
            />
            <span className="text-sm">Show contribution heatmap</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={portfolio?.showGithubStats}
              onChange={(e) =>
                updatePortfolio({ showGithubStats: e.target.checked })
              }
              className="w-4 h-4 rounded border-border-default text-accent-primary focus:ring-accent-ring"
            />
            <span className="text-sm">Show stats (followers, total stars, repo count)</span>
          </label>
        </div>
      </section>
    </div>
  );
}
