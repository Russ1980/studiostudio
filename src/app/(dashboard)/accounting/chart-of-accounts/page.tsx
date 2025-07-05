
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal, ChevronDown, Download, Upload } from "lucide-react";

const accountsData = {
  assets: [
    { name: "Main Checking Account", code: "1001", type: "Bank", detailType: "Checking", status: "Active", balance: "1,250,320.50", ytd: "5,400,000.00" },
    { name: "Accounts Receivable", code: "1200", type: "Accounts Receivable", detailType: "Accounts Receivable (A/R)", status: "Active", balance: "245,800.00", ytd: "1,200,500.00" },
  ],
  liabilities: [
    { name: "Accounts Payable", code: "2000", type: "Accounts Payable", detailType: "Accounts Payable (A/P)", status: "Active", balance: "88,450.00", ytd: "750,000.00" },
    { name: "Business Credit Card", code: "2100", type: "Credit Card", detailType: "Credit Card", status: "Active", balance: "12,500.00", ytd: "150,000.00" },
  ],
};

export default function ChartOfAccountsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Chart of Accounts</h1>
        <p className="text-muted-foreground">
          View, manage, and organize all your financial accounts.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Input placeholder="Filter by account name/number..." className="max-w-sm" />
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button><PlusCircle />Add New Account</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Asset</DropdownMenuItem>
                  <DropdownMenuItem>Liability</DropdownMenuItem>
                  <DropdownMenuItem>Equity</DropdownMenuItem>
                  <DropdownMenuItem>Income</DropdownMenuItem>
                  <DropdownMenuItem>Expense</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline"><Download className="mr-2"/>Import/Export</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><Upload className="mr-2"/>Import from CSV</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Download className="mr-2"/>Export as CSV</DropdownMenuItem>
                    <DropdownMenuItem><Download className="mr-2"/>Export as PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Detail Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>YTD Activity</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Assets */}
              <Collapsible asChild defaultOpen>
                <>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableCell colSpan={7}>
                    <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold">
                      Assets
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                  </TableCell>
                </TableRow>
                <CollapsibleContent asChild>
                  <>
                    {accountsData.assets.map((account, i) => (
                      <AccountRow key={`asset-${i}`} account={account} />
                    ))}
                  </>
                </CollapsibleContent>
                </>
              </Collapsible>
              {/* Liabilities */}
              <Collapsible asChild defaultOpen>
                 <>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableCell colSpan={7}>
                     <CollapsibleTrigger className="flex w-full items-center justify-between font-semibold">
                      Liabilities
                      <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </CollapsibleTrigger>
                  </TableCell>
                </TableRow>
                 <CollapsibleContent asChild>
                    <>
                    {accountsData.liabilities.map((account, i) => (
                        <AccountRow key={`liability-${i}`} account={account} />
                    ))}
                    </>
                </CollapsibleContent>
                </>
              </Collapsible>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const AccountRow = ({ account }: { account: any }) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{account.name}</div>
      <div className="text-xs text-muted-foreground">{account.code}</div>
    </TableCell>
    <TableCell>{account.type}</TableCell>
    <TableCell>{account.detailType}</TableCell>
    <TableCell><Badge variant={account.status === "Active" ? "success" : "secondary"}>{account.status}</Badge></TableCell>
    <TableCell>${account.balance}</TableCell>
    <TableCell>${account.ytd}</TableCell>
    <TableCell className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View/Edit Details</DropdownMenuItem>
          <DropdownMenuItem>View Register</DropdownMenuItem>
          <DropdownMenuItem>Run Report</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">Make Inactive</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);
