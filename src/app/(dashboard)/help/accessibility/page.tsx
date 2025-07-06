
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PersonStanding } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Accessibility</h1>
        <p className="text-muted-foreground">
          Learn about accessibility features and resources.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <PersonStanding className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            This feature is coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
