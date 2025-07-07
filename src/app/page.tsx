import { redirect } from 'next/navigation';

// This page is now a redirect. The new landing page lives in /src/app/(landing)/page.tsx
export default function RootRedirect() {
  redirect('/');
}
