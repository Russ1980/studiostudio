
import { redirect } from 'next/navigation';

// This file is intentionally left blank to resolve a routing conflict.
// The main landing page is now served from /src/app/(landing)/page.tsx.
export default function Page() {
  redirect('/dashboard');
}
