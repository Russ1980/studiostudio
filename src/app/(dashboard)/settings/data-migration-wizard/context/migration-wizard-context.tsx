
"use client";

import React, { createContext, useState, useContext, useMemo } from 'react';

type MigrationData = {
  sourceSystem: string | null;
  backupConfirmed: boolean;
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
  });

  const updateMigrationData = (updates: Partial<MigrationData>) => {
    setMigrationData(prev => ({ ...prev, ...updates }));
  };

  const value = useMemo(() => ({
    currentStep,
    setCurrentStep,
    migrationData,
    updateMigrationData,
  }), [currentStep, migrationData]);

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
