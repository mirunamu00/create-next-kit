import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Skeleton className="h-10 w-48 mb-4" />
      <Skeleton className="h-5 w-72 mb-2" />
      <Skeleton className="h-5 w-64" />
    </main>
  );
}
