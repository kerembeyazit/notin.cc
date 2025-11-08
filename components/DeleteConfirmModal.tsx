'use client';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  noteTitle?: string;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, noteTitle }: DeleteConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Note">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Are you sure you want to delete <strong>{noteTitle || 'this note'}</strong>? This action cannot be undone.
        </p>
        <div className="flex items-center justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

