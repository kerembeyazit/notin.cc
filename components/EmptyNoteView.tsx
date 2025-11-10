'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { FileText, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface EmptyNoteViewProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function EmptyNoteView({ onToggleSidebar, isSidebarOpen = true }: EmptyNoteViewProps) {
  return (
    <div className="flex-1 flex flex-col h-screen p-3 bg-muted/5">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onToggleSidebar}
            variant="ghost"
            size="sm"
            className="mb-2 self-start ml-4 px-0"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle sidebar</p>
        </TooltipContent>
      </Tooltip>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">Select a note or create a new one</p>
        </div>
      </div>
    </div>
  );
}

