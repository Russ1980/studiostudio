"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/icons";
import { ShieldCheck } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    // Simulate a successful login and redirect to the dashboard
    router.push("/dashboard");
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSignIn}>
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo className="h-10 w-10"/>
            </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" defaultValue="loanbox55@gmail.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" defaultValue="admin123" required />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <Separator className="my-2" />
           <Button variant="outline" className="w-full" type="button" disabled>
            Sign in with Google
          </Button>
           <Button variant="outline" className="w-full" type="button" disabled>
            Sign in with SSO
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
             <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/pricing" className="underline">
                    Sign up
                </Link>
             </div>
        </CardFooter>
      </form>
      <div className="px-6 pb-6 text-center">
        <Separator className="mb-4" />
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Enterprise-Grade Security</p>
        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> SOC 2</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> HIPAA</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> GDPR</span>
        </div>
      </div>
    </Card>
  );
}
