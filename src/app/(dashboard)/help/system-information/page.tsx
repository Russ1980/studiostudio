

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Database, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

const systemStatus = [
  { name: "Application UI", status: "Operational", icon: CheckCircle2, color: "text-success" },
  { name: "API Services", status: "Operational", icon: CheckCircle2, color: "text-success" },
  { name: "Database", status: "Operational", icon: CheckCircle2, color: "text-success" },
  { name: "Third-Party Integrations (Stripe)", status: "Degraded Performance", icon: AlertTriangle, color: "text-yellow-500" },
];

export default function SystemInformationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">System Information</h1>
        <p className="text-muted-foreground">
          View application version details and live system status.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Version Details</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
            <div>
                <p className="font-semibold">Application Version</p>
                <p className="text-muted-foreground">v2.1.3</p>
            </div>
            <div>
                <p className="font-semibold">Environment</p>
                <p className="text-muted-foreground">Production</p>
            </div>
            <div>
                <p className="font-semibold">Last Updated</p>
                <p className="text-muted-foreground">2024-07-22 10:00 AM PST</p>
            </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Real-time status of our services.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {systemStatus.map(item => {
                    const Icon = item.icon;
                    return (
                        <li key={item.name} className="flex items-center justify-between p-4 rounded-lg border">
                            <span className="font-medium">{item.name}</span>
                            <div className={`flex items-center gap-2 font-semibold ${item.color}`}>
                                <Icon className="h-4 w-4" />
                                <span>{item.status}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </CardContent>
        <CardFooter>
            <Button variant="link" className="text-muted-foreground">View Status Page →</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
