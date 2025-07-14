
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateClient } from "@/lib/actions";

const ClientSchema = z.object({
    id: z.string(),
    businessName: z.string().min(1, 'Business name is required'),
    businessType: z.string().min(1, 'Business type is required'),
    ein: z.string().optional(),
    industry: z.string().optional(),
    contactName: z.string().min(1, 'Contact name is required'),
    contactEmail: z.string().email('Invalid email address'),
    contactPhone: z.string().optional(),
    streetAddress: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    status: z.enum(["Active", "Onboarding", "Inactive"]),
});

export function EditClientForm({ client }: { client: z.infer<typeof ClientSchema> }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ClientSchema>>({
    resolver: zodResolver(ClientSchema),
    defaultValues: client,
  });

  const onSubmit = (values: z.infer<typeof ClientSchema>) => {
    startTransition(async () => {
      const result = await updateClient(values);
      if (result.success) {
        toast({ title: "Client Updated", description: `${values.businessName} has been successfully updated.` });
        router.push("/accountant-portal/client-list");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <Card>
            <CardHeader><CardTitle>Business Information</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="businessName" render={({ field }) => (<FormItem><FormLabel>Business Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="businessType" render={({ field }) => (<FormItem><FormLabel>Business Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="llc">LLC</SelectItem><SelectItem value="s-corp">S-Corp</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><CardTitle>Primary Contact</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                 <FormField control={form.control} name="contactName" render={({ field }) => (<FormItem><FormLabel>Contact Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contactEmail" render={({ field }) => (<FormItem><FormLabel>Contact Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
            </CardContent>
             <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
                <Button type="submit" disabled={isPending}>{isPending && <Loader2 className="mr-2 animate-spin" />}Save Client</Button>
            </CardFooter>
        </Card>
        </form>
    </Form>
  );
}
