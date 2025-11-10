'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LicensesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_LICENSE_TEXT = `notin - A simple note-taking application

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

Third-Party Licenses

This project uses the following open-source packages:

@radix-ui/react-scroll-area (MIT)
@radix-ui/react-select (MIT)
@radix-ui/react-slot (MIT)
@radix-ui/react-tooltip (MIT)
class-variance-authority (MIT)
clsx (MIT)
lucide-react (ISC)
next (MIT)
react (MIT)
react-dom (MIT)
tailwind-merge (MIT)
tailwindcss (MIT)

For detailed license information of each package, please refer to their respective repositories or node_modules directories.`;

export function LicensesModal({ isOpen, onClose }: LicensesModalProps) {
  const [licenseText, setLicenseText] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Fetch licenses when modal opens
    let cancelled = false;
    
    // Set loading state in next tick to avoid synchronous setState
    Promise.resolve().then(() => {
      if (!cancelled) {
        setLoading(true);
      }
    });
    
    fetch('/licenses.txt', {
      cache: 'no-cache',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        if (!cancelled) {
          setLicenseText(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          // Fallback to embedded license text if file can't be loaded
          setLicenseText(FALLBACK_LICENSE_TEXT);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Licenses">
      <ScrollArea className="h-full min-h-0">
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

