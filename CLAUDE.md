# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is a documentation repository containing accessibility (a11y) standards and rules for React-based web applications. The primary artifact is a Cursor IDE rules file at `.cursor/rules/accessibility.mdc`.

There are no build commands, dependencies, or test runners — this is a pure documentation repository.

## Structure

- `.cursor/rules/accessibility.mdc` — The main accessibility rules document. Uses Cursor's `.mdc` format (frontmatter + Markdown). The `globs: *.tsx,*.ts` frontmatter means these rules apply to TypeScript/React files in projects that import this ruleset.

## Key Standards Enforced

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

## Non-Compliance

Accessibility violations block PR approval. Missing labels, alt text, or keyboard support requires immediate correction.
