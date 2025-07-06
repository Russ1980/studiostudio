
import { UploadCloud } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function Step5DataUpload() {
  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Data Upload</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            Please upload your data files. This screen is a placeholder for the actual file upload and progress tracking.
        </p>
        <div className="w-full max-w-lg">
            <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">CSV, XLSX, XML (MAX. 100MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
            <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Uploading `transactions.csv`...</p>
                <Progress value={33} />
            </div>
        </div>
    </div>
  );
}
