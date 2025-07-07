import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Zap, BarChart, FileStack, Mail, MapPin } from "lucide-react";

const benefits = [
    {
        icon: Users,
        title: "Centralized Client Management",
        description: "Oversee all your clients from a single, intuitive dashboard. Switch between client accounts seamlessly."
    },
    {
        icon: Zap,
        title: "AI-Powered Automation",
        description: "Let Serva Assistant handle tedious tasks like bank reconciliation, transaction categorization, and report generation."
    },
    {
        icon: BarChart,
        title: "Advanced Reporting",
        description: "Generate deep financial insights and custom reports to provide high-value advisory services to your clients."
    },
    {
        icon: FileStack,
        title: "Secure Document Handling",
        description: "A secure portal for requesting, sharing, and storing sensitive client documents."
    }
]

export default function ForAccountantsPage() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">The Partner Program for Modern Firms</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Elevate your accounting practice with Mardisen Suite. Our Partner Program is designed to help you work more efficiently, scale your services, and provide unparalleled value to your clients.
        </p>
         <Button size="lg" className="mt-6">Become a Partner</Button>
      </div>

       <div className="grid md:grid-cols-2 gap-8 mt-16">
        {benefits.map((benefit) => (
            <div key={benefit.title} className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <benefit.icon className="h-6 w-6 text-primary"/>
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                </div>
            </div>
        ))}
      </div>

      <Card className="max-w-4xl mx-auto mt-24 text-center">
        <CardHeader>
            <CardTitle className="text-2xl">Interested in Joining?</CardTitle>
            <CardDescription>Contact our partnership team to learn more about the benefits, revenue sharing, and dedicated support for our accounting partners.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href="mailto:hello@mardisen.com" className="font-medium hover:underline">hello@mardisen.com</a>
            </div>
             <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">888 Prospect Street, San Diego, CA 92037</span>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
