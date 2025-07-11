
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import { ShieldCheck, Lock, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase-client";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        <path d="M1 1h22v22H1z" fill="none"/>
    </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path d="M15.221 2.45a3.45 3.45 0 0 0-2.923 1.638 3.45 3.45 0 0 0-2.923-1.638c-1.391 0-2.822.809-3.921 2.408-1.517 2.219-1.229 5.862.008 8.169.608 1.149 1.488 2.422 2.607 3.513.999.989 1.839 1.829 2.943 1.829.171 0 .28-.01.442-.01.121 0 .23-.01.412-.01.181 0 .292 0 .442.01.152 0 .28.01.413.01 1.103 0 1.944-.84 2.943-1.829 1.119-1.091 2-2.364 2.608-3.513 1.237-2.307 1.525-5.95.008-8.169-1.1-1.599-2.53-2.408-3.92-2.408zM12.016 7.05c.01-.15.01-.33.01-.529a2.31 2.31 0 0 1 2.028-2.227c.13-.01.302-.01.483-.01.371 0 .732.04 1.033.131a2.33 2.33 0 0 0-1.876 2.504c0 .02.01.07.01.15.01.14.01.28.01.422a2.41 2.41 0 0 1-1.688 2.345c-.15.04-.33.09-.542.09-.431 0-.822-.09-1.121-.211a2.23 2.23 0 0 0-1.355-2.46c.542-.141 1.003-.312 1.428-.684z" fill="currentColor"/>
    </svg>
);

export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("loanbox55@gmail.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      toast({
        title: "Sign-in Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
        <Card className="w-full max-w-sm">
          <form onSubmit={handleSignIn}>
            <CardHeader className="text-center pt-8 pb-4">
                <div className="flex justify-center items-center gap-2 mb-4">
                    <Logo className="h-8 w-8"/>
                    <span className="text-2xl font-bold">Mardisen Suite</span>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                    OR
                    </span>
                </div>
              </div>
               <Button variant="outline" className="w-full" type="button" disabled>
                 <GoogleIcon className="h-4 w-4 mr-2" />
                Sign in with Google
              </Button>
               <Button variant="outline" className="w-full" type="button" disabled>
                 <AppleIcon className="h-4 w-4 mr-2" />
                Sign in with Apple
              </Button>
            </CardContent>
            <CardFooter className="flex-col items-center gap-4 pt-4">
                 <div className="flex gap-4 text-sm">
                  <Link href="#" className="underline hover:text-primary">
                    Forgot Your Password?
                  </Link>
                  <Link href="#" className="underline hover:text-primary">
                    Can't Log In?
                  </Link>
                </div>
                 <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link href="/pricing" className="underline hover:text-primary">
                        Sign up
                    </Link>
                 </div>
            </CardFooter>
          </form>
        </Card>
        <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span>SOC 2 Type II</span>
            </div>
            <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span>256-bit Encryption</span>
            </div>
        </div>
    </div>
  );
}
