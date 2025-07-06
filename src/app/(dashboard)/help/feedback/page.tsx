
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare } from "lucide-react";

export default function FeedbackPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Provide Feedback</h1>
        <p className="text-muted-foreground">
          Submit feature requests and bug reports to help us improve. We value your input!
        </p>
      </div>
      <Card>
        <form>
            <CardHeader>
                <CardTitle>Feedback Form</CardTitle>
                <CardDescription>Let us know what's on your mind.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                 <div className="grid gap-2">
                    <Label>Feedback Type</Label>
                    <RadioGroup defaultValue="feature" className="flex gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="feature" id="r1" />
                            <Label htmlFor="r1">Feature Request</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="bug" id="r2" />
                            <Label htmlFor="r2">Bug Report</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="general" id="r3" />
                            <Label htmlFor="r3">General Feedback</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="e.g., Add support for international currencies" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="details">Details</Label>
                    <Textarea id="details" placeholder="Please provide as much detail as possible, including steps to reproduce if you're reporting a bug." className="min-h-40" />
                </div>
            </CardContent>
            <CardFooter>
                <Button>
                    <MessageSquare className="mr-2"/> Submit Feedback
                </Button>
            </CardFooter>
        </form>
      </Card>
    </div>
  );
}
