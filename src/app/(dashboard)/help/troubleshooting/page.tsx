
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { getTroubleshootingFAQs } from "@/lib/actions";
import { Wrench } from "lucide-react";

export default async function TroubleshootingPage() {
  const faqItems = await getTroubleshootingFAQs();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Troubleshooting</h1>
        <p className="text-muted-foreground">
          Find solutions for common issues and answers to frequently asked questions.
        </p>
      </div>

       <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-secondary p-3 rounded-lg w-fit">
                        <Wrench className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
                </div>
                 <CardDescription>Browse through common questions to find a quick solution.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent className="prose prose-sm max-w-none text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
       </Card>
    </div>
  );
}
