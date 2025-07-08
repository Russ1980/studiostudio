
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
import { getClientBillingData } from "@/lib/actions";
import { FileText, CreditCard, UserPlus } from "lucide-react";

interface ClientBillingInfo {
  id: string;
  clientName: string;
  plan: string;
  status: string;
  nextBilling: string;
  amount: number;
}

const statusVariant: { [key: string]: "success" | "destructive" | "default" | "secondary" } = {
  Active: "success",
  "Past Due": "destructive",
  Trial: "default",
  Canceled: "secondary",
};

export default async function ClientBillingPage() {
    const billingData = await getClientBillingData();

    return (
        <div className="grid gap-6">
            <div>
                <h1 className="text-3xl font-bold">Client Billing Management</h1>
                <p className="text-muted-foreground">
                    Manage client subscriptions, view billing status, and update payment methods.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle>Total Monthly Revenue</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-3xl font-bold">$1,245.00</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Clients with Failed Payments</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-3xl font-bold text-destructive">1</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Renewals (30 days)</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-3xl font-bold">3</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Client Subscriptions</CardTitle>
                    <CardDescription>
                        An overview of all client billing plans and statuses.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Next Billing Date</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {billingData.map((client: ClientBillingInfo) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.clientName}</TableCell>
                                    <TableCell>{client.plan}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[client.status as keyof typeof statusVariant]}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{client.nextBilling}</TableCell>
                                    <TableCell className="text-right">${client.amount.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">Manage</Button>
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
