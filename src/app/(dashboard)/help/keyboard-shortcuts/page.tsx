
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Keyboard } from "lucide-react";

export default function KeyboardShortcutsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Keyboard Shortcuts</h1>
        <p className="text-muted-foreground">
          A reference for all available keyboard shortcuts to improve your workflow.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center min-h-[400px]">
        <CardHeader className="items-center">
            <div className="bg-secondary p-4 rounded-full mb-4">
                <Keyboard className="h-12 w-12 text-secondary-foreground" />
            </div>
            <CardTitle>Keyboard Shortcuts</CardTitle>
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
