"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Something went wrong</h1>
          <p className="text-lg mb-8">A critical error occurred.</p>
          <Button onClick={reset}>Try Again</Button>
        </main>
      </body>
    </html>
  );
}
