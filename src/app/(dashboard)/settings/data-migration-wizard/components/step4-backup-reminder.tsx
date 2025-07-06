
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatabaseBackup } from "lucide-react";
import { useMigrationWizard } from "../context/migration-wizard-context";

export function Step4BackupReminder() {
  const { migrationData, updateMigrationData } = useMigrationWizard();

  return (
    <div className="text-center flex flex-col items-center">
        <DatabaseBackup className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Backup Your Data</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            Before proceeding, we strongly recommend you create a full backup of your existing data. While our process is safe, this is a crucial best practice.
        </p>
        <div className="space-y-4 w-full max-w-md">
            <Button variant="outline" className="w-full">Download Backup Instructions</Button>
            <div className="flex items-center space-x-2 p-4 border rounded-lg justify-center">
                <Checkbox 
                    id="backup-confirmed" 
                    checked={migrationData.backupConfirmed}
                    onCheckedChange={(checked) => updateMigrationData({ backupConfirmed: !!checked })}
                />
                <Label htmlFor="backup-confirmed" className="font-semibold">I have created a backup of my data.</Label>
            </div>
        </div>
    </div>
  );
}
