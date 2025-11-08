'use client';

import { Note } from '@/types/note';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { FileText, Github, Menu, Download, Type, Mail } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
  onToggleSidebar?: () => void;
}

const textSizes = [
  { value: 'sm', label: 'Small', class: 'text-sm', size: '0.875rem' },
  { value: 'base', label: 'Medium', class: 'text-base', size: '1rem' },
  { value: 'lg', label: 'Large', class: 'text-lg', size: '1.125rem' },
  { value: 'xl', label: 'Extra Large', class: 'text-xl', size: '1.25rem' },
];

export function NoteEditor({ note, onUpdateNote, onToggleSidebar }: NoteEditorProps) {
  const [textSize, setTextSize] = useLocalStorage<string>('textSize', 'base');
  const textSizeValue = textSize || 'base';
  if (!note) {
    return (
      <div className="flex-1 flex flex-col h-screen p-3 bg-muted/5">
        <Button
          onClick={onToggleSidebar}
          variant="ghost"
          size="sm"
          className="mb-2 self-start"
          title="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">Select a note or create a new one</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="flex-1">
            notin is a simple note-taking application and works entirely in your browser. Your notes are saved to your device.
          </span>
          <div className="flex items-center gap-3 sm:ml-4 flex-shrink-0">
            <a
              href="mailto:cerembeyazit@gmail.com?subject=notin"
              className="hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/kerembeyazit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({
      ...note,
      title: e.target.value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNote({
      ...note,
      content: e.target.value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleExportTxt = () => {
    if (!note) return;
    
    const content = `${note.title || 'Untitled Note'}\n\n${note.content}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || 'untitled-note'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentTextSize = textSizes.find(size => size.value === textSizeValue) || textSizes[1];

  return (
    <div className="flex-1 flex flex-col h-screen p-3">
      <Button
        onClick={onToggleSidebar}
        variant="ghost"
        size="sm"
        className="mb-2 self-start"
        title="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <Card className="flex-1 flex flex-col p-4 border-0 shadow-none relative" style={{ backgroundColor: 'transparent' }}>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-10">
          <div className="relative">
            <select
              value={textSizeValue}
              onChange={(e) => setTextSize(e.target.value)}
              className="appearance-none bg-transparent border border-input rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer pr-8"
            >
              {textSizes.map((size) => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
            <Type className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
          </div>
          <Button
            onClick={handleExportTxt}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <Input
          value={note.title}
          onChange={handleTitleChange}
          placeholder="Note title..."
          className="text-2xl md:text-3xl font-semibold border-0 focus-visible:ring-0 px-0 mb-4 shadow-none pr-32"
          style={{ backgroundColor: 'transparent' }}
        />
        <Textarea
          value={note.content}
          onChange={handleContentChange}
          placeholder="Write your note here..."
          className="flex-1 resize-none border-0 focus-visible:ring-0 px-0 shadow-none"
          style={{ 
            fontSize: currentTextSize.size, 
            backgroundColor: 'transparent' 
          }}
        />
      </Card>
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-muted-foreground">
        <span className="flex-1">
          notin is a simple note-taking application and works entirely in your browser. Your notes are saved to your device.
        </span>
        <div className="flex items-center gap-3 sm:ml-4 flex-shrink-0">
          <a
            href="mailto:cerembeyazit@gmail.com?subject=notin"
            className="hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/kerembeyazit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

