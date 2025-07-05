import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { summarizeMarketNews } from "@/ai/flows/summarize-market-news";
import { summarizeFinancialReports } from "@/ai/flows/summarize-financial-reports";
import { SummarizeForm } from "./summarize-form";

export default function InsightsPage() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Insights</CardTitle>
          <CardDescription>
            Distill complex financial documents and news into concise, actionable summaries.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="market-news" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="market-news">Market News</TabsTrigger>
              <TabsTrigger value="financial-reports">Financial Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="market-news" className="mt-4">
              <SummarizeForm
                action={summarizeMarketNews}
                inputName="articleContent"
                placeholder="Paste a market news article here to get a summary of key events, trends, and potential market impacts."
                title="Summarize News"
              />
            </TabsContent>
            <TabsContent value="financial-reports" className="mt-4">
              <SummarizeForm
                action={summarizeFinancialReports}
                inputName="reportContent"
                placeholder="Paste a financial report (e.g., quarterly earnings) to get a summary of key insights, trends, and potential risks."
                title="Summarize Report"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
