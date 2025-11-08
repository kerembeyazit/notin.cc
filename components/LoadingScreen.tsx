import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-full fixed inset-0 bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    </div>
  );
}

