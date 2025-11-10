'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, title, children, showCloseButton = true }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />
      <Card className="relative z-[100] w-full max-w-lg p-6 max-h-[90vh] flex flex-col min-h-0 overflow-hidden">
        {(title || showCloseButton) && (
          <div className={`flex items-center ${title ? 'justify-between' : 'justify-end'} mb-4 flex-shrink-0`}>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            {showCloseButton && (
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
            )}
          </div>
        )}
        <div className="flex-1 min-h-0">
          {children}
        </div>
      </Card>
    </div>
  );
}

