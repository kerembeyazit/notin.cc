'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { AboutModal } from '@/components/AboutModal';
import { Info } from 'lucide-react';

interface EditorFooterProps {
  note?: unknown;
}

export function EditorFooter({}: EditorFooterProps) {
  const [aboutModalOpen, setAboutModalOpen] = useState(false);


  return (
    <>
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <div className="absolute top-4 right-4 md:top-6 md:right-4 flex items-center gap-2 z-10">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setAboutModalOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>About notin</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </>
  );
}

