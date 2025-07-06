import { redirect } from 'next/navigation';

// This page is now a redirect. The new functionality lives in /reports-insights.
export default function InsightsRedirectPage() {
  redirect('/reports-insights/dashboard');
}
