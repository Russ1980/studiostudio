
"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuSub,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks, type NavLink } from "@/lib/nav-links";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Bell,
  LogOut,
  Moon,
  Search,
  ChevronRight,
  UserPlus,
  RefreshCw,
  ChevronDown,
  Wand2,
  FilePlus,
  FileBarChart,
  Sheet as FileSpreadsheet,
  TrendingUp,
  FolderOpen,
  Save,
  FileCheck,
  FileUp as FileOutput,
  FileText,
  Table as TableIcon,
  FileDown as FileInput,
  Database,
  Printer,
  Mail,
  Share2,
  Shield,
  Settings,
  BookOpen,
  Upload,
  Calculator,
  Clock,
  BarChart3,
  Download,
  CreditCard,
  DollarSign,
  Activity,
  File as FileIcon,
  User,
  ChevronsLeft,
  ChevronsRight,
  PanelLeft,
  Copy,
  Briefcase,
  ShoppingCart,
  AlertTriangle,
  CheckCircle,
  Info,
  Star,
  FileStack,
  Sun,
  Laptop
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/components/auth-provider";
import { Separator } from "@/components/ui/separator";
import { useServaAI } from "@/hooks/use-serva-ai";
import dynamic from "next/dynamic";
import { useAuth } from "@/components/auth-provider";
import { useTheme } from "next-themes";

const ServaAIWidget = dynamic(
  () => import('@/components/serva-ai/serva-ai-widget').then((mod) => mod.ServaAIWidget),
  { ssr: false }
);


function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbPath: { name: string; href: string }[] = [];
  let accumulatedPath = '';

  segments.forEach(segment => {
    accumulatedPath += `/${segment}`;
    const name = segment.replace(/-/g, ' ');
    breadcrumbPath.push({ name, href: accumulatedPath });
  });

  if (segments.length === 0) {
      return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
       <Link href="/dashboard" className="hover:text-foreground capitalize">Dashboard</Link>
      {breadcrumbPath.map((crumb, index) => {
        if (crumb.name === 'dashboard') return null;
        return (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="h-4 w-4" />
              {index < breadcrumbPath.length -1 && segments.length > 2 ? (
                 <Link href={crumb.href} className="hover:text-foreground capitalize">{crumb.name}</Link>
              ) : (
                <span className="font-medium text-foreground capitalize">{crumb.name}</span>
              )}
            </React.Fragment>
        )
      })}
    </nav>
  );
}

const renderDropdownItems = (links: NavLink[], userRole: string): React.ReactNode => {
    return links
    .filter(link => !link.allowedRoles || link.allowedRoles.includes(userRole))
    .map((link) => (
      <React.Fragment key={link.href || link.label}>
        {link.items && link.items.length > 0 ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {link.icon && <link.icon className="mr-2 size-4" />}
              <span>{link.label}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent
                sideOffset={8}
                alignOffset={-4}
                className="bg-sidebar border-sidebar-border text-sidebar-foreground"
              >
                {renderDropdownItems(link.items, userRole)}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem asChild>
            <Link href={link.href || "#"}>
              {link.icon && <link.icon className="mr-2 size-4" />}
              <span>{link.label}</span>
            </Link>
          </DropdownMenuItem>
        )}
      </React.Fragment>
    ));
};

