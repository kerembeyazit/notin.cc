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
import { EditorFooter } from '@/components/EditorFooter';
import { EmptyNoteView } from '@/components/EmptyNoteView';
import { Menu } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
  onToggleSidebar?: () => void;
}

export function NoteEditor({ note, onUpdateNote, onToggleSidebar }: NoteEditorProps) {
  const { textSize, fontFamily, setTextSize, setFontFamily, currentTextSize, currentFontFamily } = useEditorSettings();

  if (!note) {
    return <EmptyNoteView onToggleSidebar={onToggleSidebar} />;
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
    <div className="flex-1 flex flex-col h-screen p-3 relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggleSidebar}
            variant="ghost"
            size="sm"
            className="mb-2 self-start"
          >
            <Menu className="h-5 w-5" />
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
      />
      <Card className="flex-1 flex flex-col p-4 border-0 shadow-none relative" style={{ backgroundColor: 'transparent' }}>
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
            fontFamily: currentFontFamily.family,
            backgroundColor: 'transparent' 
          }}
        />
      </Card>
      <EditorFooter note={note} />
    </div>
  );
}

