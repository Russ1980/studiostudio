
import { getEmployees } from "@/lib/actions";
import { EmployeeTable } from "./employee-table";

export default async function EmployeeManagementPage() {
  const employees = await getEmployees();

  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground">
            A central directory for managing all employee profiles, compensation, and personal information.
          </p>
        </div>
      <EmployeeTable employees={employees} />
    </div>
  );
}
