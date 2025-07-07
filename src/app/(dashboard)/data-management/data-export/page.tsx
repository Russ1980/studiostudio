
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { getExportHistory } from "@/lib/actions";
import { ExportForm } from "./export-form";

const statusVariant: { [key: string]: "success" | "destructive" } = {
  Completed: "success",
  Failed: "destructive",
};

export default async function DataExportPage() {
    const exportHistory = await getExportHistory();
    
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Data Export</h1>
                <p className="text-muted-foreground">
                    Export data out of the application for external analysis, reporting, or local backup.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                    <ExportForm />
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Export History</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Data Set</TableHead>
                                        <TableHead>Format</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {exportHistory.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.date}</TableCell>
                                            <TableCell>{item.dataSet}</TableCell>
                                            <TableCell>{item.format}</TableCell>
                                            <TableCell><Badge variant={statusVariant[item.status as keyof typeof statusVariant]}>{item.status}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                {item.status === 'Completed' && <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4"/>Download</Button>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    )
}
