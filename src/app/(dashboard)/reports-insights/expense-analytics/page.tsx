import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getExpenseAnalyticsData } from "@/lib/actions";
import { ExpenseAnalyticsClient } from "./expense-analytics-client";


export default async function ExpenseAnalyticsPage() {
    const data = await getExpenseAnalyticsData();

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Expense Analytics</h1>
                <p className="text-muted-foreground">
                    Provide detailed analytics on company spending.
                </p>
            </div>

            <ExpenseAnalyticsClient data={data} />
            
            <Card>
                <CardHeader>
                    <CardTitle>Top Vendors by Spending</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.expenseByVendor.map((vendor: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{vendor.vendor}</TableCell>
                                    <TableCell>{vendor.category}</TableCell>
                                    <TableCell className="text-right">${vendor.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
