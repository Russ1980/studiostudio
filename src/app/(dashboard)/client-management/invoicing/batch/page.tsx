
"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Users, FileText } from "lucide-react";
import { getClients } from '@/lib/actions';
import { cn } from '@/lib/utils';

const STEPS = [
    { id: 1, name: "Select Clients", icon: Users },
    { id: 2, name: "Review Invoices", icon: FileText },
    { id: 3, name: "Send Invoices", icon: Mail },
];

export default function BatchInvoicingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [clients, setClients] = useState<any[]>([]);
    const [selectedClients, setSelectedClients] = useState<Set<string>>(new Set());

    useState(() => {
        const fetchClients = async () => {
            const clientData = await getClients();
            setClients(clientData.filter(c => c.status === 'Active')); // Only active clients
        };
        fetchClients();
    });

    const handleSelectClient = (id: string, checked: boolean) => {
        setSelectedClients(prev => {
            const newSet = new Set(prev);
            if (checked) {
                newSet.add(id);
            } else {
                newSet.delete(id);
            }
            return newSet;
        });
    };
    
    const handleSelectAll = (checked: boolean) => {
        if(checked) {
            setSelectedClients(new Set(clients.map(c => c.id)));
        } else {
            setSelectedClients(new Set());
        }
    };


  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Batch Invoicing</h1>
        <p className="text-muted-foreground">
          Create and send recurring or one-off invoices to multiple clients at once.
        </p>
      </div>
      <Card>
        <CardHeader>
            <ol className="flex items-center w-full">
                {STEPS.map((step, index) => (
                    <li key={step.id} className={cn("flex w-full items-center", { "after:content-[''] after:w-full after:h-1 after:border-b after:border-border after:border-4 after:inline-block": index < STEPS.length - 1 })}>
                        <div className="flex flex-col items-center">
                           <span className={cn("flex items-center justify-center w-10 h-10 rounded-full shrink-0", currentStep > step.id ? 'bg-primary text-primary-foreground' : currentStep === step.id ? 'bg-primary/20 border-2 border-primary text-primary' : 'bg-secondary text-secondary-foreground')}>
                               <step.icon className="h-5 w-5" />
                           </span>
                           <span className="text-sm mt-2">{step.name}</span>
                        </div>
                    </li>
                ))}
            </ol>
        </CardHeader>
        <CardContent className="min-h-[400px]">
            {currentStep === 1 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Step 1: Select Clients to Invoice</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead><Checkbox onCheckedChange={(checked) => handleSelectAll(!!checked)} /></TableHead>
                                <TableHead>Business Name</TableHead>
                                <TableHead>Subscription Tier</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map(client => (
                                <TableRow key={client.id} data-state={selectedClients.has(client.id) ? "selected" : ""}>
                                    <TableCell><Checkbox checked={selectedClients.has(client.id)} onCheckedChange={(checked) => handleSelectClient(client.id, !!checked)} /></TableCell>
                                    <TableCell>{client.businessName}</TableCell>
                                    <TableCell>{client.tier}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {currentStep === 2 && (
                <div>
                     <h3 className="text-lg font-semibold mb-4">Step 2: Review Draft Invoices for {selectedClients.size} Clients</h3>
                     <p className="text-sm text-muted-foreground">Invoice line items will be auto-populated based on each client's subscription tier. You can make manual adjustments here.</p>
                     <div className="text-center text-muted-foreground border-dashed border-2 rounded-lg p-16 mt-8">
                        <p>Invoice Preview Coming Soon</p>
                     </div>
                </div>
            )}
            {currentStep === 3 && (
                 <div>
                     <h3 className="text-lg font-semibold mb-4">Step 3: Confirm and Send</h3>
                     <p className="text-sm text-muted-foreground mb-4">You are about to send {selectedClients.size} invoices. This action cannot be undone.</p>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">I confirm that the invoices are correct and ready to be sent to clients.</Label>
                    </div>
                </div>
            )}
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-6">
            {currentStep < 3 && (
                 <Button onClick={() => setCurrentStep(currentStep + 1)} disabled={selectedClients.size === 0}>
                    Next <ArrowRight className="ml-2"/>
                </Button>
            )}
             {currentStep === 3 && (
                 <Button>
                    <Mail className="mr-2"/> Send Invoices
                </Button>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
