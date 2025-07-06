
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
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
  SidebarRail,
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks, type NavLink } from "@/lib/nav-links";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ChevronsLeft,
  Activity,
  File as FileIcon,
  User,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";

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


function renderNavLinks(
  links: NavLink[],
  pathname: string,
  isCollapsed: boolean,
  level = 1
) {
  return links.map((link) => (
    <SidebarMenuItem key={link.href || link.label}>
      {link.items && link.items.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={link.label}
              size="lg"
              className="w-full"
              variant="default"
            >
                <span className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-2">
                    {(isCollapsed || ['Settings', 'Help'].includes(link.label)) && link.icon && <link.icon className="size-3.5" />}
                    <span className="flex-1 text-left">{link.label}</span>
                  </span>
                  {!isCollapsed && (
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  )}
                </span>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {renderNavLinks(link.items, pathname, isCollapsed, level + 1)}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <SidebarMenuButton
          asChild
          isActive={pathname === link.href}
          tooltip={link.label}
          size={level > 1 ? "sm" : "lg"}
          className={cn(level > 1 && "h-8")}
          variant="default"
        >
          <Link href={link.href || "#"}>
             <span className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  {(!isCollapsed || ['Settings', 'Help'].includes(link.label)) && link.icon && <link.icon className="size-3.5" />}
                  <span>{link.label}</span>
                </span>
              </span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  ));
}

const StyledDropdownMenuItem = ({ href, icon: Icon, title, description, special = false }) => (
  <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
    <Link
      href={href}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border bg-card p-2.5 text-card-foreground transition-colors hover:border-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-ring",
        special && "border-orange-500/50 bg-orange-500/10 hover:border-orange-500 hover:bg-orange-500/20"
      )}
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

export function AppShell({ children, user }: { children: React.ReactNode, user: UserType }) {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
 
  return (
    <>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-sidebar">
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

        <SidebarRail />

        <SidebarContent className="p-2">
          <SidebarMenu>{renderNavLinks(navLinks, pathname, isCollapsed)}</SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="User Profile"
                variant="default"
                className="justify-start"
              >
                <span className="flex w-full items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="group-data-[collapsible=icon]:hidden">{user.name}</span>
                </span>
                <LogOut className="ml-auto group-data-[collapsible=icon]:hidden h-3.5 w-3.5" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <Separator className="my-1 bg-sidebar-border" />
          <SidebarTrigger className="h-9 w-9 mx-auto rounded-full bg-sidebar-accent hover:bg-sidebar-primary text-sidebar-accent-foreground">
            {isCollapsed ? <ChevronsRight className="size-5" /> : <ChevronsLeft className="size-5" />}
          </SidebarTrigger>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
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
                          <StyledDropdownMenuItem href="/accounting/journal-entries/new" icon={FilePlus} title="New Transaction" description="Record a new journal entry." />
                          <StyledDropdownMenuItem href="/reports-insights/builder" icon={FileBarChart} title="New Report" description="Build a custom report from scratch." />
                          
                          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Export</p>
                          <StyledDropdownMenuItem href="/data-management/data-export" icon={FileOutput} title="Export Center" description="Export data to CSV, PDF, or Excel." />
                         
                          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Import Data</p>
                           <StyledDropdownMenuItem href="/data-management/data-import" icon={FileInput} title="Import Wizard" description="Import data from external sources." />
                           <StyledDropdownMenuItem href="/banking/connections" icon={Database} title="Connect Bank Data" description="Sync with your financial institutions." />

                           <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Print &amp; Share</p>
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
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-9" />
            </div>
             <Button variant="outline" size="sm" className="bg-accent text-accent-foreground border-accent-foreground/20 hover:bg-accent/90">
              <Wand2 className="mr-2" />
              Serva AI Ready
            </Button>
            <Button variant="secondary" size="sm">Ask Serva AI...</Button>
            
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserPlus className="h-5 w-5" />
                  <span className="sr-only">Add User</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <RefreshCw className="h-5 w-5" />
                  <span className="sr-only">Refresh</span>
                </Button>
                <Separator orientation="vertical" className="h-6 mx-1" />
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Moon className="h-5 w-5" />
                  <span className="sr-only">Toggle Theme</span>
                </Button>
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
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" className="flex items-center gap-2 p-1 pr-2 rounded-full h-auto">
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
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Log out</DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
            <div className="flex items-center justify-between border-b bg-background p-4 md:px-6">
                <Breadcrumb />
                {pathname === '/dashboard' && (
                  <Button variant="outline" size="sm" className="bg-accent text-accent-foreground border-accent-foreground/20 hover:bg-accent/90">
                      <Wand2 className="mr-2 h-4 w-4" />
                      <span>Serva AI • Enterprise Task Assistant •</span>
                      <span className="text-accent-foreground/70 ml-1">Ask Serva AI...</span>
                  </Button>
                )}
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6">
                {children}
            </div>
        </main>
      </SidebarInset>
    </>
  );
}
