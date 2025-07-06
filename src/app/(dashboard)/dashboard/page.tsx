import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Download,
  Share2,
  Settings,
} from "lucide-react";
import { getMockUser } from "@/lib/auth";


export default async function DashboardPage() {
  const user = await getMockUser();

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  <Users />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold">$2.1M</p>
                <p className="text-sm text-muted-foreground">Net Revenue</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-success">+12.4%</p>
                <p className="text-sm text-muted-foreground">Growth</p>
              </div>
              <div className="text-right sm:text-left">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </div>
              <Separator orientation="vertical" className="h-10 hidden sm:block" />
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon"><Download className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Share2 className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
               <Button variant="outline">Create Invoice</Button>
               <Button variant="outline">Run Payroll</Button>
               <Button variant="outline">Add a Bill</Button>
               <Button variant="outline">View Reports</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
           <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <ul className="space-y-3">
              <li className="text-sm text-muted-foreground">Invoice #1024 paid by Apex Solutions.</li>
              <li className="text-sm text-muted-foreground">Payroll for March 2024 processed successfully.</li>
              <li className="text-sm text-muted-foreground">New client "Stellar Goods" added.</li>
              <li className="text-sm text-muted-foreground">Q1 Financial Report generated.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
