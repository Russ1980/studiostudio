

// This layout file is now simpler, as the main shell and providers
// are handled by the RootLayoutClient. It just passes children through.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
