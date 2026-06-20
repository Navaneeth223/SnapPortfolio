'use client';

import { TEMPLATES, COLOR_PRESETS, FONT_PAIRS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, Sparkles } from 'lucide-react';
import { useEditorStore } from '@/hooks/useEditorStore';

export function DesignTab() {
  const { portfolio, updatePortfolio } = useEditorStore();

  const selectedTemplate = portfolio?.template || 'monolith';
  const selectedColor = portfolio?.accentColor || '#FF5A1F';
  const selectedFontPair = portfolio?.fontPair || 'editorial';
  const colorMode = portfolio?.colorMode || 'light';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-semibold mb-1">Design</h2>
        <p className="text-sm text-text-secondary">
          Customize the look and feel of your portfolio
        </p>
      </div>

      {/* Template Picker */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          Template
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => updatePortfolio({ template: template.id })}
              className={`text-left p-3 rounded-lg border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-accent-primary bg-accent-tint'
                  : 'border-border-default hover:border-border-strong'
              }`}
            >
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2 flex items-center justify-center text-xs font-mono text-text-muted">
                [{template.id}]
              </div>
              <h4 className="font-semibold text-sm mb-1">
                {template.name}
                {selectedTemplate === template.id && (
                  <Check className="w-4 h-4 inline ml-2 text-accent-primary" />
                )}
              </h4>
              <p className="text-xs text-text-secondary line-clamp-2">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Color Picker */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
            Accent Color
          </h3>
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
              onClick={() => updatePortfolio({ accentColor: preset.hex })}
              className={`aspect-square rounded-lg border-2 transition-all ${
                selectedColor === preset.hex
                  ? 'border-gray-800 scale-110'
                  : 'border-border-subtle hover:scale-105'
              }`}
              style={{ backgroundColor: preset.hex }}
              title={preset.name}
            >
              {selectedColor === preset.hex && (
                <Check className="w-4 h-4 text-white m-auto" />
              )}
            </button>
          ))}
        </div>

        {/* Custom Color */}
        <div>
          <Label htmlFor="customColor">Custom Color</Label>
          <div className="flex items-center gap-2">
            <Input
              id="customColor"
              type="color"
              value={selectedColor}
              onChange={(e) => updatePortfolio({ accentColor: e.target.value })}
              className="w-20 h-10 cursor-pointer"
            />
            <Input
              type="text"
              value={selectedColor}
              onChange={(e) => updatePortfolio({ accentColor: e.target.value })}
              placeholder="#FF5A1F"
              className="flex-1 font-mono"
            />
          </div>
        </div>
      </section>

      {/* Color Mode */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          Color Mode
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {(['light', 'dark', 'auto'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => updatePortfolio({ colorMode: mode })}
              className={`p-3 rounded-lg border-2 capitalize transition-all ${
                colorMode === mode
                  ? 'border-accent-primary bg-accent-tint'
                  : 'border-border-default hover:border-border-strong'
              }`}
            >
              {mode}
              {colorMode === mode && (
                <Check className="w-4 h-4 inline ml-2 text-accent-primary" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          Typography
        </h3>

        <div className="space-y-2">
          {Object.entries(FONT_PAIRS).map(([key, pair]) => (
            <button
              key={key}
              onClick={() => updatePortfolio({ fontPair: key })}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedFontPair === key
                  ? 'border-accent-primary bg-accent-tint'
                  : 'border-border-default hover:border-border-strong'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold mb-1">{pair.name}</h4>
                  <p className="text-sm text-text-secondary">
                    {pair.display} · {pair.body}
                  </p>
                </div>
                {selectedFontPair === key && (
                  <Check className="w-5 h-5 text-accent-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* GitHub Stats Display */}
      <section className="space-y-4">
        <h3 className="font-semibold text-sm text-text-secondary uppercase tracking-wide">
          GitHub Stats
        </h3>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={portfolio?.showContributionGraph ?? true}
              onChange={(e) =>
                updatePortfolio({ showContributionGraph: e.target.checked })
              }
              className="w-4 h-4 rounded border-border-default text-accent-primary focus:ring-accent-ring"
            />
            <span className="text-sm">Show contribution heatmap</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={portfolio?.showGithubStats ?? true}
              onChange={(e) =>
                updatePortfolio({ showGithubStats: e.target.checked })
              }
              className="w-4 h-4 rounded border-border-default text-accent-primary focus:ring-accent-ring"
            />
            <span className="text-sm">Show stats (followers, stars, repos)</span>
          </label>
        </div>
      </section>
    </div>
  );
}
