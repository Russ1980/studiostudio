
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
} from "@/components/ui/card";
import { Wrench } from "lucide-react";

const faqItems = [
    {
        question: "Why are my bank transactions not appearing?",
        answer: "There can be a few reasons. First, check your bank connection status in the Banking > Bank Connections page. If it shows an error, try refreshing the connection. If the connection is active, please note that it can sometimes take up to 24 hours for new transactions to sync from your bank."
    },
    {
        question: "I can't close the accounting period. The button is disabled.",
        answer: "The 'Close Period' button will remain disabled until all items on the period-end checklist are marked as complete. Please review the checklist on the 'Close Accounting Period' page to ensure all tasks, such as bank reconciliations and A/R reviews, have been finished."
    },
    {
        question: "How do I fix an 'Unbalanced Journal Entry' error?",
        answer: "This error means the total debits do not equal the total credits for a specific journal entry. Navigate to Accounting > Journal Entries, find the entry mentioned in the error, and edit it. Adjust the debit or credit amounts for the line items until the totals at the bottom of the form match."
    },
     {
        question: "My report is showing incorrect data. What should I do?",
        answer: "First, double-check the date range and any filters applied to the report to ensure they are correct. If the data still seems wrong, it may be due to uncategorized transactions. Go to Banking > Review Transactions to see if there are any transactions that need to be categorized."
    },
];

export default function TroubleshootingPage() {
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
