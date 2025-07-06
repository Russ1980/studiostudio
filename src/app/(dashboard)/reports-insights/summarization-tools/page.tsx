
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummarizeForm } from "@/app/(dashboard)/insights/summarize-form";
import { summarizeFinancialReports } from "@/ai/flows/summarize-financial-reports";
import { summarizeMarketNews } from "@/ai/flows/summarize-market-news";
import { Wand2 } from "lucide-react";

export default function SummarizationToolsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
         <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Wand2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">AI Summarization Tools</h1>
          <p className="text-muted-foreground">
            Leverage AI to distill key insights from dense financial documents and articles.
          </p>
        </div>
      </div>

      <Tabs defaultValue="financial-report" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="financial-report">
            Summarize Financial Report
          </TabsTrigger>
          <TabsTrigger value="market-news">
            Summarize Market News
          </TabsTrigger>
        </TabsList>
        <TabsContent value="financial-report" className="mt-4">
          <SummarizeForm
            action={summarizeFinancialReports as any}
            inputName="reportContent"
            placeholder="Paste the full text of the financial report here..."
            title="Summarize Report"
          />
        </TabsContent>
        <TabsContent value="market-news" className="mt-4">
          <SummarizeForm
            action={summarizeMarketNews as any}
            inputName="articleContent"
            placeholder="Paste the full text of the market news article here..."
            title="Summarize News"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
