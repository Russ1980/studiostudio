
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
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
import { PlusCircle, MoreHorizontal, ChevronDown, Download, Upload, Loader2 } from "lucide-react";
import React, { useState, useTransition } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addChartOfAccount } from "@/lib/actions";
import { useRouter } from "next/navigation";

const AccountSchema = z.object({
    name: z.string().min(2, { message: "Account name must be at least 2 characters." }),
    code: z.string().optional(),
    type: z.enum(["Asset", "Liability", "Equity", "Income", "Expense"]),
    detailType: z.string().min(2, { message: "Detail type is required." }),
    balance: z.coerce.number().optional().default(0),
});

function AddAccountDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof AccountSchema>>({
        resolver: zodResolver(AccountSchema),
        defaultValues: {
            name: "",
            code: "",
            type: "Expense",
            detailType: "",
            balance: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof AccountSchema>) => {
        startTransition(async () => {
            const result = await addChartOfAccount(values);
            if (result.success) {
                toast({ title: "Account Created", description: `Account "${values.name}" has been successfully created.` });
                onOpenChange(false);
                form.reset();
                router.refresh(); 
            } else {
                toast({ title: "Error", description: result.error, variant: "destructive" });
            }
        });
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Account</DialogTitle>
                    <DialogDescription>
                        Create a new account for your chart of accounts. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormLabel>Account Name</FormLabel><FormControl><Input placeholder="e.g., Office Supplies" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="code" render={({ field }) => (
                            <FormItem><FormLabel>Account Code/Number (Optional)</FormLabel><FormControl><Input placeholder="e.g., 60100" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select an account type" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Asset">Asset</SelectItem>
                                        <SelectItem value="Liability">Liability</SelectItem>
                                        <SelectItem value="Equity">Equity</SelectItem>
                                        <SelectItem value="Income">Income</SelectItem>
                                        <SelectItem value="Expense">Expense</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                         <FormField control={form.control} name="detailType" render={({ field }) => (
                            <FormItem><FormLabel>Detail Type</FormLabel><FormControl><Input placeholder="e.g., Office/General Administrative Expenses" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <FormField control={form.control} name="balance" render={({ field }) => (
                            <FormItem><FormLabel>Opening Balance</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                         <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>Cancel</Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 animate-spin" />}
                                Save Account
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export function ChartOfAccountsClientPage({ initialData }: { initialData: any }) {
  const accountsData = initialData;
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <AddAccountDialog open={isAddAccountOpen} onOpenChange={setIsAddAccountOpen} />
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
              <Button onClick={() => setIsAddAccountOpen(true)}><PlusCircle />Add New Account</Button>
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
