
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export function Step7DataMapping() {
  return (
    <div className="text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Field Mapping</h2>
      <p className="text-muted-foreground max-w-2xl mb-8">
        Match the columns from your file to the corresponding fields in Mardisen Suite. We've made some suggestions.
      </p>
      
      <Table className="max-w-2xl">
        <TableHeader>
          <TableRow>
            <TableHead>Your Field (from CSV)</TableHead>
            <TableHead className="w-8"></TableHead>
            <TableHead>Mardisen Field</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><Input defaultValue="Transaction Date" /></TableCell>
            <TableCell><ArrowRight className="text-muted-foreground" /></TableCell>
            <TableCell><Input defaultValue="date" readOnly className="bg-muted"/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Input defaultValue="Description" /></TableCell>
            <TableCell><ArrowRight className="text-muted-foreground" /></TableCell>
            <TableCell><Input defaultValue="description" readOnly className="bg-muted"/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Input defaultValue="Amount_USD" /></TableCell>
            <TableCell><ArrowRight className="text-muted-foreground" /></TableCell>
            <TableCell><Input defaultValue="amount" readOnly className="bg-muted"/></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
