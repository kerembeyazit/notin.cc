'use client';

import { useState, useMemo } from 'react';
import { Note } from '@/types/note';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTheme } from '@/hooks/useTheme';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Plus, FileText, Trash2, X, Moon, Sun, Search, List } from 'lucide-react';

interface NoteSidebarProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onNewNote: () => void;
  onDeleteNote: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export function NoteSidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onNewNote,
  onDeleteNote,
  isOpen = true,
  onClose,
}: NoteSidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompact, setIsCompact] = useLocalStorage<boolean>('compactMode', false);
  const compactValue = typeof isCompact === 'boolean' ? isCompact : false;
  
  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) {
      return notes;
    }
    const query = searchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );
  }, [notes, searchQuery]);
  
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
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div 
        className={`
          w-80 border-r flex flex-col h-screen
          fixed inset-y-0 left-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">notin</h1>
            <div className="flex items-center gap-2">
              <Button onClick={toggleTheme} size="sm" variant="ghost" className="h-8 w-8 p-0">
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button onClick={onNewNote} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">New Note</span>
                <span className="sm:hidden">New</span>
              </Button>
              {onClose && (
                <Button onClick={onClose} size="sm" variant="ghost" className="md:hidden">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 text-sm"
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
              {searchQuery && filteredNotes.length !== notes.length && (
                <span className="ml-1">of {notes.length}</span>
              )}
            </p>
            <Button 
              onClick={() => setIsCompact(!compactValue)} 
              size="sm" 
              variant="ghost" 
              className="h-7 w-7 p-0"
              title={compactValue ? 'Expand view' : 'Compact view'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

      <ScrollArea className="flex-1 h-0">
        <div className={`p-2 ${compactValue ? 'space-y-1' : 'space-y-2'}`}>
          {filteredNotes.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>{searchQuery ? 'No notes found' : 'No notes yet'}</p>
              <p className="text-sm">{searchQuery ? 'Try a different search' : 'Create your first note'}</p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              compactValue ? (
                <div
                  key={note.id}
                  className={`py-1.5 px-2 rounded cursor-pointer transition-colors group flex items-center justify-between ${
                    selectedNoteId === note.id
                      ? 'bg-muted/50'
                      : 'hover:bg-muted/30'
                  }`}
                  onClick={() => onSelectNote(note.id)}
                >
                  <h3 className="text-sm font-medium truncate flex-1 min-w-0">
                    {note.title || 'Untitled Note'}
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 ml-2 h-6 w-6 p-0 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this note?')) {
                        onDeleteNote(note.id);
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              ) : (
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
                        if (window.confirm('Are you sure you want to delete this note?')) {
                          onDeleteNote(note.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              )
            ))
          )}
        </div>
      </ScrollArea>
    </div>
    </>
  );
}

