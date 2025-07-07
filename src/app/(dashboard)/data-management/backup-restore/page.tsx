
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, History, CloudDownload, RotateCcw, Clock } from "lucide-react";
import { getBackupRestoreData } from "@/lib/actions";
import { BackupButton } from "./backup-button";

const statusVariant: { [key: string]: "success" | "destructive" } = {
  Success: "success",
  Failed: "destructive",
};

export default async function BackupRestorePage() {
  const { kpiData, backupHistory } = await getBackupRestoreData();
  
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Backup & Restore</h1>
        <p className="text-muted-foreground">
          Manage the safety and integrity of the entire system's data through automated and manual backups.
        </p>
      </div>
      
       <Card>
        <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold">Create an On-Demand Backup</h2>
            <p className="text-muted-foreground mt-2 mb-4">Create an immediate, full system backup. This may take a few minutes.</p>
            <BackupButton />
        </CardContent>
       </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
     
      <Card>
        <CardHeader>
            <CardTitle>Backup History</CardTitle>
            <CardDescription>A log of all recent backup attempts.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {backupHistory.map((backup, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-mono">{backup.timestamp}</TableCell>
                            <TableCell>{backup.type}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell><Badge variant={statusVariant[backup.status as keyof typeof statusVariant]}>{backup.status}</Badge></TableCell>
                            <TableCell className="text-right">
                                {backup.status === 'Success' && (
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="sm"><RotateCcw className="mr-2"/>Restore</Button>
                                        <Button variant="outline" size="sm"><CloudDownload className="mr-2"/>Download</Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
