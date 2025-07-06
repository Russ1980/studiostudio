
"use client";

import {
  Archive,
  Trash2,
  File,
  Send,
  Mail,
  Search,
  PenSquare,
  Reply,
  ReplyAll,
  Forward,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const emails = [
  {
    id: 1,
    sender: "Olivia Davis",
    subject: "Re: Q3 Financial Report",
    preview: "Thanks for sending this over! I've reviewed the report and have a few questions about the marketing spend...",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    sender: "Acme Corp.",
    subject: "Invoice #INV-2024-055 Due Soon",
    preview: "Just a friendly reminder that your invoice for $2,500.00 is due next week. Let us know if you have any questions.",
    time: "1h ago",
    read: false,
  },
  {
    id: 3,
    sender: "James Smith",
    subject: "Project Phoenix Update",
    preview: "Team, we're on track to hit our milestones for this sprint. Let's sync up tomorrow at 10 AM to discuss next steps.",
    time: "3h ago",
    read: true,
  },
  {
    id: 4,
    sender: "Support @ Cloud Services",
    subject: "Scheduled Maintenance Notification",
    preview: "We will be performing scheduled maintenance on our servers this Saturday from 10 PM to 11 PM PST.",
    time: "1d ago",
    read: true,
  },
];

export default function EmailCenterPage() {
  return (
    <div className="flex flex-col h-full">
        <div>
            <h1 className="text-3xl font-bold">Email Center</h1>
            <p className="text-muted-foreground">Manage all your support and client communications in one place.</p>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[250px_400px_1fr] gap-4 mt-6">
            {/* Left Panel: Navigation */}
            <div className="hidden md:flex flex-col gap-2">
                <Button className="w-full justify-start"><PenSquare className="mr-2"/>Compose</Button>
                <div className="flex flex-col gap-1 mt-4">
                    <Button variant="ghost" className="w-full justify-between bg-accent text-accent-foreground">
                        <span className="flex items-center gap-2"><Mail/> Inbox</span>
                        <span className="text-xs font-bold">2</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><File/> Drafts</Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><Send/> Sent</Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><Archive/> Archive</Button>
                    <Button variant="ghost" className="w-full justify-start gap-2"><Trash2/> Trash</Button>
                </div>
            </div>

            {/* Middle Panel: Email List */}
            <div className="flex flex-col border rounded-lg">
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search emails..." className="pl-9" />
                    </div>
                </div>
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="unread">Unread</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="m-0">
                         <div className="flex-1 overflow-y-auto">
                            {emails.map((email) => (
                                <div key={email.id} className={cn("p-4 border-b cursor-pointer hover:bg-muted", email.id === 1 && "bg-muted")}>
                                    <div className="flex items-start justify-between">
                                        <p className="font-semibold">{email.sender}</p>
                                        <p className="text-xs text-muted-foreground">{email.time}</p>
                                    </div>
                                    <p className="text-sm font-medium">{email.subject}</p>
                                    <p className="text-sm text-muted-foreground truncate">{email.preview}</p>
                                    {!email.read && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>}
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Right Panel: Content View */}
             <div className="hidden lg:flex flex-col border rounded-lg">
                <div className="p-4 border-b">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon"><Archive/></Button>
                        <Button variant="outline" size="icon"><Trash2/></Button>
                         <Separator orientation="vertical" className="h-6 mx-2" />
                        <Button variant="outline" size="icon"><Reply/></Button>
                        <Button variant="outline" size="icon"><ReplyAll/></Button>
                        <Button variant="outline" size="icon"><Forward/></Button>
                    </div>
                </div>
                 <div className="p-6">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarFallback>OD</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Olivia Davis</p>
                            <p className="text-sm text-muted-foreground">olivia.d@example.com</p>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <h2 className="text-xl font-bold mb-4">Re: Q3 Financial Report</h2>
                    <div className="prose prose-sm max-w-none text-foreground">
                        <p>Hi Team,</p>
                        <p>Thanks for sending this over! I've reviewed the report and have a few questions about the marketing spend category. It seems about 15% higher than projected.</p>
                        <p>Could you provide a more detailed breakdown of the campaigns that contributed to this increase? I'd like to understand the ROI on those specific initiatives.</p>
                        <p>Best,<br/>Olivia</p>
                    </div>
                 </div>
            </div>
        </div>
    </div>
  );
}
