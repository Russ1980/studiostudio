
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function GettingStartedPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Getting Started</h1>
        <p className="text-muted-foreground">
          Guides to help you set up your account and learn the basics.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <Rocket className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Getting Started</CardTitle>
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
