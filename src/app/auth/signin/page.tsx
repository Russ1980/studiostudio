
"use client";

import { useRouter } from "next/navigation";
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
import Link from "next/link";

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
    </Card>
  );
}
