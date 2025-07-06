

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { RefreshCw, Wrench, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const updates = [
    { version: "v2.1.3", date: "2024-07-22", type: "Enhancement", description: "Added multi-window support and built out all placeholder pages." },
    { version: "v2.1.2", date: "2024-07-20", type: "Bug Fix", description: "Resolved issue with Data Migration Wizard context provider." },
    { version: "v2.1.1", date: "2024-07-18", type: "New Feature", description: "Launched the initial version of the Data Migration Wizard." },
];

const typeVariant : { [key: string]: 'default' | 'success' | 'destructive' } = {
    'Enhancement': 'default',
    'New Feature': 'success',
    'Bug Fix': 'destructive',
};

export default function UpdatesMaintenancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Updates & Maintenance</h1>
        <p className="text-muted-foreground">
          Information on software updates and scheduled maintenance windows.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><RefreshCw /> Release Notes</CardTitle>
                <CardDescription>A log of recent changes and improvements to the application.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {updates.map(update => (
                        <li key={update.version}>
                            <div className="flex items-center gap-4">
                               <p className="font-mono text-sm">{update.version}</p>
                               <Badge variant={typeVariant[update.type]}>{update.type}</Badge>
                               <p className="text-sm text-muted-foreground ml-auto">{update.date}</p>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wrench /> Scheduled Maintenance</CardTitle>
                <CardDescription>Information on upcoming service interruptions.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center p-8 border-dashed border rounded-lg h-full">
                <Bell className="h-10 w-10 text-muted-foreground mb-4"/>
                <p className="font-semibold">No scheduled maintenance at this time.</p>
                <p className="text-sm text-muted-foreground">We will announce any planned downtime here and via email at least 48 hours in advance.</p>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
