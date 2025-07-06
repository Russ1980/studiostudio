"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOnboarding } from "@/hooks/use-onboarding";
import { Rocket } from "lucide-react";

export default function OnboardingSettingsPage() {
  const { startOnboarding } = useOnboarding();

  const handleRestartTour = () => {
    // For simplicity, we'll restart the default tour for the business owner.
    startOnboarding('business_owner');
  };

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Onboarding Settings</h1>
        <p className="text-muted-foreground">
          Manage your guided tour and onboarding experience.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Restart Guided Tour</CardTitle>
          <CardDescription>
            Want to see the product tour again? You can restart it here at any
            time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleRestartTour}>
            <Rocket className="mr-2" />
            Restart Tour
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
