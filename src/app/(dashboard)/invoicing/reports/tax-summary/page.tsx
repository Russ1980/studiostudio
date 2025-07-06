import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter as TFoot
  } from "@/components/ui/table";
  import { CalendarIcon, Download, Printer } from "lucide-react";
  import { getTaxSummaryData } from "@/lib/actions";

  type TaxSummaryItem = {
    jurisdiction: string;
    taxableSales: number;
    nonTaxableSales: number;
    taxCollected: number;
  }
  
  export default async function TaxSummaryPage() {
    const taxData: TaxSummaryItem[] = await getTaxSummaryData();
  
    const totals = taxData.reduce((acc, item) => {
        acc.taxableSales += item.taxableSales;
        acc.nonTaxableSales += item.nonTaxableSales;
        acc.taxCollected += item.taxCollected;
        return acc;
    }, { taxableSales: 0, nonTaxableSales: 0, taxCollected: 0 });

    return (
      <div className="flex flex-col gap-6">
         <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Sales Tax Summary</h1>
              <p className="text-muted-foreground">Summarizes taxable sales and collected sales tax for easier filing.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline"><CalendarIcon /> As of Date</Button>
              <Button variant="outline"><Printer /> Print</Button>
              <Button><Download /> Export</Button>
            </div>
         </div>
         <Card>
              <CardHeader>
                  <CardTitle>Sales Tax by Jurisdiction</CardTitle>
              </CardHeader>
              <CardContent>
                  <Table>
                      <TableHeader>
                          <TableRow>
                              <TableHead>Jurisdiction</TableHead>
                              <TableHead className="text-right">Taxable Sales</TableHead>
                              <TableHead className="text-right">Non-Taxable Sales</TableHead>
                              <TableHead className="text-right">Tax Collected</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                          {taxData.map((row) => (
                              <TableRow key={row.jurisdiction}>
                                  <TableCell className="font-medium">{row.jurisdiction}</TableCell>
                                  <TableCell className="text-right">${row.taxableSales.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                  <TableCell className="text-right">${row.nonTaxableSales.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                                  <TableCell className="text-right font-bold">${row.taxCollected.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                      <TFoot>
                          <TableRow className="font-bold bg-muted/50 text-lg">
                              <TableCell>Total</TableCell>
                              <TableCell className="text-right">${totals.taxableSales.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                              <TableCell className="text-right">${totals.nonTaxableSales.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                              <TableCell className="text-right">${totals.taxCollected.toLocaleString('en-US', {minimumFractionDigits: 2})}</TableCell>
                          </TableRow>
                      </TFoot>
                  </Table>
              </CardContent>
         </Card>
      </div>
    );
  }
