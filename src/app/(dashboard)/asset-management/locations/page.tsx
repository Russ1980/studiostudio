
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HardDrive, Server, Warehouse } from "lucide-react";
import { getAssetLocationsData } from "@/lib/actions";
import { useState, useEffect } from "react";

export default function AssetLocationsPage() {
    const [data, setData] = useState<{ physicalAssets: any[], digitalAssets: any[] } | null>(null);

    useEffect(() => {
        getAssetLocationsData().then(setData);
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const { physicalAssets, digitalAssets } = data;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Asset Locations</h1>
        <p className="text-muted-foreground">
          Manage and track the physical and digital locations of all company assets.
        </p>
      </div>

      <Tabs defaultValue="physical" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="physical">
            <Warehouse className="mr-2" />
            Physical Assets
          </TabsTrigger>
          <TabsTrigger value="digital">
            <Server className="mr-2" />
            Digital Assets
          </TabsTrigger>
        </TabsList>
        <TabsContent value="physical" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Physical Asset Locations</CardTitle>
              <CardDescription>
                A directory of tangible company assets and where they are located.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {physicalAssets.map((asset) => (
                    <TableRow key={asset.name}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>{asset.department}</TableCell>
                      <TableCell>{asset.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="digital" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Digital Asset Locations</CardTitle>
              <CardDescription>
                A directory of digital company assets and their platforms or servers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Asset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location/Platform</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {digitalAssets.map((asset) => (
                    <TableRow key={asset.name}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>
                        <Badge variant={asset.status === "Online" ? "success" : "secondary"}>
                          {asset.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
