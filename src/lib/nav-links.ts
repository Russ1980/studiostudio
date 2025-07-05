import {
  Briefcase,
  BookOpen,
  LayoutDashboard,
  Repeat,
  Search,
  Settings,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
};

export const mainNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase, tooltip: 'Portfolio' },
  { href: '/search', label: 'Search', icon: Search, tooltip: 'Search Stocks' },
  { href: '/trading', label: 'Paper Trading', icon: Repeat, tooltip: 'Paper Trading' },
  { href: '/learn', label: 'Learn', icon: BookOpen, tooltip: 'Learning Center' },
  { href: '/insights', label: 'AI Insights', icon: Sparkles, tooltip: 'AI Insights' },
];

export const secondaryNavLinks: NavLink[] = [
  { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Settings' },
];
