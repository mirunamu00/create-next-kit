import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Badge variant="secondary" className="mb-4">
        FE Template
      </Badge>
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Welcome to your new project
      </h1>
      <p className="text-muted-foreground text-lg text-center max-w-md mb-8">
        Next.js, Tailwind CSS, shadcn/ui, and more. Ready to build.
      </p>
      <div className="flex gap-4">
        <Button>Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </main>
  );
}
