
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getClientComplianceData } from "@/lib/actions";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import type { ElementType } from "react";

// This defines the possible statuses for individual documents.
type ComplianceStatus = "Complete" | "Pending" | "Missing";

// This defines the possible overall statuses for a client.
type OverallStatus = "On Track" | "At Risk" | "Needs Attention";

// This is the complete and correct shape for a client compliance object.
interface ClientCompliance {
  id: string;
  clientName: string;
  overallStatus: OverallStatus;
  engagementLetter: ComplianceStatus;
  w9: ComplianceStatus;
  bankStatements: ComplianceStatus;
}

const statusIcons: { [key: string]: ElementType } = {
  "Complete": CheckCircle2,
  "Pending": AlertCircle,
  "Missing": XCircle,
};

const statusColors: { [key: string]: string } = {
    "Complete": "text-success",
    "Pending": "text-yellow-500",
    "Missing": "text-destructive",
};

const overallStatusVariant: { [key: string]: "success" | "destructive" | "default" } = {
    "On Track": "success",
    "Needs Attention": "default",
    "At Risk": "destructive",
  };

export default async function ClientCompliancePage() {
    const complianceData: ClientCompliance[] = await getClientComplianceData();

    return (
        <div className="grid gap-6">
            <div>
                <h1 className="text-3xl font-bold">Client Compliance Check</h1>
                <p className="text-muted-foreground">
                    Review and manage the compliance status of all clients to ensure you have the required documentation.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Overview</CardTitle>
                    <CardDescription>
                        A summary of key compliance documents for each active client.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Overall Status</TableHead>
                                <TableHead>Engagement Letter</TableHead>
                                <TableHead>W-9</TableHead>
                                <TableHead>Bank Statements</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complianceData.map((client: ClientCompliance) => {
                                const IconLetter = statusIcons[client.engagementLetter];
                                const IconW9 = statusIcons[client.w9];
                                const IconBank = statusIcons[client.bankStatements];
                                
                                return (
                                    <TableRow key={client.id}>
                                        <TableCell className="font-medium">{client.clientName}</TableCell>
                                        <TableCell>
                                            <Badge variant={overallStatusVariant[client.overallStatus]}>{client.overallStatus}</Badge>
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <IconLetter className={`h-4 w-4 ${statusColors[client.engagementLetter]}`} />
                                            {client.engagementLetter}
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <IconW9 className={`h-4 w-4 ${statusColors[client.w9]}`} />
                                            {client.w9}
                                        </TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <IconBank className={`h-4 w-4 ${statusColors[client.bankStatements]}`} />
                                            {client.bankStatements}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm">Request Documents</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
