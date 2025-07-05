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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navLinks, type NavLink } from "@/lib/nav-links";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut, Moon, Search, ChevronsLeft, ChevronRight, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs if we are at the root of the dashboard
  if (segments.length === 0 || (segments.length === 1 && segments[0] === 'accountant-portal')) {
    return (
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Dashboard</span>
        </nav>
    );
  }
  
  return (
    <nav aria-label="Breadcrumb" className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
      <Link href="/accountant-portal" className="hover:text-foreground">Dashboard</Link>
      <ChevronRight className="h-4 w-4" />
      <span className="font-medium text-foreground capitalize">
        {segments.map(s => s.replace(/-/g, ' ')).join(' > ')}
      </span>
    </nav>
  );
}

function renderNavLinks(links: NavLink[], pathname: string, isCollapsed: boolean, level = 1) {
    return links.map((link, index) => (
      <SidebarMenuItem key={`${link.label}-${index}`}>
        {link.items && link.items.length > 0 ? (
          <Collapsible>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={link.label}
                size={level > 1 ? "sm" : "default"}
                className="w-full justify-start"
                variant="ghost"
              >
                <span className="flex w-full items-center gap-2">
                  {link.icon && <link.icon />}
                  <span className="flex-1 text-left">{link.label}</span>
                  {!isCollapsed && <ChevronRight className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />}
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
            className={cn(level > 1 && "h-8", "justify-start")}
            variant="ghost"
          >
            <Link href={link.href || '#'}>
              <span className="flex items-center gap-2">
                {link.icon && <link.icon />}
                <span>{link.label}</span>
              </span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    ));
  };


export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <SidebarProvider open={!isCollapsed} onOpenChange={(open) => setIsCollapsed(!open)}>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="border-r bg-sidebar"
      >
        <SidebarHeader className="h-16 flex items-center justify-between p-4 pr-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
          <Link
            href="/accountant-portal"
            className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
          >
            <Logo className="size-8 text-primary" />
            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                <span className="text-lg font-semibold text-sidebar-foreground">
                Mardisen
                </span>
            </div>
          </Link>
           <Badge variant="outline" className="text-xs ml-2 border-primary text-primary group-data-[collapsible=icon]:hidden">SUITE</Badge>
           <SidebarTrigger asChild className="ml-auto group-data-[collapsible=icon]:hidden">
             <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
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
              <SidebarMenuButton tooltip="User Profile" variant="ghost" className="justify-start">
                <span className="flex w-full items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary text-primary-foreground">N</AvatarFallback>
                  </Avatar>
                  <span>User</span>
                  <LogOut className="ml-auto" />
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="md:hidden" />
             <Breadcrumb />
          </div>
         
          <div className="flex flex-1 items-center justify-end gap-2">
             <div className="relative flex-1 max-w-sm ml-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-9" />
            </div>
            <Button variant="outline">
                <Bot className="mr-2" />
                Serva AI Ready
            </Button>
             <Button variant="secondary">
                Ask Serva AI...
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Moon className="h-5 w-5" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-0" variant="destructive">3</Badge>
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
