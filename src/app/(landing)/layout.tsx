
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
    <Link href={href} className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
      {children}
    </Link>
  );

  const DropdownNavLink = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
          {title}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="font-semibold text-lg text-gray-800">Mardisen</span>
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
          <div className="md:hidden absolute top-0 left-0 w-full bg-white z-50 p-4">
              <div className="flex justify-between items-center mb-6">
                  <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-semibold text-lg text-gray-800">Mardisen</span>
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
                <hr/>
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
        <footer className="bg-primary text-primary-foreground">
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
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline">Features</Link></li>
                            <li><Link href="#" className="hover:underline">Serva AI</Link></li>
                            <li><Link href="#" className="hover:underline">Integrations</Link></li>
                            <li><Link href="#" className="hover:underline">Security</Link></li>
                            <li><Link href="#" className="hover:underline">Pricing</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Solutions</h4>
                         <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline">Financial Reporting</Link></li>
                            <li><Link href="#" className="hover:underline">Invoicing</Link></li>
                            <li><Link href="#" className="hover:underline">Payroll</Link></li>
                            <li><Link href="#" className="hover:underline">Expense Tracking</Link></li>
                            <li><Link href="#" className="hover:underline">Multi-Company Billing</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Resources</h4>
                         <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline">Blog</Link></li>
                            <li><Link href="#" className="hover:underline">Help Center</Link></li>
                        </ul>
                        <h4 className="font-semibold pt-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline">About</Link></li>
                            <li><Link href="#" className="hover:underline">Team</Link></li>
                            <li><Link href="#" className="hover:underline">Careers</Link></li>
                            <li><Link href="#" className="hover:underline">Contact</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold">Specialized</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:underline">For Accountants</Link></li>
                        </ul>
                    </div>
                     <div className="space-y-4 col-span-2 md:col-span-1">
                        <h4 className="font-semibold">Stay Updated</h4>
                        <p className="text-sm">Get the latest news and updates from Mardisen.</p>
                        <form className="flex gap-2">
                           <Input type="email" placeholder="you@company.com" className="bg-primary-foreground/10 border-primary-foreground/20 text-white placeholder:text-primary-foreground/60" />
                           <Button type="submit" variant="secondary" className="bg-white text-primary hover:bg-gray-200">
                                <ArrowRight className="h-4 w-4" />
                           </Button>
                        </form>
                    </div>
                </div>
                 <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm">
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
    <div className="flex flex-col min-h-dvh bg-white text-gray-800">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
