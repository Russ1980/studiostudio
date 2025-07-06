
"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarProvider,
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Bell,
  LogOut,
  Moon,
  Search,
  ChevronsLeft,
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
  DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  return links.map((link, index) => (
    <SidebarMenuItem key={`${link.label}-${index}`}>
      {link.items && link.items.length > 0 ? (
        <Collapsible>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              tooltip={link.label}
              size={level > 1 ? "sm" : "default"}
              className="w-full"
              variant="default"
            >
                <span className="flex w-full items-center justify-between">
                  <span className="flex items-center gap-2">
                    {link.icon && <link.icon />}
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
          size={level > 1 ? "sm" : "default"}
          className={cn(level > 1 && "h-8")}
          variant="default"
        >
          <Link href={link.href || "#"}>
             <span className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon />}
                  <span>{link.label}</span>
                </span>
                {!isCollapsed && level === 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  ));
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { toast } = useToast();

  const handleActionClick = (action: string) => {
    let description = "Action triggered.";
    switch (action) {
      case "save":
        description = "Your document has been saved successfully.";
        break;
      case "saveAsTemplate":
        description = "Coming soon: Save as template functionality.";
        break;
      case "exportPdf":
        description = "Exporting to PDF...";
        break;
      case "exportExcel":
        description = "Exporting to Excel...";
        break;
      case "shareEmail":
        description = "Preparing to share via email...";
        break;
      case "shareLink":
        description = "Coming soon: Share via link functionality.";
        break;
      case "signOut":
        description = "Signing you out...";
        break;
      case "newBudget":
        description = "Coming soon: New budget creation.";
        break;
      case "newGoal":
        description = "Coming soon: New financial goal creation.";
        break;
      case "openRecent":
        description = "Coming soon: Open recent documents.";
        break;
      default:
        description = "This feature is coming soon.";
        break;
    }
    toast({
      title: "Action",
      description: description,
    });
  };

  return (
    <SidebarProvider
      open={!isCollapsed}
      onOpenChange={(open) => setIsCollapsed(!open)}
    >
      <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-sidebar">
        <SidebarHeader className="h-14 flex items-center justify-between p-3 pr-2">
           <div className="flex items-center gap-2">
              <Logo className="size-8 text-primary" />
              <Link href="/dashboard" className="flex items-center group-data-[collapsible=icon]:hidden">
                <span className="text-lg font-semibold text-sidebar-foreground">
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
          <SidebarTrigger asChild className="ml-auto group-data-[collapsible=icon]:hidden">
             <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <ChevronsLeft />
              </Button>
          </SidebarTrigger>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>{renderNavLinks(navLinks, pathname, isCollapsed)}</SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2">
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
                      N
                    </AvatarFallback>
                  </Avatar>
                  <span className="group-data-[collapsible=icon]:hidden">User</span>
                </span>
                <LogOut className="ml-auto group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
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
                    <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Create New</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                              <Link href="/accounting/journal-entries/new"><FilePlus />New Transaction</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/reports-insights/builder"><FileBarChart />New Report</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick("newBudget")}><FileSpreadsheet />New Budget</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick("newGoal")}><TrendingUp />New Financial Goal</DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Current Document</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleActionClick("openRecent")}><FolderOpen />Open Recent</DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/communications/templates"><BookOpen />Open Templates</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleActionClick("save")}><Save />Save Current</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleActionClick("saveAsTemplate")}><FileCheck />Save As Template</DropdownMenuItem>
                        </DropdownMenuGroup>
                        
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Export</DropdownMenuLabel>
                           <DropdownMenuItem asChild>
                                <Link href="/data-management/data-export"><FileOutput />Export Center</Link>
                            </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick("exportPdf")}><FileText />Export to PDF</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick("exportExcel")}><TableIcon />Export to Excel</DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Import Data</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href="/data-management/data-import"><FileInput />Import Wizard</Link>
                            </DropdownMenuItem>
                             <DropdownMenuItem asChild>
                                <Link href="/banking/connections"><Database />Import Bank Data</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Print & Share</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => window.print()}><Printer />Print Document</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick("shareEmail")}><Mail />Share via Email</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleActionClick("shareLink")}><Share2 />Share via Link</DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                         <DropdownMenuGroup>
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href="/settings/security"><Shield />Security Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/settings"><Settings />File Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleActionClick("signOut")}><LogOut />Sign Out</DropdownMenuItem>
                         </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1">
                            <span>Action</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Banking Operations</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="text-primary focus:text-primary"><Link href="/banking/import-transactions"><Upload />Import Bank Transactions</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/banking/reconciliation"><Calculator />Run Bank Reconciliation</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/banking/accounts"><RefreshCw />Update Account Balances</Link></DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                       <DropdownMenuGroup>
                        <DropdownMenuLabel>Period Management</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="text-destructive/80 focus:text-destructive/80"><Link href="/accounting/periods/close"><Clock />Close Accounting Period</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/accounting/periods/reopen"><RefreshCw />Reopen Period</Link></DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Financial Reporting</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="text-primary focus:text-primary"><Link href="/reports-insights/financial-reports"><BarChart3 />Generate Financial Statements</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/reports/trial-balance"><Download />Export Trial Balance</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-success focus:text-success"><Link href="/reports-insights/dashboard"><TrendingUp />Performance Analytics</Link></DropdownMenuItem>
                      </DropdownMenuGroup>
                       <DropdownMenuSeparator />
                       <DropdownMenuGroup>
                        <DropdownMenuLabel>Client Operations</DropdownMenuLabel>
                        <DropdownMenuItem asChild className="text-success focus:text-success"><Link href="/client-management/invoicing/batch"><Mail />Send Monthly Invoices</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/payments/process"><CreditCard />Process Payments</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/client-management/billing"><DollarSign />Update Client Billing</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-destructive/80 focus:text-destructive/80"><Link href="/compliance/clients"><Shield />Client Compliance Check</Link></DropdownMenuItem>
                      </DropdownMenuGroup>
                       <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Data Management</DropdownMenuLabel>
                        <DropdownMenuItem asChild><Link href="/data-management/backup-restore"><Database />Backup Database</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-primary focus:text-primary"><Link href="/accounting/chart-of-accounts/import"><Upload />Import Chart of Accounts</Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/reports/validation"><FileText />Data Validation Report</Link></DropdownMenuItem>
                      </DropdownMenuGroup>
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
                                <AvatarFallback className="bg-primary text-primary-foreground">SJ</AvatarFallback>
                                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
                             </Avatar>
                             <div className="text-left hidden lg:block">
                                <p className="text-sm font-medium leading-none">Sarah</p>
                                <p className="text-xs text-muted-foreground">Admin</p>
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
    </SidebarProvider>
  );
}
