'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useMemo } from 'react';
import { AboutModal } from '@/components/AboutModal';
import { Note } from '@/types/note';

interface EditorFooterProps {
  note: Note | null;
}

export function EditorFooter({ note }: EditorFooterProps) {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

  const stats = useMemo(() => {
    if (!note) return null;
    
    const totalLength = (note.title + note.content).length;
    const wordCount = (note.title + ' ' + note.content).trim().split(/\s+/).filter(word => word.length > 0).length;
    const charCount = note.content.length;
    
    return { totalLength, wordCount, charCount };
  }, [note]);

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
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground flex-shrink-0">
        {note && stats && (
          <div className="flex items-center gap-4">
            <span>{stats.charCount.toLocaleString()} characters</span>
            <span>{stats.wordCount.toLocaleString()} words</span>
            <span>Last edited: {formatDate(note.updatedAt)}</span>
          </div>
        )}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setAboutModalOpen(true)}
                className="hover:text-foreground transition-colors underline"
              >
                About
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>About notin</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="/licenses.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline"
              >
                Licenses
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>View licenses</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

