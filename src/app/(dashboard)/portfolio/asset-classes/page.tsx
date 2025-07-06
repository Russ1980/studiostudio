
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LineChart, Landmark, Building, Package, Banknote, Zap } from "lucide-react";

const assetClasses = [
  {
    title: "Equities (Stocks)",
    description: "Ownership in a company, offering dividends and capital appreciation. High risk, high potential returns.",
    icon: LineChart,
  },
  {
    title: "Fixed Income (Bonds)",
    description: "Debt securities with periodic interest payments and principal repayment. Lower risk, modest returns.",
    icon: Landmark,
  },
  {
    title: "Real Estate",
    description: "Physical properties generating rental income and appreciation. Moderate to high risk.",
    icon: Building,
  },
  {
    title: "Commodities",
    description: "Physical goods like gold or oil, often inflation hedges. High volatility.",
    icon: Package,
  },
  {
    title: "Cash & Cash Equivalents",
    description: "Liquid assets like money market funds or Treasury bills. Low risk, minimal returns.",
    icon: Banknote,
  },
  {
    title: "Alternative Investments",
    description: "Non-traditional assets like cryptocurrencies or private equity. High risk, less liquid.",
    icon: Zap,
  },
];

export default function AssetClassesPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Asset Classes</h1>
        <p className="text-muted-foreground">
          Explore different categories of investments to build a diversified portfolio.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assetClasses.map((asset) => (
          <Card key={asset.title}>
            <CardHeader>
              <div className="flex items-center gap-4">
                 <div className="bg-secondary p-3 rounded-lg">
                    <asset.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>{asset.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{asset.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
