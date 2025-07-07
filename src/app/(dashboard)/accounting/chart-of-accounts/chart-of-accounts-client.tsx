
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
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ChartOfAccountsClientPage({ initialData }: { initialData: any }) {
  const accountsData = initialData;

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
                    <DropdownMenuItem asChild>
                        <Link href="/accounting/chart-of-accounts/import"><Upload className="mr-2"/>Import from CSV</Link>
                    </DropdownMenuItem>
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
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">YTD Activity</TableHead>
                <TableHead className="w-16 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            {Object.values(accountsData).map((category: any, i: number) => (
                <Collapsible asChild defaultOpen key={i}>
                  <tbody>
                    <TableRow className="bg-muted/50 hover:bg-muted/50 font-bold">
                        <TableCell colSpan={4}>
                            <CollapsibleTrigger className="flex w-full items-center gap-2">
                                {category.name}
                                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                            </CollapsibleTrigger>
                        </TableCell>
                        <TableCell className="text-right">${Number(category.balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <CollapsibleContent asChild>
                      <React.Fragment>
                        {category.accounts.map((account: any, j: number) => (
                           <React.Fragment key={j}>
                             <AccountRow account={account} isSubAccount={false} />
                             {account.subAccounts?.map((sub: any, k: number) => (
                               <AccountRow key={k} account={sub} isSubAccount={true} />
                             ))}
                           </React.Fragment>
                        ))}
                      </React.Fragment>
                    </CollapsibleContent>
                  </tbody>
                </Collapsible>
              ))}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

const AccountRow = ({ account, isSubAccount }: { account: any, isSubAccount: boolean }) => (
  <TableRow className={cn(!account.detailType && "font-semibold")}>
    <TableCell className={cn(isSubAccount && "pl-12")}>
      <div>{account.name}</div>
      <div className="text-xs text-muted-foreground">{account.code}</div>
    </TableCell>
    <TableCell>{account.type}</TableCell>
    <TableCell>{account.detailType}</TableCell>
    <TableCell><Badge variant={account.status === "Active" ? "success" : "secondary"}>{account.status}</Badge></TableCell>
    <TableCell className="text-right">${Number(account.balance).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
    <TableCell className="text-right">{account.ytd ? `$${Number(account.ytd).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ''}</TableCell>
    <TableCell className="text-right">
      {account.detailType && (
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
      )}
    </TableCell>
  </TableRow>
);
