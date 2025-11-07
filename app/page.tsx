'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NoteSidebar } from '@/components/NoteSidebar';
import { NoteEditor } from '@/components/NoteEditor';

export default function Home() {
  const [notes, setNotes, isLoaded] = useLocalStorage<Note[]>('notes', []);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  useEffect(() => {
    if (isLoaded && notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    }
  }, [isLoaded, notes, selectedNoteId]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const handleDeleteNote = (id: string) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    
    if (selectedNoteId === id) {
      setSelectedNoteId(filteredNotes.length > 0 ? filteredNotes[0].id : null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <NoteSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
      />
      <NoteEditor note={selectedNote} onUpdateNote={handleUpdateNote} />
    </div>
  );
}
