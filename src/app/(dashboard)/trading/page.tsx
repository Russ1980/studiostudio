import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const openPositions = [
  { ticker: "AAPL", shares: 50, avgPrice: 150.00, currentPrice: 172.25, gainLoss: 1112.50 },
  { ticker: "NVDA", shares: 25, avgPrice: 800.00, currentPrice: 950.02, gainLoss: 3750.50 },
];

const tradeHistory = [
  { id: 1, type: "Buy", ticker: "AAPL", shares: 50, price: 150.00, date: "2023-10-01" },
  { id: 2, type: "Buy", ticker: "NVDA", shares: 25, price: 800.00, date: "2024-02-15" },
  { id: 3, type: "Sell", ticker: "TSLA", shares: 10, price: 200.00, date: "2024-04-20" },
];

export default function TradingPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Paper Trade</CardTitle>
            <CardDescription>Simulate trades without using real money.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ticker">Stock Ticker</Label>
              <Input id="ticker" placeholder="e.g., AAPL" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="0" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="Market" readOnly />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full bg-green-600 hover:bg-green-700 dark:text-white">Buy</Button>
            <div className="w-4"></div>
            <Button variant="destructive" className="w-full">Sell</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Tabs defaultValue="positions">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="positions">Open Positions</TabsTrigger>
            <TabsTrigger value="history">Trade History</TabsTrigger>
          </TabsList>
          <TabsContent value="positions">
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Avg. Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead className="text-right">Gain/Loss</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openPositions.map((pos) => (
                      <TableRow key={pos.ticker}>
                        <TableCell className="font-medium">{pos.ticker}</TableCell>
                        <TableCell>{pos.shares}</TableCell>
                        <TableCell>${pos.avgPrice.toFixed(2)}</TableCell>
                        <TableCell>${pos.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className={`text-right ${pos.gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          ${pos.gainLoss.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Shares</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tradeHistory.map((trade) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Badge variant={trade.type === 'Buy' ? 'default' : 'destructive'} className={trade.type === 'Buy' ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'}>{trade.type}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{trade.ticker}</TableCell>
                        <TableCell>{trade.shares}</TableCell>
                        <TableCell>${trade.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{trade.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
