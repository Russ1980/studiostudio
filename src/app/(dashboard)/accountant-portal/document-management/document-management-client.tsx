"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MoreHorizontal,
  Folder,
  FileText,
  Search,
  Upload,
  ChevronRight,
  PlusCircle,
  Download,
  Edit,
  Move
} from "lucide-react";

export function DocumentManagementClientPage({ data }: { data: any }) {
  const { files, requests, activities } = data;

  return (
      <Tabs defaultValue="files" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">Shared Files</TabsTrigger>
          <TabsTrigger value="requests">Document Requests</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="files" className="mt-4">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">All Files</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-muted-foreground">Innovate Inc.</span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="font-medium">Tax Documents</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search files..." className="pl-9" />
                            </div>
                            <Button variant="outline">New Folder</Button>
                            <Button><Upload className="mr-2" /> Upload</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Modified</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="w-16 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {files.map((file: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        {file.type === "folder" ? <Folder className="text-primary"/> : <FileText className="text-muted-foreground"/>}
                                        {file.name}
                                    </TableCell>
                                    <TableCell>{file.modified}</TableCell>
                                    <TableCell>{file.size}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal /></Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem><Download className="mr-2"/>Download</DropdownMenuItem>
                                                <DropdownMenuItem><Edit className="mr-2"/>Rename</DropdownMenuItem>
                                                <DropdownMenuItem><Move className="mr-2"/>Move</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="requests" className="mt-4">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Document Requests</CardTitle>
                    <Button><PlusCircle className="mr-2"/> Create Request</Button>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client</TableHead>
                                <TableHead>Request Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{req.client}</TableCell>
                                    <TableCell>{req.request}</TableCell>
                                    <TableCell><Badge variant={req.status === 'Completed' ? 'success' : 'default'}>{req.status}</Badge></TableCell>
                                    <TableCell>{req.due}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
            <Card>
                <CardHeader>
                    <CardTitle>Activity Feed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {activities.map((act: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback>{act.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-sm">
                                <span className="font-medium">{act.user}</span>
                                <span className="text-muted-foreground"> {act.action} </span>
                                <span className="font-medium">{act.document}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">{act.time}</div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
  );
}
