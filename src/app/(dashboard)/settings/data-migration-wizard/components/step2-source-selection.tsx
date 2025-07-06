
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileUp, Zap } from "lucide-react";
import { useMigrationWizard } from "../context/migration-wizard-context";
import { cn } from "@/lib/utils";

const QuickBooksIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="8" fill="#2CA01C"/>
      <path d="M20.5714 28C18.5714 28 17.0014 27.42 15.8614 26.26C14.7214 25.1 14.1514 23.58 14.1514 21.7C14.1514 19.82 14.7214 18.3 15.8614 17.14C17.0014 15.98 18.5714 15.4 20.5714 15.4C21.9714 15.4 23.1814 15.77 24.2014 16.51L22.8714 18.4C22.2814 17.95 21.5414 17.72 20.6514 17.72C19.3914 17.72 18.3814 18.15 17.6214 19.01C16.8614 19.87 16.4814 20.9 16.4814 22.1C16.4814 23.3 16.8614 24.33 17.6214 25.19C18.3814 26.05 19.3914 26.48 20.6514 26.48C21.5514 26.48 22.2914 26.25 22.8714 25.79L24.2014 27.68C23.1814 28.42 21.9714 28.79 20.5714 28.79Z" fill="white"/>
      <path d="M25 28.5L22.65 25.04L26.15 15H28.15L23.65 26.04L25 28.5Z" fill="white"/>
    </svg>
);
  
const XeroIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="40" height="40" rx="8" fill="#14B5FF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M15.923 26.5L20.453 21.14L15.393 15.5H18.903L22.213 19.4L25.523 15.5H29.033L23.973 21.14L29.033 26.5H25.523L22.213 22.6L18.903 26.5H15.923Z" fill="white"/>
    </svg>
);
  
const FreshBooksIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="40" height="40" rx="8" fill="#007F6B"/>
        <path d="M20 10C14.4772 10 10 14.4772 10 20C10 23.3333 11.6667 26.6667 15 28.3333C15.3333 24.1667 17.5 21.6667 20 21.6667C22.5 21.6667 24.6667 24.1667 25 28.3333C28.3333 26.6667 30 23.3333 30 20C30 14.4772 25.5228 10 20 10Z" fill="white"/>
    </svg>
);

const sources = [
    { name: "QuickBooks Online", icon: QuickBooksIcon },
    { name: "QuickBooks Desktop", icon: QuickBooksIcon },
    { name: "Xero", icon: XeroIcon },
    { name: "FreshBooks", icon: FreshBooksIcon },
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
            <FileUp className="w-10 h-10 text-primary mb-4"/>
            <h3 className="text-lg font-semibold">File Upload</h3>
            <p className="text-sm text-muted-foreground">Migrate data from CSV, XLSX, or XML files.</p>
        </Card>
        <Card 
            className={cn("p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all",
                migrationData.sourceSystem === 'Database' ? "border-primary ring-2 ring-primary" : "hover:shadow-md"
            )}
             onClick={() => handleSelectSource('Database')}
        >
            <Database className="w-10 h-10 text-primary mb-4"/>
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
                        <source.icon className="mb-2"/>
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
