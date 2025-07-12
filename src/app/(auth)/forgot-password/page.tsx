
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { app } from "@/lib/firebase-client";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordReset = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox for instructions to reset your password.",
      });
      router.push("/signin");
    } catch (error: any) {
      console.error("Firebase Auth Error:", error);
      toast({
        title: "Request Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handlePasswordReset}>
        <CardHeader className="text-center pt-8 pb-4">
            <div className="flex justify-center items-center gap-2 mb-4">
                <Logo className="h-8 w-8"/>
                <span className="text-2xl font-bold">Mardisen Suite</span>
            </div>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
                Enter your email and we'll send you a link to reset your password.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Mail className="mr-2 h-4 w-4" />
            )}
            Send Reset Link
          </Button>
        </CardContent>
        <CardFooter>
            <Button variant="link" className="w-full text-muted-foreground" asChild>
                <Link href="/signin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Log In
                </Link>
            </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
