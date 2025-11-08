'use client';

import { useState, useEffect } from 'react';
import { Note } from '@/types/note';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NoteSidebar } from '@/components/NoteSidebar';
import { NoteEditor } from '@/components/NoteEditor';

export default function Home() {
  const [notes, setNotes, isLoaded] = useLocalStorage<Note[]>('notes', []);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useLocalStorage<boolean>('sidebarOpen', true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // On mobile, start with sidebar closed
    const checkScreenSize = () => {
      const isDesktopSize = window.innerWidth >= 768;
      setIsDesktop(isDesktopSize);
      
      if (!isDesktopSize) {
        const sidebarValue = typeof isSidebarOpen === 'boolean' ? isSidebarOpen : true;
        if (sidebarValue) {
          setIsSidebarOpen(false);
        }
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  useEffect(() => {
    if (isLoaded && notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id);
    }
  }, [isLoaded, notes, selectedNoteId]);

  useEffect(() => {
    if (selectedNote?.title) {
      document.title = `${selectedNote.title} - notin`;
    } else {
      document.title = 'notin';
    }
  }, [selectedNote]);

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

  const sidebarValue = typeof isSidebarOpen === 'boolean' ? isSidebarOpen : true;

  return (
    <div className="flex h-screen overflow-hidden">
      <NoteSidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={(id) => {
          handleSelectNote(id);
          // Only close sidebar on mobile
          if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
          }
        }}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
        isOpen={sidebarValue}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div 
        className="flex-1 flex flex-col min-w-0 transition-all duration-300"
        style={{ 
          marginLeft: isDesktop && sidebarValue ? '320px' : '0',
        }}
      >
        <NoteEditor 
          note={selectedNote} 
          onUpdateNote={handleUpdateNote}
          onToggleSidebar={() => setIsSidebarOpen(!sidebarValue)}
        />
      </div>
    </div>
  );
}
