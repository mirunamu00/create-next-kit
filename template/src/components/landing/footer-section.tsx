"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function FooterSection() {
  return (
    <footer className="py-16 px-6 border-t">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Ready to build?
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Start with a solid foundation. Customize everything to make it yours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" asChild>
            <a
              href="https://github.com/mirunamu00/create-next-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started on GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://www.npmjs.com/package/@mirunamu/create-next-kit"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on npm
            </a>
          </Button>
        </div>

        <Separator className="my-8" />

        <p className="text-sm text-muted-foreground">
          Built with Next.js 16 by{" "}
          <a
            href="https://github.com/mirunamu00"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:underline"
          >
            mirunamu
          </a>
        </p>
      </div>
    </footer>
  );
}
