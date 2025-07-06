
import { Button } from "@/components/ui/button";
import { TestTube2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function Step8TestImport() {
  return (
    <div className="text-center flex flex-col items-center">
        <TestTube2 className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Test Import (Dry Run)</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            We'll simulate the import with a small sample of your data (the first 10 rows) to ensure everything is mapped correctly before running the full import.
        </p>

        <div className="w-full max-w-md space-y-4">
            <Button className="w-full">Start Test Import</Button>
            <div className="space-y-2 text-left">
                <p className="text-sm font-medium">Running test...</p>
                <Progress value={66} />
                <p className="text-xs text-muted-foreground">6 of 10 records imported successfully.</p>
            </div>
        </div>
    </div>
  );
}
