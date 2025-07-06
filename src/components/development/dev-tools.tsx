"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { Button } from "@/components/ui/button";

export const DevTools = () => {
    const { startOnboarding } = useOnboarding();

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    const handleReset = () => {
        localStorage.removeItem('onboarding-completed');
        startOnboarding('business_owner');
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button onClick={handleReset} variant="destructive" size="sm">
                Reset Onboarding
            </Button>
        </div>
    );
};
