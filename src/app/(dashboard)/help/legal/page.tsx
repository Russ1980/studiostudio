

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LegalPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Legal Documents</h1>
        <p className="text-muted-foreground">
          Review our Terms of Service, Privacy Policy, and other legal documents.
        </p>
      </div>
      <Card>
        <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="terms">Terms of Service</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            </TabsList>
            <TabsContent value="terms" className="mt-4 p-6">
                <CardTitle>Terms of Service</CardTitle>
                <CardDescription className="mb-4">Last Updated: July 22, 2024</CardDescription>
                <ScrollArea className="h-96 pr-6">
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                        <p>Welcome to Mardisen Suite. These terms and conditions outline the rules and regulations for the use of our services.</p>
                        <p>By accessing this application we assume you accept these terms and conditions. Do not continue to use Mardisen Suite if you do not agree to take all of the terms and conditions stated on this page.</p>
                        <h4>1. License to Use</h4>
                        <p>Unless otherwise stated, Mardisen Suite and/or its licensors own the intellectual property rights for all material on the application. All intellectual property rights are reserved. You may access this from Mardisen Suite for your own personal use subjected to restrictions set in these terms and conditions.</p>
                        <p>This is placeholder text. A full Terms of Service document would be much more detailed, covering aspects like user responsibilities, payment terms, liability limitations, and governing law.</p>
                    </div>
                </ScrollArea>
            </TabsContent>
            <TabsContent value="privacy" className="mt-4 p-6">
                <CardTitle>Privacy Policy</CardTitle>
                <CardDescription className="mb-4">Last Updated: July 22, 2024</CardDescription>
                 <ScrollArea className="h-96 pr-6">
                    <div className="prose prose-sm max-w-none text-muted-foreground">
                        <p>Your privacy is important to us. It is Mardisen Suite's policy to respect your privacy regarding any information we may collect from you across our application.</p>
                        <h4>1. Information We Collect</h4>
                        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                        <h4>2. Security of Your Data</h4>
                        <p>We take security seriously and take reasonable measures to protect your information. This includes using encryption for data in transit and at rest, and implementing strict access controls within our organization.</p>
                        <p>This is placeholder text. A complete Privacy Policy would detail the types of data collected, how it's used, data retention policies, user rights under laws like GDPR or CCPA, and contact information for the data controller.</p>
                    </div>
                </ScrollArea>
            </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
