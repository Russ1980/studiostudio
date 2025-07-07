

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, FileUp, Upload, Search } from "lucide-react";
import { getTaxFilings } from "@/lib/actions";

const statusVariant: { [key: string]: "success" | "destructive" | "default" } = {
  Accepted: "success",
  Rejected: "destructive",
  Pending: "default",
};

export default async function TaxFilingsPage() {
  const filings = await getTaxFilings();

  return (
    <div className="grid gap-6">
       <div>
        <h1 className="text-3xl font-bold">Tax Filings</h1>
        <p className="text-muted-foreground">
            A central repository to track the status and history of all submitted tax forms.
        </p>
      </div>

       <Card>
        <CardHeader>
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search filings..." className="pl-9" />
                    </div>
                     <Select>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                      <Select>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="federal">Federal</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            <SelectItem value="ny">New York</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline"><Upload className="mr-2" /> Import Filings</Button>
                    <Button><FileUp className="mr-2" /> File New Return</Button>
                 </div>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Form Name</TableHead>
                        <TableHead>Jurisdiction</TableHead>
                        <TableHead>Tax Period</TableHead>
                        <TableHead>Filing Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-16 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {filings.map((filing, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{filing.form}</TableCell>
                        <TableCell>{filing.jurisdiction}</TableCell>
                        <TableCell>{filing.period}</TableCell>
                        <TableCell>{filing.date}</TableCell>
                        <TableCell><Badge variant={statusVariant[filing.status as keyof typeof statusVariant]}>{filing.status}</Badge></TableCell>
                        <TableCell className="text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Filing Details</DropdownMenuItem>
                                    <DropdownMenuItem>Download Confirmation</DropdownMenuItem>
                                    <DropdownMenuItem>Amend Return</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
