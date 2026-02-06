"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Something went wrong</h1>
      <p className="text-muted-foreground text-lg mb-8">An unexpected error occurred.</p>
      <Button onClick={reset}>Try Again</Button>
    </main>
  );
}
