"use client";

import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { OnboardingStep, businessOwnerSteps, accountantSteps, bookkeeperSteps } from '@/lib/onboarding-steps';
import { OnboardingTip } from './onboarding-tip';

type OnboardingContextType = {
    steps: OnboardingStep[];
    currentStep: number;
    isFinished: boolean;
    isFirstStep: boolean;
    isLastStep: boolean;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (index: number) => void;
    startOnboarding: (role?: string) => void;
    finishOnboarding: () => void;
};

export const OnboardingContext = createContext<OnboardingContextType | null>(null);

type OnboardingProviderProps = {
    children: React.ReactNode;
};

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
    const [steps, setSteps] = useState<OnboardingStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinished, setIsFinished] = useState(true);

    useEffect(() => {
        const completed = localStorage.getItem('onboarding-completed');
        setIsFinished(completed === 'true');
    }, []);

    const setRoleBasedSteps = useCallback((role: string) => {
        switch (role) {
            case 'accountant':
                setSteps(accountantSteps);
                break;
            case 'bookkeeper':
                setSteps(bookkeeperSteps);
                break;
            default:
                setSteps(businessOwnerSteps);
        }
    }, []);
    
    const startOnboarding = useCallback((role: string = 'business_owner') => {
        setRoleBasedSteps(role);
        setCurrentStep(0);
        setIsFinished(false);
    }, [setRoleBasedSteps]);

    const finishOnboarding = useCallback(() => {
        setIsFinished(true);
    }, []);

    const nextStep = useCallback(() => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            finishOnboarding();
        }
    }, [currentStep, steps.length, finishOnboarding]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    }, [currentStep]);

    const goToStep = useCallback((index: number) => {
        if (index >= 0 && index < steps.length) {
            setCurrentStep(index);
        }
    }, [steps.length]);

    const value = useMemo(() => ({
        steps,
        currentStep,
        isFinished,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,
        nextStep,
        prevStep,
        goToStep,
        startOnboarding,
        finishOnboarding,
    }), [steps, currentStep, isFinished, nextStep, prevStep, goToStep, startOnboarding, finishOnboarding]);

    return (
        <OnboardingContext.Provider value={value}>
            {children}
            {!isFinished && <OnboardingTip />}
        </OnboardingContext.Provider>
    );
};

export const OnboardingController = ({ userRole }: { userRole: string }) => {
    const { startOnboarding } = useOnboarding();

    useEffect(() => {
        const completed = localStorage.getItem('onboarding-completed');
        if (completed !== 'true') {
            const timer = setTimeout(() => {
                startOnboarding(userRole);
            }, 1000); // Delay to ensure target elements are mounted
            return () => clearTimeout(timer);
        }
    }, [startOnboarding, userRole]);

    return null; // This component only triggers the onboarding
};
