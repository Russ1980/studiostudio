
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
      {children}
    </Link>
  );

  const DropdownNavLink = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors">
          {title}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background border-border text-foreground">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-white" />
          <span className="font-semibold text-lg text-white">Mardisen</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <DropdownNavLink title="Solutions">
            <DropdownMenuItem asChild><Link href="/solutions">Financial Reporting</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/solutions">Invoicing</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/solutions">Payroll</Link></DropdownMenuItem>
          </DropdownNavLink>
          <DropdownNavLink title="Product">
            <DropdownMenuItem asChild><Link href="/product">Features</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/product">Serva AI</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/product">Integrations</Link></DropdownMenuItem>
          </DropdownNavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <DropdownNavLink title="Company">
             <DropdownMenuItem asChild><Link href="/company">About</Link></DropdownMenuItem>
             <DropdownMenuItem asChild><Link href="/company">Team</Link></DropdownMenuItem>
             <DropdownMenuItem asChild><Link href="/company">Careers</Link></DropdownMenuItem>
          </DropdownNavLink>
          <NavLink href="/for-accountants">For Accountants</NavLink>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signin">Request Demo</Link>
          </Button>
        </div>
        <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
                <Menu />
            </Button>
        </div>
      </div>
      {mobileMenuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full bg-background z-50 p-4 border-b border-border">
              <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8 text-white" />
                    <span className="font-semibold text-lg text-white">Mardisen</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                      <X />
                  </Button>
              </div>
              <nav className="flex flex-col gap-4">
                <NavLink href="/solutions">Solutions</NavLink>
                <NavLink href="/product">Product</NavLink>
                <NavLink href="/pricing">Pricing</NavLink>
                <NavLink href="/company">Company</NavLink>
                <NavLink href="/for-accountants">For Accountants</NavLink>
                <hr className="border-border"/>
                <Button variant="ghost" asChild>
                    <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild>
                    <Link href="/signin">Request Demo</Link>
                </Button>
              </nav>
          </div>
      )}
    </header>
  );
}

function LandingFooter() {
    return (
        <footer className="bg-secondary text-secondary-foreground">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    <div className="col-span-2 md:col-span-1">
                         <Link href="/" className="flex items-center gap-2 mb-4">
                            <Logo className="h-8 w-8 text-white" />
                            <span className="font-semibold text-lg">Mardisen</span>
                        </Link>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-semibold">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/product" className="hover:text-foreground">Features</Link></li>
                            <li><Link href="/product" className="hover:text-foreground">Serva AI</Link></li>
                            <li><Link href="/product" className="hover:text-foreground">Integrations</Link></li>
                            <li><Link href="/product" className="hover:text-foreground">Security</Link></li>
                            <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Solutions</h4>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/solutions" className="hover:text-foreground">Financial Reporting</Link></li>
                            <li><Link href="/solutions" className="hover:text-foreground">Invoicing</Link></li>
                            <li><Link href="/solutions" className="hover:text-foreground">Payroll</Link></li>
                            <li><Link href="/solutions" className="hover:text-foreground">Expense Tracking</Link></li>
                            <li><Link href="/solutions" className="hover:text-foreground">Multi-Company Billing</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Resources</h4>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                            <li><Link href="/help" className="hover:text-foreground">Help Center</Link></li>
                        </ul>
                        <h4 className="font-semibold pt-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/company" className="hover:text-foreground">About</Link></li>
                            <li><Link href="/company" className="hover:text-foreground">Team</Link></li>
                            <li><Link href="/company" className="hover:text-foreground">Careers</Link></li>
                            <li><Link href="/help/contact-support" className="hover:text-foreground">Contact</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Specialized</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/for-accountants" className="hover:text-foreground">For Accountants</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4 col-span-2 md:col-span-1">
                        <h4 className="font-semibold">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground">Get the latest news and updates from Mardisen.</p>
                        <form className="flex gap-2">
                           <Input type="email" placeholder="you@company.com" className="bg-muted border-muted-foreground/20 text-white placeholder:text-muted-foreground" />
                           <Button type="submit" variant="secondary" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <ArrowRight className="h-4 w-4" />
                           </Button>
                        </form>
                    </div>
                </div>
                 <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Mardisen Suite. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
