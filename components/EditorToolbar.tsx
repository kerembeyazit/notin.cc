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
import { Download, Clock } from 'lucide-react';
import { Note } from '@/types/note';

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
  note: Note | null;
}

export function EditorToolbar({
  textSize,
  fontFamily,
  onTextSizeChange,
  onFontFamilyChange,
  onExport,
  note,
}: EditorToolbarProps) {
  const textSizeValue = textSize || 'base';
  const fontFamilyValue = fontFamily || 'sans';

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const charCount = note ? note.content.length : 0;
  const wordCount = note 
    ? (note.title + ' ' + note.content).trim().split(/\s+/).filter(word => word.length > 0).length 
    : 0;

  return (
    <div className="absolute top-2 right-4 md:top-6 md:right-4 flex items-center gap-2 z-10">
      {note && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="hidden sm:block text-xs text-muted-foreground mr-2">
                {charCount.toLocaleString()} chars, {wordCount.toLocaleString()} words
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Character and word count</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-muted-foreground mr-2">
                <Clock className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Last edited: {formatDate(note.updatedAt)}</p>
            </TooltipContent>
          </Tooltip>
        </>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Select value={fontFamilyValue} onValueChange={onFontFamilyChange}>
              <SelectTrigger className="w-[100px] h-8 text-sm bg-transparent">
                <SelectValue placeholder="Font family" />
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
                <SelectValue placeholder="Text size" />
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
            disabled={!note}
          >
            <Download className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{note ? 'Export as TXT' : 'Create a note first'}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export { textSizes, fontFamilies };

