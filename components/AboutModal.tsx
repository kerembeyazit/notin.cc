'use client';

import { Modal } from '@/components/ui/modal';
import { Github, Mail } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import packageJson from '@/package.json';

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
          <p className="text-sm text-muted-foreground">{packageJson.version}</p>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/licenses.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-foreground transition-colors"
                >
                  <span>Licenses</span>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>View licenses</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="pt-4 border-t">
          <a 
            href="https://www.producthunt.com/products/notin-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-notin&#0045;2" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1035835&theme=light&t=1762772860075" 
              alt="notin - notin&#0032;is&#0032;simple&#0032;note&#0032;app&#0032;and&#0032;works&#0032;entirely&#0032;in&#0032;your&#0032;browser&#0046; | Product Hunt" 
              style={{ width: '250px', height: '54px' }} 
              width="250" 
              height="54" 
            />
          </a>
        </div>
      </div>
    </Modal>
  );
}

