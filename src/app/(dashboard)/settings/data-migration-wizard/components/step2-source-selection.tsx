
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useMigrationWizard } from "../context/migration-wizard-context";
import { cn } from "@/lib/utils";

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM13 16V13H15L12 9L9 13H11V16H13Z" />
    </svg>
);

const sources = [
    { name: "QuickBooks Online", icon: UploadIcon },
    { name: "QuickBooks Desktop", icon: UploadIcon },
    { name: "Xero", icon: UploadIcon },
    { name: "FreshBooks", icon: UploadIcon },
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
        Where is the data you want to migrate coming from? Choose a direct method or connect to a cloud platform.
      </p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Card 
            className={cn("p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                migrationData.sourceSystem === 'FileUpload' ? "border-primary ring-2 ring-primary" : "hover:shadow-md"
            )}
            onClick={() => handleSelectSource('FileUpload')}
        >
            <UploadIcon className="w-10 h-10 text-primary mb-4"/>
            <h3 className="text-lg font-semibold">File Upload</h3>
            <p className="text-sm text-muted-foreground">Migrate data from CSV, XLSX, or XML files.</p>
        </Card>
        <Card 
            className={cn("p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                migrationData.sourceSystem === 'Database' ? "border-primary ring-2 ring-primary" : "hover:shadow-md"
            )}
             onClick={() => handleSelectSource('Database')}
        >
            <UploadIcon className="w-10 h-10 text-primary mb-4"/>
            <h3 className="text-lg font-semibold">Direct Database</h3>
            <p className="text-sm text-muted-foreground">Connect directly to a SQL database.</p>
        </Card>
      </div>

       <div className="w-full max-w-5xl mt-8">
            <h3 className="font-semibold text-center mb-4 text-muted-foreground">Or connect to a cloud accounting platform:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {sources.map(source => (
                    <Card 
                        key={source.name} 
                        className={cn("p-4 flex flex-col items-center justify-center cursor-pointer transition-all",
                           migrationData.sourceSystem === source.name ? "border-primary ring-2 ring-primary" : "hover:shadow-md"
                        )}
                        onClick={() => handleSelectSource(source.name)}
                    >
                        <source.icon className="mb-2 text-primary"/>
                        <p className="font-medium mb-4">{source.name}</p>
                        <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelectSource(source.name);
                            }}
                        >
                            <Zap className="mr-2"/>Connect
                        </Button>
                    </Card>
                ))}
            </div>
        </div>

    </div>
  );
}
