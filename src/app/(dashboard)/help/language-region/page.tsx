

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LanguageRegionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Language & Region</h1>
        <p className="text-muted-foreground">
          Manage language, currency, and date format settings for the application.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Localization Settings</CardTitle>
            <CardDescription>These settings affect how numbers, dates, and currencies are displayed.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="language-select">Language</Label>
                <Select defaultValue="en-us">
                    <SelectTrigger id="language-select">
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en-us">English (United States)</SelectItem>
                        <SelectItem value="en-gb">English (United Kingdom)</SelectItem>
                        <SelectItem value="es-es">Español (España)</SelectItem>
                        <SelectItem value="fr-fr">Français (France)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="currency-select">Home Currency</Label>
                <Select defaultValue="usd">
                    <SelectTrigger id="currency-select">
                        <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="usd">USD - United States Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="jpy">JPY - Japanese Yen</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="date-format-select">Date Format</Label>
                <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger id="date-format-select">
                        <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label htmlFor="number-format-select">Number Format</Label>
                <Select defaultValue="comma-dot">
                    <SelectTrigger id="number-format-select">
                        <SelectValue placeholder="Select number format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="comma-dot">1,234,567.89</SelectItem>
                        <SelectItem value="dot-comma">1.234.567,89</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
        <CardFooter>
            <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
