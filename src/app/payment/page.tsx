"use client";

import {
  ArrowLeft,
  Shield,
  CreditCard,
  Apple,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const GooglePayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#F4F4F4"/>
        <path d="M17.4069 9.87878H6.5828C6.18244 9.87878 5.86011 10.2011 5.86011 10.6015V13.3985C5.86011 13.7989 6.18244 14.1212 6.5828 14.1212H17.4069C17.8073 14.1212 18.1296 13.7989 18.1296 13.3985V10.6015C18.1296 10.2011 17.8073 9.87878 17.4069 9.87878Z" fill="#4285F4"/>
        <path d="M15.0069 11.7513C15.0069 11.2312 14.5888 10.8131 14.0687 10.8131H9.921C9.40092 10.8131 8.9828 11.2312 8.9828 11.7513V12.2487C8.9828 12.7688 9.40092 13.1869 9.921 13.1869H14.0687C14.5888 13.1869 15.0069 12.7688 15.0069 12.2487V11.7513Z" fill="white"/>
    </svg>
)

export default function PaymentPage() {
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
            <Card>
                <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid gap-4">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Button variant="secondary" className="h-auto py-3 border-primary">
                        <CreditCard className="mr-2" />
                        Credit/Debit Card
                        </Button>
                        <Button variant="outline" className="h-auto py-3" disabled>
                        <Apple className="mr-2" />
                        Apple Pay
                        </Button>
                        <Button variant="outline" className="h-auto py-3" disabled>
                            <GooglePayIcon className="mr-2 h-6 w-6"/>
                            Google Pay
                        </Button>
                    </div>
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiration</Label>
                        <Input id="expiry" placeholder="MM / YY" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="cardholder-name">Cardholder Name</Label>
                        <Input id="cardholder-name" placeholder="John Doe" />
                    </div>
                    <Separator />
                    <div>
                        <h3 className="text-lg font-semibold">Billing Information</h3>
                        <div className="mt-4 grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="company-name">Company Name</Label>
                                <Input id="company-name" placeholder="Your Company Inc." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="you@company.com" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" placeholder="(555) 123-4567" />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="country">Country</Label>
                                <Select>
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="us">United States</SelectItem>
                                        <SelectItem value="ca">Canada</SelectItem>
                                        <SelectItem value="gb">United Kingdom</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full">
                        Confirm & Pay
                    </Button>
                </CardFooter>
                </Card>
        </div>
        <div className="lg:col-span-1">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Professional Plan (Yearly)</span>
                    <span className="font-semibold">$356.40</span>
                    </div>
                    <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="font-semibold">$28.51</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>$384.91</span>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="font-semibold mb-2">Features Included:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> All Starter features</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Serva AI Assistant</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-success" /> Payroll System</li>
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
