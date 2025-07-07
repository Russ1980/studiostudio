
import { redirect } from 'next/navigation';

export default function RootDashboardRedirect() {
  // This page is now a redirect to ensure users always land on the main dashboard.
  redirect('/dashboard');
}
