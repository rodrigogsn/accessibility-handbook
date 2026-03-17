import { cn } from '@/lib/utils';
import { SectionHeadingWithCopy } from '@/components/topic/SectionHeadingWithCopy';

interface ContentSectionProps {
  heading: string;
  children: React.ReactNode;
  className?: string;
  sectionId?: string;
  copyLinkLabel?: string;
  copiedLabel?: string;
}

export function ContentSection({
  heading,
  children,
  className,
  sectionId,
  copyLinkLabel,
  copiedLabel,
}: Readonly<ContentSectionProps>): React.ReactElement {
  const useHeadingWithCopy =
    sectionId !== undefined && copyLinkLabel !== undefined && copiedLabel !== undefined;

  return (
    <section
      id={sectionId}
      className={cn('flex flex-col gap-4', sectionId && 'scroll-mt-24', className)}
    >
      {useHeadingWithCopy ? (
        <SectionHeadingWithCopy
          sectionId={sectionId}
          heading={heading}
          copyLinkLabel={copyLinkLabel}
          copiedLabel={copiedLabel}
        />
      ) : (
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{heading}</h2>
      )}
      {children}
    </section>
  );
}
