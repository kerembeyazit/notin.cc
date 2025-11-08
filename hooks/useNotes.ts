import { useState, useEffect, useMemo } from 'react';
import { Note } from '@/types/note';
import { useLocalStorage } from './useLocalStorage';

export function useNotes() {
  const [notes, setNotes, isLoaded] = useLocalStorage<Note[]>('notes', []);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const selectedNote = useMemo(() => {
    return notes.find((note) => note.id === selectedNoteId) || null;
  }, [notes, selectedNoteId]);

  // Auto-select first note when loaded
  useEffect(() => {
    if (isLoaded && notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    }
  }, [isLoaded, notes, selectedNoteId]);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
    return newNote;
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id: string) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
    
    if (selectedNoteId === id) {
      setSelectedNoteId(filteredNotes.length > 0 ? filteredNotes[0].id : null);
    }
  };

  return {
    notes,
    setNotes,
    isLoaded,
    selectedNoteId,
    setSelectedNoteId,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
  };
}

