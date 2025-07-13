
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUp, ArrowDown, LineChart, Newspaper } from "lucide-react";
import { SummarizeForm } from "@/app/(dashboard)/reports-insights/summarization-tools/summarize-form";
import { summarizeMarketNews } from "@/ai/flows/summarize-market-news";
import Image from "next/image";

const trendingStocks = [
  { name: "Apple Inc.", ticker: "AAPL", price: "172.25", change: "+2.50", changePercent: "+1.50%", data: [170.5, 171.0, 171.75, 172.0, 172.5, 172.1, 172.25], logo: 'https://placehold.co/40x40.png' },
  { name: "NVIDIA Corp", ticker: "NVDA", price: "950.02", change: "+30.10", changePercent: "+3.20%", data: [920.0, 930.0, 945.0, 940.0, 948.0, 952.0, 950.02], logo: 'https://placehold.co/40x40.png' },
  { name: "Tesla, Inc.", ticker: "TSLA", price: "180.01", change: "-5.20", changePercent: "-2.80%", data: [188.0, 185.0, 182.0, 183.0, 181.0, 179.0, 180.01], logo: 'https://placehold.co/40x40.png' },
];

function MiniSparkline({ data, change }: { data: number[]; change: string }) {
  const isPositive = !change.startsWith('-');
  const color = isPositive ? 'text-success' : 'text-destructive';
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - ((d - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 100}`).join(' ');

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-10">
      <polyline
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={color}
        points={points}
      />
    </svg>
  );
}

export default function MarketOverviewPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Market Overview</h1>
        <p className="text-muted-foreground">
          A snapshot of market trends and top news.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {trendingStocks.map((stock) => (
          <Card key={stock.ticker}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Image src={stock.logo} alt={`${stock.name} logo`} width={32} height={32} data-ai-hint="company logo" className="rounded-full" />
                   <div>
                      <CardTitle className="text-lg">{stock.name}</CardTitle>
                      <CardDescription>{stock.ticker}</CardDescription>
                   </div>
                </div>
                <MiniSparkline data={stock.data} change={stock.change} />
              </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">${stock.price}</div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stock.change.startsWith('-') ? 'text-destructive' : 'text-success'}`}>
                    {stock.change.startsWith('-') ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                    <span>{stock.change} ({stock.changePercent})</span>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
          <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Newspaper className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>AI News Summarizer</CardTitle>
                    <CardDescription>Paste any market news article to get a quick summary of key events and potential impacts.</CardDescription>
                </div>
              </div>
          </CardHeader>
          <CardContent>
              <SummarizeForm
                action={summarizeMarketNews as any}
                inputName="articleContent"
                placeholder="Paste the full text of the market news article here..."
                title="Summarize News"
              />
          </CardContent>
      </Card>
    </div>
  );
}
