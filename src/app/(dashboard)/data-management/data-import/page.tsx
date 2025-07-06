
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, DatabaseZap } from "lucide-react";

export default function DataImportPage() {
    return (
        <div className="flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Data Import</h1>
                    <p className="text-muted-foreground">
                        Import data into the application from external files or other systems.
                    </p>
                </div>
                <Button variant="outline">View Import History</Button>
            </div>

             <Tabs defaultValue="file" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">Import from File</TabsTrigger>
                <TabsTrigger value="source">Connect Data Source</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="mt-4">
                    <Card>
                        <CardContent className="p-6 grid gap-6">
                             <div className="grid gap-2 max-w-md">
                                <h3 className="font-semibold">Step 1: Select Data Type</h3>
                                <p className="text-sm text-muted-foreground">Specify what kind of data you are importing for correct processing.</p>
                                <Select>
                                    <SelectTrigger><SelectValue placeholder="Select data type..."/></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="customers">Customers</SelectItem>
                                        <SelectItem value="products">Products</SelectItem>
                                        <SelectItem value="transactions">Transactions</SelectItem>
                                        <SelectItem value="coa">Chart of Accounts</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                             <div className="grid gap-2">
                                <h3 className="font-semibold">Step 2: Upload File</h3>
                                <p className="text-sm text-muted-foreground">Allowed formats: CSV, XLSX, XML.</p>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-muted-foreground">CSV, XLSX, XML (MAX. 50MB)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div> 
                            </div>
                           
                            <div className="grid gap-2">
                                <h3 className="font-semibold">Step 3: Field Mapping</h3>
                                <p className="text-sm text-muted-foreground">Match columns from your file to the corresponding fields in the application.</p>
                                <div className="w-full h-40 rounded-lg border border-dashed flex items-center justify-center">
                                    <p className="text-muted-foreground">Field mapping options will appear here after a file is uploaded.</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button size="lg">Begin Import</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="source" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Connect a Live Data Source</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                     <div className="bg-secondary p-3 rounded-lg"><DatabaseZap className="h-6 w-6 text-secondary-foreground" /></div>
                                     <CardTitle>PostgreSQL</CardTitle>
                                </CardHeader>
                                <CardFooter><Button className="w-full" variant="outline">Connect</Button></CardFooter>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                     <div className="bg-secondary p-3 rounded-lg"><DatabaseZap className="h-6 w-6 text-secondary-foreground" /></div>
                                     <CardTitle>Salesforce</CardTitle>
                                </CardHeader>
                                <CardFooter><Button className="w-full" variant="outline">Connect</Button></CardFooter>
                            </Card>
                             <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                     <div className="bg-secondary p-3 rounded-lg"><DatabaseZap className="h-6 w-6 text-secondary-foreground" /></div>
                                     <CardTitle>QuickBooks</CardTitle>
                                </CardHeader>
                                <CardFooter><Button className="w-full" variant="outline">Connect</Button></CardFooter>
                            </Card>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
