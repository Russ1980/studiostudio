
"use client";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Rocket } from "lucide-react";

export const FloatingHelpButton = () => {
    const { startOnboarding, isFinished } = useOnboarding();

    if (!isFinished) {
        return null;
    }

    const handleRestartTour = () => {
        // We'll restart with the default role for now.
        // A more complex implementation could store the user's role.
        startOnboarding('business_owner');
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-lg"
                onClick={handleRestartTour}
            >
                <Rocket className="h-6 w-6" />
                <span className="sr-only">Start Product Tour</span>
            </Button>
        </div>
    );
};
