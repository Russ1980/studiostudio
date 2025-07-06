
import { Rocket } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export function Step9FinalImport() {
  return (
    <div className="text-center flex flex-col items-center">
        <Rocket className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Final Import</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            Everything looks good! We are now ready to perform the full data migration. This may take several minutes depending on the size of your dataset.
        </p>
        <div className="w-full max-w-md space-y-4">
            <Button size="lg" className="w-full">Begin Final Import</Button>
             <div className="space-y-2 text-left">
                <p className="text-sm font-medium">Importing data...</p>
                <Progress value={45} />
                <p className="text-xs text-muted-foreground">4,725 of 10,450 records imported.</p>
            </div>
        </div>
    </div>
  );
}
