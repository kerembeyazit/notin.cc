'use client';

import { Note } from '@/types/note';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, FileText, Trash2 } from 'lucide-react';

interface NoteSidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
}

export function NoteSidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onNewNote,
  onDeleteNote,
}: NoteSidebarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-80 border-r bg-muted/10 flex flex-col h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">notin</h1>
          <Button onClick={onNewNote} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Note
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {notes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No notes yet</p>
              <p className="text-sm">Create your first note</p>
            </div>
          ) : (
            notes.map((note) => (
              <Card
                key={note.id}
                className={`p-3 cursor-pointer transition-all hover:shadow-md group ${
                  selectedNoteId === note.id
                    ? 'border-primary bg-primary/5'
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => onSelectNote(note.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate mb-1">
                      {note.title || 'Untitled Note'}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {note.content || 'No content'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatDate(note.updatedAt)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 ml-2 h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

