
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { useToast } from "@/hooks/use-toast";

export function TradingClientPage({ data }: { data: any }) {
  const [positions, setPositions] = useState(data.openPositions);
  const [history, setHistory] = useState(data.tradeHistory);
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState(0);
  const { toast } = useToast();
  
  const handleTrade = (type: "Buy" | "Sell") => {
    if (!ticker || quantity <= 0) {
      toast({
        title: "Invalid Trade",
        description: "Please enter a valid ticker and quantity.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you'd fetch the current price. We'll mock it.
    const currentPrice = Math.floor(Math.random() * 200) + 50;

    setHistory(prev => [
      {
        id: prev.length + 1,
        type,
        ticker: ticker.toUpperCase(),
        shares: quantity,
        price: currentPrice,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    
    // Update positions
    const existingPosition = positions.find((p: any) => p.ticker === ticker.toUpperCase());
    if (existingPosition) {
      const newShares = existingPosition.shares + (type === "Buy" ? quantity : -quantity);
      if (newShares > 0) {
        setPositions(positions.map((p: any) => p.ticker === ticker.toUpperCase() ? {...p, shares: newShares} : p));
      } else {
        setPositions(positions.filter((p: any) => p.ticker !== ticker.toUpperCase()));
      }
    } else if (type === "Buy") {
        setPositions([...positions, {
            ticker: ticker.toUpperCase(),
            shares: quantity,
            avgPrice: currentPrice,
            currentPrice: currentPrice,
            gainLoss: 0,
        }])
    }

    toast({
      title: "Trade Executed",
      description: `Successfully ${type === 'Buy' ? 'bought' : 'sold'} ${quantity} shares of ${ticker.toUpperCase()}.`,
    });

    setTicker("");
    setQuantity(0);
  };

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
              <Input id="ticker" placeholder="e.g., AAPL" value={ticker} onChange={(e) => setTicker(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="0" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" placeholder="Market" readOnly />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="success" className="w-full" onClick={() => handleTrade("Buy")}>Buy</Button>
            <div className="w-4"></div>
            <Button variant="destructive" className="w-full" onClick={() => handleTrade("Sell")}>Sell</Button>
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
                    {positions.map((pos: any) => (
                      <TableRow key={pos.ticker}>
                        <TableCell className="font-medium">{pos.ticker}</TableCell>
                        <TableCell>{pos.shares}</TableCell>
                        <TableCell>${pos.avgPrice.toFixed(2)}</TableCell>
                        <TableCell>${pos.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className={`text-right ${pos.gainLoss >= 0 ? 'text-success' : 'text-destructive'}`}>
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
                    {history.map((trade: any) => (
                      <TableRow key={trade.id}>
                        <TableCell>
                          <Badge variant={trade.type === 'Buy' ? 'success' : 'destructive'}>{trade.type}</Badge>
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
