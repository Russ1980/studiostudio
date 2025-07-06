"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatabaseZap, ShoppingCart, CreditCard } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="grid gap-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl font-bold">Integrations</h1>
            <p className="text-muted-foreground">
                Connect the application with other third-party services for seamless data flow.
            </p>
            </div>
        </div>
      <Tabs defaultValue="accounting" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="payments">Payment Gateways</TabsTrigger>
        </TabsList>
        <TabsContent value="accounting" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Accounting Software</CardTitle>
                    <CardDescription>Sync data with your accounting platform.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><DatabaseZap className="h-6 w-6 text-secondary-foreground" /></div>
                                <CardTitle>QuickBooks</CardTitle>
                        </CardHeader>
                        <CardFooter><Button className="w-full">Connect</Button></CardFooter>
                    </Card>
                </CardContent>
             </Card>
        </TabsContent>
         <TabsContent value="ecommerce" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>E-commerce Platforms</CardTitle>
                     <CardDescription>Import sales and customer data from your online store.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><ShoppingCart className="h-6 w-6 text-secondary-foreground" /></div>
                                <CardTitle>Shopify</CardTitle>
                        </CardHeader>
                        <CardFooter><Button className="w-full" variant="outline">Connect</Button></CardFooter>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><ShoppingCart className="h-6 w-6 text-secondary-foreground" /></div>
                                <CardTitle>WooCommerce</CardTitle>
                        </CardHeader>
                        <CardFooter><Button className="w-full" variant="outline">Connect</Button></CardFooter>
                    </Card>
                </CardContent>
             </Card>
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Payment Gateways</CardTitle>
                     <CardDescription>Connect payment processors to accept online payments.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><CreditCard className="h-6 w-6 text-secondary-foreground" /></div>
                                <CardTitle>Stripe</CardTitle>
                        </CardHeader>
                        <CardFooter><Button className="w-full">Connect</Button></CardFooter>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-secondary p-3 rounded-lg"><CreditCard className="h-6 w-6 text-secondary-foreground" /></div>
                                <CardTitle>PayPal</CardTitle>
                        </CardHeader>
                        <CardFooter><Button className="w-full" variant="outline">Connect</Button></CardFooter>
                    </Card>
                </CardContent>
             </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
