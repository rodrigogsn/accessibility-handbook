# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a platform for easy-to-reference accessibility (a11y) tips, recommendations, and dos/don'ts for React/TypeScript developers. It provides both a human-readable handbook (web UI) and machine-readable Cursor IDE rules targeting WCAG 2.1 AA compliance.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3 (class-based dark mode, CSS variable theme, Inter font, prettier-plugin-tailwindcss)
- **UI:** Radix UI primitives + shadcn/ui (`src/components/ui/`)
- **Icons:** Lucide React
- **Compiler:** React Compiler enabled (React 19)
- **Linting:** ESLint — Next.js core web vitals + TypeScript + `eslint-plugin-jsx-a11y`
- **Formatting:** Prettier with prettier-plugin-tailwindcss

---

## Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Static export build
npm run lint      # ESLint check
npm run format    # Prettier format
```

---

## Project Structure

```
src/
  app/              # Next.js App Router pages + root layout
  components/
    ui/             # shadcn/ui accessible components
  lib/
    utils.ts        # Shared utilities (cn helper)
.cursor/
  rules/
    accessibility.mdc  # Cursor IDE accessibility rules (WCAG 2.1 AA)
```

---

## Key Accessibility Standards

These rules target WCAG 2.1 AA compliance for React/TypeScript UIs:

- **Rule precedence**: Accessibility requirements override all other architectural concerns.
- **Semantic HTML first**: Prefer native elements (`<button>`, `<nav>`, `<input>`) over ARIA-augmented `div`/`span`.
- **ARIA**: Supplement semantic HTML only when native elements are insufficient. Never use ARIA that conflicts with native semantics.
- **Keyboard navigation**: All interactive elements must be keyboard accessible. Support Tab, Enter, Space, Escape, Arrow keys. Never use positive `tabindex` values.
- **Focus management**: Visible focus indicators required (never `outline: none` without custom replacement). Trap focus in modals; return focus to trigger on close.
- **Forms**: Every input needs an associated `<label>`. Use `aria-describedby` + `aria-invalid` for validation errors.
- **Color contrast**: 4.5:1 for normal text, 3:1 for large text (WCAG AA). Color alone cannot convey meaning.
- **Mobile**: Minimum 44×44px touch targets. iOS input font-size ≥ 16px to prevent auto-zoom (do NOT use `user-scalable=no`).
- **Testing**: Components must be findable via `@testing-library/react` accessibility queries (`getByRole`, `getByLabelText`). Use `eslint-plugin-jsx-a11y` for static analysis.

---

## Code Conventions

### TypeScript

- Strict mode: `strict`, `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`
- No `any` — no `@ts-ignore` without a comment explaining why
- Explicitly type function return values and object literals
- Path alias: `@/*` maps to `./src/*`

### Code Style

Enforced by Prettier (`.prettierrc`):

- 2-space indentation
- Single quotes
- Semicolons: yes
- Trailing commas: all
- Print width: 100
- Always use `===` and `!==`
- No unused variables or imports

### Naming

- Variables & functions: `camelCase`
- Booleans: auxiliary verbs — `isLoading`, `hasError`, `canSubmit`
- Components, interfaces, types: `PascalCase`
- Directories: `lowercase-with-dashes`

### File & Module Conventions

- Components: `.tsx`, hooks/utilities: `.ts`
- **Named exports** — avoid default exports
- File layout order: exported component → subcomponents → hooks/helpers → constants
- Files must be ≤ 400 lines

### React

- Use `function` keyword for components (not arrow functions at top level)
- Props via interfaces/types — no prop-types
- Hooks at top level only, never conditionally
- Extract reusable logic into custom hooks
- Prefer composition over inheritance
- Controlled components for forms
- `useRef` only for direct DOM access
- Always clean up `useEffect` side effects

### Performance & Memoization

- **React Compiler is enabled** — it handles memoization automatically
- Do NOT add `React.memo`, `useCallback`, or `useMemo` by default
- Use manual memoization only when you have a measured performance problem that the compiler cannot solve
- `React.lazy` + `Suspense` for code splitting
- Optimize images: WebP, lazy loading, `width`/`height` attributes

### State Management

- Lift state up before reaching for global state
- React Context only for tree-wide shared state (e.g. theme, auth)
- Keep stores small and focused

### Forms & Validation

- Simple forms: custom hooks
- Complex forms: `react-hook-form` + Zod
- Separate client-side and server-side validation

### Error Handling

- Validate inputs early with guard clauses
- Happy-path logic last
- User-friendly error messages (toasts)
- Log unexpected errors

### Styling

- Tailwind CSS utility classes (sorted automatically by prettier-plugin-tailwindcss)
- CSS variable–based theme (defined in `app/globals.css`, consumed via Tailwind config)
- Class merging via `cn()` from `@/lib/utils`
- Minimal global styles (reset + typography only in `globals.css`)

---

## Linting & Formatting

ESLint rules enforced (errors block build):

- `jsx-a11y/alt-text`
- `jsx-a11y/anchor-has-content`
- `jsx-a11y/aria-props`
- `jsx-a11y/aria-role`
- `jsx-a11y/label-has-associated-control`
- `jsx-a11y/no-autofocus` (warning)

Run `npm run lint` before committing. Run `npm run format` to auto-fix formatting.

---

## Non-Compliance

Accessibility violations block PR approval. Missing labels, alt text, or keyboard support requires immediate correction.
