'use client';

import { Note } from '@/types/note';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
}

export function NoteEditor({ note, onUpdateNote }: NoteEditorProps) {
  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/5">
        <div className="text-center text-muted-foreground">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Select a note or create a new one</p>
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

  return (
    <div className="flex-1 flex flex-col h-screen p-6">
      <Card className="flex-1 flex flex-col p-6">
        <Input
          value={note.title}
          onChange={handleTitleChange}
          placeholder="Note title..."
          className="text-2xl font-semibold border-0 focus-visible:ring-0 px-0 mb-4"
        />
        <Textarea
          value={note.content}
          onChange={handleContentChange}
          placeholder="Write your note here..."
          className="flex-1 resize-none border-0 focus-visible:ring-0 px-0"
        />
        <div className="mt-4 text-xs text-muted-foreground">
          Last updated:{' '}
          {new Date(note.updatedAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </Card>
    </div>
  );
}

