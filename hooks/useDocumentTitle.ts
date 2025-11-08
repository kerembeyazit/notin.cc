import { useEffect } from 'react';
import { Note } from '@/types/note';

export function useDocumentTitle(selectedNote: Note | null) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (selectedNote?.title) {
      document.title = `${selectedNote.title} - notin`;
    } else {
      document.title = 'notin';
    }
  }, [selectedNote?.title]);
}

