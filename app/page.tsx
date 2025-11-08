'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LoadingScreen } from '@/components/LoadingScreen';
import { NotesApp } from '@/components/NotesApp';

export default function Home() {
  const [, , isLoaded] = useLocalStorage<unknown[]>('notes', []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <TooltipProvider>
      <NotesApp isLoaded={isLoaded} />
    </TooltipProvider>
  );
}
