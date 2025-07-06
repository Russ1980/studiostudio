
"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useMigrationWizard } from "../context/migration-wizard-context";
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Step5DataUpload() {
  const { migrationData, updateMigrationData } = useMigrationWizard();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      updateMigrationData({ uploadedFile: null }); // Reset previous file
      setIsUploading(true);
      setProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            updateMigrationData({ uploadedFile: file });
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  }, [updateMigrationData]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
        'text/csv': ['.csv'],
        'application/vnd.ms-excel': ['.xls'],
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        'application/xml': ['.xml', 'text/xml']
    },
    maxFiles: 1,
  });

  const removeFile = () => {
    updateMigrationData({ uploadedFile: null });
    setProgress(0);
  };

  return (
    <div className="text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Data Upload</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
            Please upload your data files. The system supports CSV, XLSX, and XML formats.
        </p>
        <div className="w-full max-w-lg">
            {!migrationData.uploadedFile && !isUploading && (
                <div
                    {...getRootProps()}
                    className={cn(
                        "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors",
                        isDragActive && "border-primary bg-primary/10"
                    )}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">CSV, XLSX, XML (MAX. 100MB)</p>
                    </div>
                </div>
            )}

            {isUploading && (
                 <div className="w-full mt-4 space-y-2 text-left">
                    <p className="text-sm font-medium">Uploading...</p>
                    <Progress value={progress} />
                </div>
            )}

            {migrationData.uploadedFile && !isUploading && (
                <div className="w-full p-4 border rounded-lg flex items-center justify-between bg-muted/50">
                    <div className="flex items-center gap-3">
                        <FileIcon className="w-6 h-6 text-primary" />
                        <span className="font-medium">{migrationData.uploadedFile.name}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={removeFile}>
                        <X className="w-4 h-4"/>
                    </Button>
                </div>
            )}
        </div>
    </div>
  );
}
