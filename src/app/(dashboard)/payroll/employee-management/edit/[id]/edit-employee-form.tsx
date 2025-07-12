
"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateEmployee } from "@/lib/actions";

const EmployeeUpdateSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Employee name is required'),
    email: z.string().email('Invalid email address'),
    department: z.string().min(1, 'Department is required'),
    role: z.string().min(1, 'Role is required'),
    hireDate: z.string().min(1, 'Hire date is required'),
    status: z.enum(['Active', 'On Leave', 'Terminated']),
    salary: z.coerce.number().positive('Salary must be a positive number'),
});

type EmployeeFormValues = z.infer<typeof EmployeeUpdateSchema>;

export function EditEmployeeForm({ employee }: { employee: EmployeeFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(EmployeeUpdateSchema),
    defaultValues: employee,
  });

  const onSubmit = (values: EmployeeFormValues) => {
    startTransition(async () => {
      const result = await updateEmployee(values);
      if (result.success) {
        toast({ title: "Employee Updated", description: `${values.name} has been successfully updated.` });
        router.push("/payroll/employee-management");
        router.refresh(); // Refresh the list page to show updated data
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    });
  };

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Employee Information</CardTitle>
                <CardDescription>Update the personal and employment details for this employee.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="e.g., john.d@company.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="department" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Department</FormLabel><FormControl><Input placeholder="e.g., Engineering" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Role / Title</FormLabel><FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="hireDate" render={({ field }) => (
                    <FormItem className="grid gap-2"><FormLabel>Hire Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="status" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="On Leave">On Leave</SelectItem>
                                <SelectItem value="Terminated">Terminated</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                 )} />
                 <FormField control={form.control} name="salary" render={({ field }) => (
                    <FormItem className="grid gap-2 md:col-span-2"><FormLabel>Annual Salary</FormLabel><FormControl><Input type="number" placeholder="e.g., 80000" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </CardContent>
            <CardFooter className="flex justify-end gap-2 border-t px-6 py-4">
                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>Cancel</Button>
                <Button type="submit" disabled={isPending}>
                    {isPending && <Loader2 className="mr-2 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
        </form>
    </Form>
  );
}
