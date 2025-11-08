'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { X, FileText, Search, Moon, Download, List } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      <Card className="relative z-50 w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Welcome to notin! 👋</h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Close</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            notin is a simple, privacy-focused note-taking app that runs entirely in your browser. 
            All your notes are saved locally on your device.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Create Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Click the "New Note" button in the sidebar to create your first note. 
                  Start typing and your notes are automatically saved.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Search className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Search Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Use the search box in the sidebar to quickly find notes by title or content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Moon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes using the moon/sun icon in the sidebar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Export Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Download your notes as .txt files using the download button in the editor.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <List className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Compact Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Toggle compact view to see more notes at once. Click the list icon next to the note count.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button onClick={onClose} className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

