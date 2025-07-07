
import {
  ArrowLeft,
  Shield,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { PaymentForm } from "./payment-form";
import { Suspense } from "react";

function OrderSummary({ plan, cycle, price }: { plan: string, cycle: string, price: number }) {
    const total = price / 100;
    const tax = total * 0.08; // Example 8% tax
    const finalTotal = total + tax;

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex justify-between">
                <span className="text-muted-foreground">{plan} Plan ({cycle})</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2">Features Included:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Core Accounting features</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Serva AI Assistant</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Up to 10 users</li>
                    </ul>
                </div>
                <Separator />
                <div>
                    <h4 className="font-semibold mb-2">Security & Trust</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> 256-bit SSL encryption</li>
                        <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> PCI DSS compliant</li>
                    </ul>
                </div>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">
                    Need Help? Chat with Us
                </Button>
            </CardFooter>
        </Card>
    );
}

function PaymentPageContent() {
    const searchParams = new URLSearchParams(window.location.search);
    const plan = searchParams.get("plan") || "Professional";
    const cycle = searchParams.get("cycle") || "yearly";
    const price = parseInt(searchParams.get("price") || "35640", 10);
    
    return (
        <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <div className="mb-8">
                <Button variant="ghost" asChild>
                <Link href="/pricing">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Pricing
                </Link>
                </Button>
                <div className="mt-4 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Checkout</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>Secure Checkout</span>
                </div>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Step 2 of 2</div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PaymentForm price={price} />
                </div>
                <div className="lg:col-span-1">
                    <OrderSummary plan={plan} cycle={cycle} price={price} />
                </div>
            </div>

            <footer className="mt-16 border-t pt-8 text-center text-sm text-muted-foreground">
                <p className="mb-2">30-Day Money-Back Guarantee</p>
                <div className="flex justify-center gap-4">
                <Link href="/help/legal" className="hover:underline">Privacy Policy</Link>
                <Link href="/help/legal" className="hover:underline">Terms of Service</Link>
                </div>
            </footer>
        </div>
    );
}


export default function PaymentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PaymentPageContent />
        </Suspense>
    )
}
