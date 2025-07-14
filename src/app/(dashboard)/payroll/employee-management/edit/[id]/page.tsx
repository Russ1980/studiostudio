
import { getEmployeeById } from "@/lib/actions";
import { notFound } from "next/navigation";
import { EditEmployeeForm } from "@/app/(dashboard)/payroll/employee-management/edit/[id]/edit-employee-form";

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const employee = await getEmployeeById(id);
  
  if (!employee) {
    notFound();
  }

  // Ensure all fields are strings or numbers as expected by the form
  const safeEmployee = {
      ...employee,
      id: employee.id || '',
      name: employee.name || '',
      email: employee.email || '',
      department: employee.department || '',
      role: employee.role || '',
      hireDate: employee.hireDate || '',
      status: employee.status || 'Active',
      salary: Number(employee.salary) || 0,
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Employee</h1>
          <p className="text-muted-foreground">
            Update the profile for {employee.name}.
          </p>
        </div>
      </div>
      <EditEmployeeForm employee={safeEmployee} />
    </div>
  );
}
