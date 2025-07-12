
import { Logo } from "@/components/icons";
import Link from "next/link";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/40">
       <header className="border-b bg-background">
         <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-8" />
                <span className="font-bold">Mardisen Suite</span>
            </Link>
         </div>
       </header>
      <main className="py-8 md:py-12">
        {children}
      </main>
    </div>
  );
}
