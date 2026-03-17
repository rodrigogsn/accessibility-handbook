'use client';

export interface TopicSideNavLink {
  id: string;
  label: string;
}

interface TopicSideNavProps {
  links: readonly TopicSideNavLink[];
  ariaLabel: string;
}

export function TopicSideNav({
  links,
  ariaLabel,
}: Readonly<TopicSideNavProps>): React.ReactElement {
  return (
    <nav aria-label={ariaLabel} className="fixed left-6 top-24 z-10 hidden w-48 lg:block">
      <ul className="flex flex-col gap-1 text-sm">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className="block rounded py-1.5 pr-2 text-muted-foreground underline-offset-2 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
