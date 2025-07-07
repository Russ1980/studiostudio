
import { getClients } from "@/lib/actions";
import { NewTaskForm } from "./new-task-form";

export default async function AddNewTaskPage() {
  const clients = await getClients();

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Task</h1>
          <p className="text-muted-foreground">
            Fill out the form below to add a new task.
          </p>
        </div>
      </div>
      <NewTaskForm clients={clients} />
    </div>
  );
}
