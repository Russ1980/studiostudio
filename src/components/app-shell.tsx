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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks, type NavLink } from "@/lib/nav-links";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { cn } from "@/lib/utils";

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  const breadcrumbPath = [{ name: 'Home', href: '/dashboard' }];
  let currentPath = '';

  segments.forEach(segment => {
    currentPath += `/${segment}`;
    const name = segment.replace(/-/g, ' ');
    // Avoid adding "dashboard" to breadcrumb if it's the only segment
    if (name !== 'dashboard' || segments.length > 1) {
      breadcrumbPath.push({ name: name, href: currentPath });
    }
  });
  
  if (breadcrumbPath.length === 1 && breadcrumbPath[0].name === 'Home') {
      breadcrumbPath[0] = { name: 'Dashboard', href: '/dashboard' };
  }


  return (
    <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
      {breadcrumbPath.map((crumb, index) => (
        <React.Fragment key={crumb.href}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {index < breadcrumbPath.length - 1 ? (
             <Link href={crumb.href} className="hover:text-foreground capitalize">{crumb.name}</Link>
          ) : (
            <span className="font-medium text-foreground capitalize">{crumb.name}</span>
          )}
        </React.Fragment>
      ))}
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
              className="w-full justify-between"
              variant="ghost"
            >
              <span className="flex items-center gap-2">
                {link.icon && <link.icon />}
                <span className="flex-1 text-left">{link.label}</span>
              </span>
              {!isCollapsed && (
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
              )}
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
          className={cn(level > 1 && "h-8", "justify-between")}
          variant="ghost"
        >
          <Link href={link.href || "#"}>
             <span className="flex items-center gap-2">
              {link.icon && <link.icon />}
              <span>{link.label}</span>
            </span>
            {level === 1 && <ChevronRight className="h-4 w-4" />}
          </Link>
        </SidebarMenuButton>
      )}
    </SidebarMenuItem>
  ));
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <SidebarProvider
      open={!isCollapsed}
      onOpenChange={(open) => setIsCollapsed(!open)}
    >
      <Sidebar variant="sidebar" collapsible="icon" className="border-r bg-sidebar">
        <SidebarHeader className="h-16 flex items-center justify-between p-4 pr-2">
           <Link href="/dashboard" className="flex items-center gap-2">
              <Logo className="size-8 text-primary" />
              <div className="flex items-center group-data-[collapsible=icon]:hidden">
                <span className="text-lg font-semibold text-sidebar-foreground">
                  Mardisen
                </span>
                <Badge
                  variant="outline"
                  className="ml-2 border-sidebar-accent bg-sidebar-accent text-sidebar-foreground/80"
                >
                  SUITE
                </Badge>
              </div>
            </Link>
          <SidebarTrigger asChild className="ml-auto group-data-[collapsible=icon]:hidden">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
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
                variant="ghost"
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
                            File <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>New</DropdownMenuItem>
                        <DropdownMenuItem>Open</DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem>Save</DropdownMenuItem>
                        <DropdownMenuItem>Save As...</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-1">
                            Action <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Undo</DropdownMenuItem>
                        <DropdownMenuItem>Redo</DropdownMenuItem>
                         <DropdownMenuSeparator />
                        <DropdownMenuItem>Cut</DropdownMenuItem>
                        <DropdownMenuItem>Copy</DropdownMenuItem>
                        <DropdownMenuItem>Paste</DropdownMenuItem>
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
                <Button variant="outline" size="sm" className="bg-accent text-accent-foreground border-accent-foreground/20 hover:bg-accent/90">
                    <Wand2 className="mr-2 h-4 w-4" />
                    <span>Serva AI • Enterprise Task Assistant •</span>
                    <span className="text-accent-foreground/70 ml-1">Ask Serva AI...</span>
                </Button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6">
                {children}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
