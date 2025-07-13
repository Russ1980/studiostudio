
import { redirect } from 'next/navigation';

export default function LandingPageRedirect() {
  // This page is now a redirect to ensure users always land on the main dashboard if logged in,
  // or the sign-in page if not. The logic is handled in the root layout.
  redirect('/dashboard');
}
