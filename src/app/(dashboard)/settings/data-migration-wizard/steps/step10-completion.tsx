
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { CheckCircle2, FileText, LifeBuoy } from "lucide-react";

export function Step10Completion() {
  return (
    <div className="text-center flex flex-col items-center">
        <CheckCircle2 className="w-16 h-16 text-success mb-4" />
        <h2 className="text-2xl font-bold mb-2">Migration Complete!</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            Your data has been successfully migrated into Mardisen Suite. You can now access all your historical data within the platform.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left w-full max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Summary Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">A detailed report of the migration has been generated.</p>
                    <button className="text-primary font-semibold flex items-center gap-2"><FileText /> Download Report</button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">We recommend reviewing your Chart of Accounts and recent transactions to ensure everything looks correct.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">If you notice any issues, please contact our support team.</p>
                    <button className="text-primary font-semibold flex items-center gap-2"><LifeBuoy /> Contact Support</button>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
