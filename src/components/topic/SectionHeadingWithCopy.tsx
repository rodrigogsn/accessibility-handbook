'use client';

import { useEffect, useRef, useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const COPY_RESET_MS = 1500;

interface SectionHeadingWithCopyProps {
  sectionId: string;
  heading: string;
  copyLinkLabel: string;
  copiedLabel: string;
}

export function SectionHeadingWithCopy({
  sectionId,
  heading,
  copyLinkLabel,
  copiedLabel,
}: Readonly<SectionHeadingWithCopyProps>): React.ReactElement {
  const [isCopied, setIsCopied] = useState(false);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  function handleCopy(event: React.MouseEvent) {
    event.preventDefault();
    const url = `${globalThis.location.origin}${globalThis.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      if (resetTimeoutRef.current !== null) {
        clearTimeout(resetTimeoutRef.current);
      }
      setIsCopied(true);
      resetTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        resetTimeoutRef.current = null;
      }, COPY_RESET_MS);
    });
  }

  return (
    <>
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {isCopied ? copiedLabel : ''}
      </span>
      <div className="group flex items-center gap-2">
        <h2 className="min-w-0 text-xl font-semibold tracking-tight text-foreground">
          <span className="border-b border-dotted border-muted-foreground/50 pb-0.5">
            {heading}
          </span>
        </h2>
        <button
          type="button"
          aria-label={isCopied ? copiedLabel : copyLinkLabel}
          onClick={handleCopy}
          className={cn(
            'flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1.5 rounded px-2 py-1.5 text-sm text-muted-foreground opacity-0 transition-opacity hover:bg-accent hover:text-accent-foreground hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background group-hover:opacity-100',
            isCopied && 'text-foreground',
          )}
        >
          <LinkIcon className="h-4 w-4 shrink-0" aria-hidden />
          {isCopied ? <span className="font-medium">{copiedLabel}</span> : null}
        </button>
      </div>
    </>
  );
}
