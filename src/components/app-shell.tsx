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
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mainNavLinks, secondaryNavLinks, type NavLink } from "@/lib/nav-links";
import { Logo } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const renderNavLinks = (links: NavLink[]) => {
    return links.map((link) => (
      <SidebarMenuItem key={link.href}>
        <Link href={link.href} passHref legacyBehavior>
          <SidebarMenuButton
            as="a"
            isActive={pathname === link.href}
            tooltip={link.tooltip}
          >
            <link.icon />
            <span>{link.label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    ));
  };

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        variant="inset"
        collapsible="icon"
        className="border-none shadow-none dark:bg-sidebar"
      >
        <SidebarHeader className="h-16 justify-center p-2 group-data-[collapsible=icon]:p-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
          >
            <Logo className="size-8 text-primary" />
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              FinView
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-2">
          <SidebarMenu>{renderNavLinks(mainNavLinks)}</SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-2">
          <SidebarMenu>
            {renderNavLinks(secondaryNavLinks)}
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">
              {mainNavLinks.find((link) => pathname.startsWith(link.href))?.label ||
               secondaryNavLinks.find((link) => pathname.startsWith(link.href))?.label ||
                'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" alt="@user" data-ai-hint="user avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
