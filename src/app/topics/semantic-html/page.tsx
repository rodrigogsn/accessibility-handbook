import type { Metadata } from 'next';
import { TopicHeader } from '@/components/topic/TopicHeader';
import { ContentSection } from '@/components/topic/ContentSection';
import { CodeComparison } from '@/components/topic/CodeComparison';
import { semanticHtmlTopic } from '@/lib/topics';

export const metadata: Metadata = {
  title: 'Semantic HTML Foundation | Accessibility Handbook',
  description: semanticHtmlTopic.description,
};

export default function SemanticHtmlPage(): React.ReactElement {
  return (
    <main id="main-content" className="mx-auto max-w-3xl px-6 py-12">
      <TopicHeader topic={semanticHtmlTopic} />

      <div className="mt-10 flex flex-col gap-12">
        <ContentSection heading="Why This Matters">
          <p className="text-muted-foreground leading-relaxed">
            Screen readers and other assistive technologies derive their understanding of a page
            from the semantic role of HTML elements. A{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;button&gt;</code>{' '}
            announces itself as a button, supports{' '}
            <kbd className="rounded border border-border px-1 font-mono text-xs">Enter</kbd> and{' '}
            <kbd className="rounded border border-border px-1 font-mono text-xs">Space</kbd>{' '}
            activation, and disabled state, all built in. A{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;nav&gt;</code>{' '}
            creates a landmark users can jump to directly. An{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;h2&gt;</code>{' '}
            establishes document structure that lets screen reader users skim headings like a table
            of contents.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When you replace these with{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;div&gt;</code>{' '}
            and{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;span&gt;</code>,
            you strip out all that built-in meaning. You then have to manually recreate it with
            ARIA, which is harder to get right, easier to break, and requires more code to
            maintain.
          </p>
        </ContentSection>

        <ContentSection heading="Prefer Native Elements">
          <p className="text-muted-foreground leading-relaxed">
            Always reach for the native element first. It handles keyboard interaction, focus
            management, and accessible roles automatically.
          </p>
          <CodeComparison
            avoid={{
              label: 'Avoid:div masquerading as a button',
              code: `// Missing: role, keyboard support, focus, disabled state
<div onClick={handleSubmit} className="btn">
  Submit
</div>`,
            }}
            prefer={{
              label: 'Prefer:native button element',
              code: `// Built-in: keyboard, focus, role="button", disabled
<button type="submit" onClick={handleSubmit}>
  Submit
</button>`,
            }}
          />
          <CodeComparison
            avoid={{
              label: 'Avoid:div-based navigation',
              code: `<div className="nav">
  <div className="nav-item">Home</div>
  <div className="nav-item">About</div>
</div>`,
            }}
            prefer={{
              label: 'Prefer:semantic nav with list',
              code: `<nav aria-label="Main">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>`,
            }}
          />
        </ContentSection>

        <ContentSection heading="Heading Hierarchy">
          <p className="text-muted-foreground leading-relaxed">
            Use one <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;h1&gt;</code> per
            page. Use{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;h2&gt;</code>–
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;h6&gt;</code> in
            order. Never skip a level. Headings are the primary navigation mechanism for screen
            reader users: they let people jump directly to sections without reading every word.
          </p>
          <CodeComparison
            avoid={{
              label: 'Avoid:skipping heading levels',
              code: `<h1>Accessibility Handbook</h1>
{/* h2 skipped entirely */}
<h3>Semantic HTML</h3>
<h3>ARIA Attributes</h3>`,
            }}
            prefer={{
              label: 'Prefer:sequential hierarchy',
              code: `<h1>Accessibility Handbook</h1>

<h2>Foundations</h2>
<h3>Semantic HTML</h3>
<h3>ARIA Attributes</h3>`,
            }}
          />
        </ContentSection>

        <ContentSection heading="Lists">
          <p className="text-muted-foreground leading-relaxed">
            Use{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;ul&gt;</code> for
            unordered and{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;ol&gt;</code> for
            ordered lists. Screen readers announce the list role and item count (&ldquo;list, 4 items&rdquo;),
            which helps users understand the scope before reading each item. Styled{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;div&gt;</code>{' '}
            elements convey none of this.
          </p>
          <CodeComparison
            avoid={{
              label: 'Avoid:divs styled to look like a list',
              code: `<div className="list">
  <div className="list-item">Perceivable</div>
  <div className="list-item">Operable</div>
  <div className="list-item">Understandable</div>
  <div className="list-item">Robust</div>
</div>`,
            }}
            prefer={{
              label: 'Prefer:semantic list',
              code: `<ul>
  <li>Perceivable</li>
  <li>Operable</li>
  <li>Understandable</li>
  <li>Robust</li>
</ul>`,
            }}
          />
        </ContentSection>

        <ContentSection heading="Tables">
          <p className="text-muted-foreground leading-relaxed">
            Use{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;table&gt;</code>{' '}
            with proper structure for tabular data. The{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">scope</code> attribute
            on{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;th&gt;</code>{' '}
            tells screen readers whether a header applies to a column or row. This enables
            navigation like &ldquo;column 2 of 3: Price, $9.99&rdquo;.
          </p>
          <CodeComparison
            avoid={{
              label: 'Avoid:CSS grid pretending to be a table',
              code: `<div className="grid grid-cols-3">
  <div>Name</div>
  <div>Role</div>
  <div>Level</div>
  <div>Alice</div>
  <div>Engineer</div>
  <div>Senior</div>
</div>`,
            }}
            prefer={{
              label: 'Prefer:semantic table with headers',
              code: `<table>
  <caption>Team members</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Engineer</td>
      <td>Senior</td>
    </tr>
  </tbody>
</table>`,
            }}
          />
        </ContentSection>

        <ContentSection heading="When Native HTML Isn't Enough">
          <p className="text-muted-foreground leading-relaxed">
            Sometimes a design constraint makes a native element impractical. For example, a
            custom dropdown trigger that must be a{' '}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">&lt;div&gt;</code> for
            styling reasons. In those cases, ARIA can supplement, but it cannot replace what a
            native element would have given you for free. Ask: does it have a{' '}
            <strong>role</strong>, a <strong>name</strong>, and a <strong>state</strong>?
          </p>
          <CodeComparison
            avoid={{
              label: 'Avoid:div with no semantics',
              code: `// No role, no keyboard, no announced state
<div onClick={toggleMenu} className="menu-trigger">
  Menu
</div>`,
            }}
            prefer={{
              label: 'Prefer: ARIA-augmented div (or better, use <button>)',
              code: `// Has role, keyboard, and announced state
// Note: <button> is still preferable if styling allows
<div
  role="button"
  tabIndex={0}
  aria-expanded={isOpen}
  aria-haspopup="menu"
  onClick={toggleMenu}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') toggleMenu();
  }}
>
  Menu
</div>`,
            }}
          />
        </ContentSection>
      </div>
    </main>
  );
}
