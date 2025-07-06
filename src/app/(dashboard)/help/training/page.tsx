

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Video, BookCheck } from "lucide-react";

const trainingModules = [
  { 
    title: "Onboarding for New Users", 
    type: "Webinar",
    description: "A comprehensive walkthrough of the application's core features. Perfect for new team members.", 
    icon: Video,
    duration: "45 Mins"
  },
  { 
    title: "Mastering Financial Reports", 
    type: "Webinar",
    description: "Deep dive into generating, customizing, and interpreting key financial statements.", 
    icon: Video,
    duration: "60 Mins"
  },
  { 
    title: "Certified Professional Exam", 
    type: "Certification",
    description: "Become a certified Mardisen Suite professional by passing our comprehensive exam.", 
    icon: BookCheck,
    duration: "90 Mins"
  },
];

export default function TrainingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Training & Certification</h1>
        <p className="text-muted-foreground">
          Access on-demand webinars and professional certification programs to master the application.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainingModules.map((module) => (
          <Card key={module.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-secondary p-3 rounded-lg">
                    <module.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>{module.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>{module.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{module.duration}</span>
                <Button>
                    {module.type === "Webinar" ? "Watch Now" : "Start Exam"}
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
