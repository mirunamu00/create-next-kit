"use client";

import { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { FadeContent } from "@/components/animations/fade-content";
import { Button } from "@/components/ui/button";

const CLI_COMMAND = "npx @mirunamu/create-next-kit my-app";

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CLI_COMMAND);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6">
      <FadeContent direction="up">
        <div className="flex flex-col items-center text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Build faster with
            <br />
            create-next-kit
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mt-6">
            Production-ready Next.js starter kit with 30+ components,
            authentication, testing, and animations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" asChild>
              <a
                href="https://github.com/mirunamu00/create-next-kit"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-12 rounded-xl border bg-muted/50 px-5 py-3 flex items-center gap-4">
            <code className="font-mono text-sm text-foreground">
              {CLI_COMMAND}
            </code>
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </FadeContent>
    </section>
  );
}
