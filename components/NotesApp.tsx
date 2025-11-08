'use client';

import { useState } from 'react';
import { Note } from '@/types/note';
import { useNotes } from '@/hooks/useNotes';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useResponsive } from '@/hooks/useResponsive';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NoteSidebar } from '@/components/NoteSidebar';
import { NoteEditor } from '@/components/NoteEditor';
import { WelcomeModal } from '@/components/WelcomeModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';

interface NotesAppProps {
  isLoaded: boolean;
}

export function NotesApp({ isLoaded }: NotesAppProps) {
  const {
    notes,
    selectedNoteId,
    setSelectedNoteId,
    selectedNote,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();

  const { isDesktop, isSidebarOpen, setIsSidebarOpen } = useResponsive();
  const [hasSeenWelcome, setHasSeenWelcome] = useLocalStorage<boolean>('hasSeenWelcome', false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<{ id: string; title: string } | null>(null);

  useDocumentTitle(selectedNote);

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    // Only close sidebar on mobile
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNoteToDelete({ id, title: note.title || 'Untitled Note' });
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setNoteToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  const sidebarValue = typeof isSidebarOpen === 'boolean' ? isSidebarOpen : true;
  const hasSeenWelcomeValue = typeof hasSeenWelcome === 'boolean' ? hasSeenWelcome : false;
  const showWelcome = isLoaded && !hasSeenWelcomeValue;
  const showSidebar = !showWelcome;

  return (
    <>
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setHasSeenWelcome(true)} 
      />
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setNoteToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        noteTitle={noteToDelete?.title}
      />
      <div className="flex h-screen overflow-hidden">
        {showSidebar && (
          <div className={deleteModalOpen ? 'pointer-events-none opacity-50 blur-sm transition-all' : ''}>
            <NoteSidebar
              notes={notes}
              selectedNoteId={selectedNoteId}
              onSelectNote={handleSelectNote}
              onNewNote={createNote}
              onDeleteNote={handleDeleteClick}
              isOpen={sidebarValue}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
        )}
        <div 
          className="flex-1 flex flex-col min-w-0 transition-all duration-300"
          style={{ 
            marginLeft: isDesktop && sidebarValue && showSidebar ? '320px' : '0',
          }}
        >
          <NoteEditor 
            note={selectedNote} 
            onUpdateNote={updateNote}
            onToggleSidebar={() => setIsSidebarOpen(!sidebarValue)}
          />
        </div>
      </div>
    </>
  );
}