function renderNavLinks(
  links: NavLink[],
  pathname: string,
  isCollapsed: boolean,
  userRole: string,
  level = 1
) {
  return links
    .filter(link => !link.allowedRoles || link.allowedRoles.includes(userRole))
    .map((link) => (
    <SidebarMenuItem key={link.href || link.label}>
      {link.items && link.items.length > 0 ? (
        isCollapsed && level === 1 ? (
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="w-full justify-center"
                    variant="default"
                  >
                    {link.icon && <link.icon className="size-5" />}
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                <p>{link.label}</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={12}
              alignOffset={-8}
              className="bg-sidebar border-sidebar-border text-sidebar-foreground w-56"
            >
              <DropdownMenuLabel>{link.label}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-sidebar-border" />
              <DropdownMenuGroup>
                {renderDropdownItems(link.items, userRole)}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={link.label}
                size={level > 1 ? "sm" : "lg"}
                className={cn("w-full", level > 1 && "h-8")}
                variant="default"
              >
                  <span className="flex w-full items-center justify-between">
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="size-4" />}
                      <span className="flex-1 text-left">{link.label}</span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {renderNavLinks(link.items, pathname, isCollapsed, userRole, level + 1)}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        )
      ) : (
        <SidebarMenuButton
          asChild
          isActive={pathname === link.href}
          tooltip={link.label}
          size={level > 1 ? "sm" : "lg"}
          className={cn(level > 1 && "h-8")}
          variant="default"
        >
          <Link href={link.href || "#"} data-onboarding={link.onboardingId}>
             <span className="flex w-full items-center gap-2">
                {link.icon && <link.icon className={cn("size-4", isCollapsed && level === 1 && "size-5")} />}
                <span className={cn((isCollapsed && level === 1) && "hidden")}>{link.label}</span>
              </span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  ));
}

const StyledDropdownMenuItem = ({ href, icon: Icon, title, description, special = false, ...props }: any) => (
  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border bg-card p-2.5 text-card-foreground transition-colors hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-ring",
        special && "border-orange-500/50 bg-orange-500/10 hover:border-orange-500 hover:bg-orange-500/20"
      )}
      {...props}
    >
      <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
          special ? "bg-orange-500/20 text-orange-600" : "bg-primary/10 text-primary"
      )}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
    </Link>
  </DropdownMenuItem>
);

const notifications = [
    { type: "warning", icon: AlertTriangle, title: "Tax Filing Deadline Approaching", description: "Form 941 is due in 3 days.", time: "1h ago" },
    { type: "success", icon: CheckCircle, title: "Payroll Complete", description: "The payroll for June 16-30 has been successfully processed.", time: "5h ago" },
    { type: "info", icon: Info, title: "New Client Onboarded", description: "Apex Solutions has completed the onboarding process.", time: "1d ago" },
];

