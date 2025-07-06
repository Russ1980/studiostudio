
"use client";

import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

type ValidationResult = {
  valid: number;
  warnings: number;
  errors: number;
};

type MigrationData = {
  sourceSystem: string | null;
  backupConfirmed: boolean;
  uploadedFile: File | null;
  validationResults: ValidationResult | null;
  // Add other state properties here as needed
};

type MigrationWizardContextType = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  migrationData: MigrationData;
  updateMigrationData: (updates: Partial<MigrationData>) => void;
};

const MigrationWizardContext = createContext<MigrationWizardContextType | null>(null);

export function MigrationWizardProvider({ children }: { children: React.ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [migrationData, setMigrationData] = useState<MigrationData>({
    sourceSystem: null,
    backupConfirmed: false,
    uploadedFile: null,
    validationResults: null,
  });

  const updateMigrationData = useCallback((updates: Partial<MigrationData>) => {
    setMigrationData(prev => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo(() => ({
    currentStep,
    setCurrentStep,
    migrationData,
    updateMigrationData,
  }), [currentStep, migrationData, updateMigrationData]);

  return (
    <MigrationWizardContext.Provider value={value}>
      {children}
    </MigrationWizardContext.Provider>
  );
}

export function useMigrationWizard() {
  const context = useContext(MigrationWizardContext);
  if (!context) {
    throw new Error('useMigrationWizard must be used within a MigrationWizardProvider');
  }
  return context;
}
