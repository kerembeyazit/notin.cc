'use client';

import { Note } from '@/types/note';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useEditorSettings } from '@/hooks/useEditorSettings';
import { EditorToolbar } from '@/components/EditorToolbar';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function NoteEditor({ note, onUpdateNote, onToggleSidebar, isSidebarOpen = true }: NoteEditorProps) {
  const { textSize, fontFamily, setTextSize, setFontFamily, currentTextSize, currentFontFamily } = useEditorSettings();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!note) return;
    onUpdateNote({
      ...note,
      title: e.target.value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!note) return;
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

  return (
    <div className="flex-1 flex flex-col h-screen pt-3 pb-0 relative bg-background min-h-0 overflow-hidden">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggleSidebar}
            variant="ghost"
            size="sm"
            className="mb-2 self-start flex-shrink-0 ml-2 px-0"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>
      <EditorToolbar
        textSize={textSize}
        fontFamily={fontFamily}
        onTextSizeChange={setTextSize}
        onFontFamilyChange={setFontFamily}
        onExport={handleExportTxt}
        note={note}
      />
      <Card className="flex-1 flex flex-col px-4 pb-0 border-0 shadow-none relative bg-transparent md:bg-transparent min-h-0 overflow-hidden h-full">
        {note ? (
          <>
            <Input
              value={note.title}
              onChange={handleTitleChange}
              placeholder="Note title..."
              className="text-xl md:text-2xl font-semibold border-0 focus-visible:ring-0 mb-1 shadow-none pr-32 !bg-transparent dark:!bg-transparent flex-shrink-0 rounded-none px-0"
            />
            <Textarea
              value={note.content}
              onChange={handleContentChange}
              placeholder="Write your note here..."
              className="flex-1 resize-none border-0 focus-visible:ring-0 shadow-none !bg-transparent dark:!bg-transparent overflow-auto min-h-0 px-0 h-full"
              style={{ 
                fontSize: currentTextSize.size,
                fontFamily: currentFontFamily.family,
              }}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="text-lg">Select a note or create a new one</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