export function AppShell({ children, user }: { children: React.ReactNode, user: AuthUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const { openServaAI } = useServaAI();
  const { signOut } = useAuth();
  const { setTheme } = useTheme();
  const isCollapsed = state === "collapsed";
 
  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-sidebar z-50">
        <SidebarHeader className="h-16 flex items-center p-3 border-b border-sidebar-border">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Logo className="size-8 text-primary" />
              <Link href="/dashboard" className="flex items-center group-data-[collapsible=icon]:hidden">
                <span className="font-semibold text-sidebar-foreground">
                  Mardisen
                </span>
                <Badge
                  variant="outline"
                  className="ml-2 border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground"
                >
                  SUITE
                </Badge>
              </Link>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>{renderNavLinks(navLinks, pathname, isCollapsed, user.role)}</SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
          {/* Footer content can go here if needed */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-card px-4 md:px-6 z-40">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>File</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-0">
                <div className="flex items-center gap-3 p-3 border-b">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <FileIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">File Menu</p>
                    <p className="text-xs text-muted-foreground">Create, save, export, and import data</p>
                  </div>
                </div>
                <ScrollArea className="h-96">
                  <div className="p-2 space-y-1">
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create New</p>
                    <StyledDropdownMenuItem href="/accounting/journal-entries/new" icon={FilePlus} title="New Transaction" description="Record a new journal entry." data-onboarding="new-transaction-link" />
                    <StyledDropdownMenuItem href="/reports-insights/builder" icon={FileBarChart} title="New Report" description="Build a custom report from scratch." />
                    <StyledDropdownMenuItem href="/operations/inventory/purchase-orders/new" icon={ShoppingCart} title="New Purchase Order" description="Create an order for new inventory." />
                    <StyledDropdownMenuItem href="/operations/job-costing/jobs/new" icon={Briefcase} title="New Job" description="Set up a new job to track costs." />
                    <StyledDropdownMenuItem href="/payroll/employee-management/new" icon={UserPlus} title="New Employee" description="Add a new employee to payroll." />
                    
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Export</p>
                    <StyledDropdownMenuItem href="/data-management/data-export" icon={FileOutput} title="Export Center" description="Export data to CSV, PDF, or Excel." />
                   
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Import Data</p>
                     <StyledDropdownMenuItem href="/data-management/data-import" icon={FileInput} title="Import Wizard" description="Import data from external sources." />
                     <StyledDropdownMenuItem href="/banking/connections" icon={Database} title="Connect Bank Data" description="Sync with your financial institutions." />

                     <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Print & Share</p>
                     <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
                       <button onClick={() => window.print()} className="flex w-full items-center gap-3 rounded-lg border bg-card p-2.5 text-card-foreground transition-colors hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-ring">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"><Printer className="h-4 w-4" /></div>
                          <div className="flex-1 text-left"><p className="font-semibold text-sm">Print Document</p><p className="text-xs text-muted-foreground truncate">Print the current view.</p></div>
                       </button>
                     </DropdownMenuItem>

                     <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Settings</p>
                      <StyledDropdownMenuItem href="/settings" icon={Settings} title="File Settings" description="Adjust application-wide settings." />
                  </div>
                </ScrollArea>
                <div className="p-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span>10 actions available</span>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>Action</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-0">
                <div className="flex items-center gap-3 p-3 border-b">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Activity className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Quick Actions</p>
                    <p className="text-xs text-muted-foreground">Common business operations</p>
                  </div>
                </div>
                <ScrollArea className="h-96">
                  <div className="p-2 space-y-1">
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Banking Operations</p>
                    <StyledDropdownMenuItem href="/banking/import-transactions" icon={Upload} title="Import Bank Transactions" description="Import and categorize bank..." />
                    <StyledDropdownMenuItem href="/banking/reconciliation" icon={Calculator} title="Run Bank Reconciliation" description="Reconcile bank accounts and..." />
                    <StyledDropdownMenuItem href="/banking/accounts" icon={RefreshCw} title="Update Account Balances" description="Refresh all account balance..." />

                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Period Management</p>
                    <StyledDropdownMenuItem href="/accounting/periods/close" icon={Clock} title="Close Accounting Period" description="Close current period and finalize..." special />
                    <StyledDropdownMenuItem href="/accounting/periods/reopen" icon={RefreshCw} title="Reopen Period" description="Reopen previously closed period" />
                    
                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Financial Reporting</p>
                    <StyledDropdownMenuItem href="/reports-insights/financial-reports" icon={BarChart3} title="Generate Financial Statements" description="Create P&amp;L, Balance Sheets, etc." />
                    <StyledDropdownMenuItem href="/reports/trial-balance" icon={Download} title="Export Trial Balance" description="Download the current trial balance." />
                    <StyledDropdownMenuItem href="/reports-insights/dashboard" icon={TrendingUp} title="Performance Analytics" description="View financial performance." />

                    <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client Operations</p>
                    <StyledDropdownMenuItem href="/client-management/invoicing/batch" icon={Mail} title="Send Monthly Invoices" description="Batch send invoices to clients." />
                    <StyledDropdownMenuItem href="/payments/process" icon={CreditCard} title="Process Payments" description="Process incoming client payments." />
                    <StyledDropdownMenuItem href="/client-management/billing" icon={DollarSign} title="Update Client Billing" description="Manage client subscriptions." />
                    <StyledDropdownMenuItem href="/compliance/clients" icon={Shield} title="Client Compliance Check" description="Verify client compliance status." />

                     <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Data Management</p>
                    <StyledDropdownMenuItem href="/data-management/backup-restore" icon={Database} title="Backup Database" description="Create a new system backup." />
                    <StyledDropdownMenuItem href="/accounting/chart-of-accounts/import" icon={Upload} title="Import Chart of Accounts" description="Import from a file." />
                    <StyledDropdownMenuItem href="/reports/validation" icon={FileText} title="Data Validation Report" description="Check for data inconsistencies." />
                  </div>
                </ScrollArea>
                <div className="p-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span>15 actions available</span>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                <Star className="h-5 w-5" />
                                <span className="sr-only">Favorites</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64">
                                <DropdownMenuLabel>Favorites</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={() => router.push('/invoicing/invoices')}>
                                    <FileStack className="mr-2 h-4 w-4" />
                                    <span>All Invoices</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => router.push('/accounting/chart-of-accounts')}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    <span>Chart of Accounts</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => router.push('/reports-insights/dashboard')}>
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    <span>Insights Dashboard</span>
                                </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                <span>Add current page</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent><p>Favorites</p></TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
             <Button variant="primary" size="sm" onClick={openServaAI}>
              <Wand2 className="mr-2" />
              Ask Serva AI
            </Button>
            
            <div className="flex items-center gap-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                            <UserPlus className="h-5 w-5" />
                            <span className="sr-only">Add User</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Invite User</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                    <Copy className="h-5 w-5" />
                                    <span className="sr-only">Open new window</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => window.open(window.location.origin, '_blank')}>
                                    New Window
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => window.open(window.location.href, '_blank')}>
                                    Duplicate Window
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent><p>New Window</p></TooltipContent>
                    </Tooltip>
                    <Separator orientation="vertical" className="h-6 mx-1" />
                     <Tooltip>
                        <TooltipTrigger asChild>
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                    <span className="sr-only">Toggle Theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        <Sun className="mr-2 h-4 w-4" />
                                        <span>Light</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        <Moon className="mr-2 h-4 w-4" />
                                        <span>Dark</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        <Laptop className="mr-2 h-4 w-4" />
                                        <span>System</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent><p>Toggle Theme</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full relative">
                                    <Bell className="h-5 w-5" />
                                    <Badge
                                        className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0"
                                        variant="destructive"
                                    >
                                        3
                                    </Badge>
                                    <span className="sr-only">Notifications</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80 md:w-96">
                                    <DropdownMenuLabel className="flex justify-between items-center">
                                        <span>Notifications</span>
                                        <Badge variant="secondary">3 New</Badge>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {notifications.map((notification, index) => (
                                            <DropdownMenuItem key={index} className="p-2 items-start cursor-pointer" onSelect={() => router.push('/communications/notifications')}>
                                                <notification.icon className={cn("h-5 w-5 mr-3 mt-1 shrink-0", {
                                                    'text-destructive': notification.type === 'warning',
                                                    'text-success': notification.type === 'success',
                                                    'text-primary': notification.type === 'info',
                                                })} />
                                                <div className="flex-1">
                                                    <p className="font-semibold text-sm">{notification.title}</p>
                                                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                                                    <p className="text-xs text-muted-foreground/70 mt-1">{notification.time}</p>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="justify-center" onSelect={() => router.push('/communications/notifications')}>
                                        View All Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipTrigger>
                        <TooltipContent><p>Notifications</p></TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="flex items-center gap-2 p-1 pr-2 rounded-full h-auto" data-onboarding="user-profile">
                             <Avatar className="h-8 w-8 relative">
                                <AvatarFallback className="bg-primary text-primary-foreground">{user.initials}</AvatarFallback>
                                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
                             </Avatar>
                             <div className="text-left hidden lg:block">
                                <p className="text-sm font-medium leading-none">{user.name.split(' ')[0]}</p>
                                <p className="text-xs text-muted-foreground">{user.role}</p>
                             </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem onSelect={() => router.push('/settings')}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => router.push('/settings/billing')}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => router.push('/settings')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={async () => {
                            await signOut();
                            router.push('/signin');
                        }}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <Breadcrumb />
              <div className="flex items-center gap-2">
                <Badge variant="outline">Sample Data Mode</Badge>
              </div>
            </div>
            {children}
        </main>
      </SidebarInset>
      <ServaAIWidget />
    </>
  );
}
