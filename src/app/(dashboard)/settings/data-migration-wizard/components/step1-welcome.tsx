
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Clock, Shield } from "lucide-react";

export function Step1Welcome() {
  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Welcome to the Data Migration Wizard</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">This wizard will guide you through migrating your financial data into Mardisen Suite. This process ensures data integrity and a smooth transition.</p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left w-full max-w-4xl">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Clock className="w-8 h-8 text-primary"/>
                    <CardTitle className="text-lg">Estimated Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">The process typically takes 15-30 minutes, depending on the size of your data.</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Check className="w-8 h-8 text-primary"/>
                    <CardTitle className="text-lg">What You'll Need</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Access credentials to your old system or your data files (CSV, Excel).</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Shield className="w-8 h-8 text-primary"/>
                    <CardTitle className="text-lg">Secure & Safe</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Your data is encrypted during transfer. We recommend backing up your data before starting.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
