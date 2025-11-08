'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download, DownloadCloud } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

const textSizes = [
  { value: 'sm', label: 'Small', size: '0.875rem' },
  { value: 'base', label: 'Medium', size: '1rem' },
  { value: 'lg', label: 'Large', size: '1.125rem' },
  { value: 'xl', label: 'Extra Large', size: '1.25rem' },
];

const fontFamilies = [
  { value: 'sans', label: 'Sans', family: 'var(--font-geist-sans), sans-serif' },
  { value: 'serif', label: 'Serif', family: 'Georgia, "Times New Roman", serif' },
  { value: 'mono', label: 'Mono', family: 'var(--font-geist-mono), monospace' },
];

interface EditorToolbarProps {
  textSize: string;
  fontFamily: string;
  onTextSizeChange: (size: string) => void;
  onFontFamilyChange: (family: string) => void;
  onExport: () => void;
}

export function EditorToolbar({
  textSize,
  fontFamily,
  onTextSizeChange,
  onFontFamilyChange,
  onExport,
}: EditorToolbarProps) {
  const textSizeValue = textSize || 'base';
  const fontFamilyValue = fontFamily || 'sans';
  const { isInstallable, install } = usePWAInstall();

  return (
    <div className="absolute top-3 right-3 md:top-6 md:right-6 flex items-center gap-2 z-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Select value={fontFamilyValue} onValueChange={onFontFamilyChange}>
              <SelectTrigger className="w-[100px] h-8 text-sm bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilies.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Font family</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Select value={textSizeValue} onValueChange={onTextSizeChange}>
              <SelectTrigger className="w-[120px] h-8 text-sm bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {textSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Text size</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onExport}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
          >
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Export as TXT</p>
        </TooltipContent>
      </Tooltip>
      {isInstallable && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={install}
              variant="outline"
              size="sm"
              className="flex-shrink-0"
            >
              <DownloadCloud className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Install App</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export { textSizes, fontFamilies };

