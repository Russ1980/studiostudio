
import { CheckCircle, AlertTriangle } from "lucide-react";

export function Step3PreAssessment() {
  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Pre-Assessment</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            We're analyzing your data source. This is a placeholder for the results.
        </p>

        <ul className="space-y-3 text-left w-full max-w-md">
            <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success"/>
                <span>Data Source Connected</span>
            </li>
             <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success"/>
                <span>Estimated Volume: ~10,500 records</span>
            </li>
             <li className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive"/>
                <span>Potential Issue: Unrecognized date format found.</span>
            </li>
             <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success"/>
                <span>Compatibility Check: Passed</span>
            </li>
        </ul>
    </div>
  );
}
