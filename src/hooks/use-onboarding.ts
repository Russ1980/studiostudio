"use client";

import { OnboardingContext } from "@/components/onboarding/onboarding-controller";
import { useContext } from "react";

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error("useOnboarding must be used within an OnboardingProvider");
    }
    return context;
};
