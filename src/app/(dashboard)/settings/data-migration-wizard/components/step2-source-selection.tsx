
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileUp, Zap } from "lucide-react";
import Image from "next/image";
import { useMigrationWizard } from "../context/migration-wizard-context";
import { cn } from "@/lib/utils";

const sources = [
    { name: "QuickBooks Online", logo: "https://placehold.co/40x40.png", hint: "quickbooks logo" },
    { name: "Xero", logo: "https://placehold.co/40x40.png", hint: "xero logo" },
    { name: "FreshBooks", logo: "https://placehold.co/40x40.png", hint: "freshbooks logo" },
];

export function Step2SourceSelection() {
  const { migrationData, updateMigrationData } = useMigrationWizard();

  const handleSelectSource = (sourceName: string) => {
    updateMigrationData({ sourceSystem: sourceName });
  };

  return (
    <div className="text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">Select Your Data Source</h2>
      <p className="text-muted-foreground max-w-2xl mb-8">
        Where is the data you want to migrate coming from?
      </p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Card 
            className={cn("p-4 flex flex-col items-center justify-center text-center cursor-pointer",
                migrationData.sourceSystem === 'FileUpload' && "border-primary ring-2 ring-primary"
            )}
            onClick={() => handleSelectSource('FileUpload')}
        >
            <FileUp className="w-10 h-10 text-primary mb-4"/>
            <h3 className="text-lg font-semibold">File Upload</h3>
            <p className="text-sm text-muted-foreground mb-4">Migrate data from CSV or Excel files.</p>
        </Card>
        <Card 
            className={cn("p-4 flex flex-col items-center justify-center text-center cursor-pointer",
                migrationData.sourceSystem === 'Database' && "border-primary ring-2 ring-primary"
            )}
             onClick={() => handleSelectSource('Database')}
        >
            <Database className="w-10 h-10 text-primary mb-4"/>
            <h3 className="text-lg font-semibold">Direct Database</h3>
            <p className="text-sm text-muted-foreground mb-4">Connect directly to a SQL database.</p>
        </Card>
      </div>

       <div className="w-full max-w-3xl mt-6">
            <h3 className="font-semibold text-center mb-4">Or connect to a cloud accounting platform:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {sources.map(source => (
                    <Card 
                        key={source.name} 
                        className={cn("p-4 flex flex-col items-center justify-center cursor-pointer",
                           migrationData.sourceSystem === source.name && "border-primary ring-2 ring-primary"
                        )}
                        onClick={() => handleSelectSource(source.name)}
                    >
                        <Image src={source.logo} alt={source.name} width={40} height={40} data-ai-hint={source.hint} className="mb-2"/>
                        <p className="font-medium mb-4">{source.name}</p>
                        <Button className="w-full" variant="outline"><Zap className="mr-2"/>Connect</Button>
                    </Card>
                ))}
            </div>
        </div>

    </div>
  );
}
