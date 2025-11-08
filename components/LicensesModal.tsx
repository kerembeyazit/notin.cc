'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LicensesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LicensesModal({ isOpen, onClose }: LicensesModalProps) {
  const [licenseText, setLicenseText] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch('/licenses.txt')
        .then((res) => res.text())
        .then((text) => {
          setLicenseText(text);
          setLoading(false);
        })
        .catch(() => {
          setLicenseText('Unable to load licenses.');
          setLoading(false);
        });
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Licenses">
      <ScrollArea className="max-h-[60vh]">
        <div className="pr-4">
          {loading ? (
            <p className="text-muted-foreground">Loading licenses...</p>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">
              {licenseText}
            </pre>
          )}
        </div>
      </ScrollArea>
    </Modal>
  );
}

