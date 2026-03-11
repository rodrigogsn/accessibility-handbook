// Root layout is intentionally transparent.
// The [locale] layout owns the <html> and <body> shell,
// allowing each locale page to set the correct lang attribute.
export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactNode {
  return children;
}
