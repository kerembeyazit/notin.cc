'use client';

import { Modal } from '@/components/ui/modal';
import { Github, Mail } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About notin">
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            notin is a modern, privacy-focused note-taking app that runs entirely in your browser. 
            Built with Next.js and shadcn/ui, it offers a clean, distraction-free writing experience. 
            All notes are saved locally, ensuring privacy and offline functionality. 
            Features include dark mode, customizable fonts, search, and export.
          </p>
          <p className="text-sm font-semibold mb-2">Version</p>
          <p className="text-sm text-muted-foreground">0.3.0</p>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm font-semibold mb-3">Links</p>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="mailto:cerembeyazit@gmail.com?subject=notin"
                  className="flex items-center gap-2 text-sm hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send email</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://github.com/kerembeyazit/notin.cc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </Modal>
  );
}

