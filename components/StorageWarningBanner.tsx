'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StorageWarningBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function StorageWarningBanner({ isVisible, onClose }: StorageWarningBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500/10 dark:bg-yellow-500/20 border-b border-yellow-500/30 dark:border-yellow-500/40 mb-3 rounded-md">
      <div className="px-3 py-2 flex items-center justify-between gap-2">
        <p className="text-xs text-foreground flex-1 leading-tight">
          <span className="font-medium">⚠️ Warning:</span> Notes are stored locally in your browser. Clearing browser data may delete your notes.
        </p>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 flex-shrink-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

