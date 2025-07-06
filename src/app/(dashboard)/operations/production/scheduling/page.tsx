
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, GripVertical } from "lucide-react";

const scheduleData = [
  { id: "PP-001", task: "Widget A - Cutting", machine: "CNC Mill", start: 0, duration: 3, color: "bg-blue-500" },
  { id: "PP-004", task: "Widget A - Rush", machine: "CNC Mill", start: 3, duration: 1, color: "bg-red-500" },
  { id: "PP-002", task: "Component B", machine: "Laser Cutter", start: 1, duration: 4, color: "bg-green-500" },
  { id: "PP-003", task: "Assembly C", machine: "Assembly Line 1", start: 0, duration: 2, color: "bg-yellow-500" },
  { id: "PP-001-2", task: "Widget A - Assembly", machine: "Assembly Line 1", start: 3, duration: 2, color: "bg-blue-500" },
];

const resourceData = [
    { name: "John Doe", role: "CNC Operator", avatar: "JD"},
    { name: "Jane Smith", role: "Laser Operator", avatar: "JS"},
    { name: "Peter Jones", role: "Assembly Lead", avatar: "PJ"},
];

export default function SchedulingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Production Scheduling & Resource Allocation</h1>
          <p className="text-muted-foreground">
            Visualize the production schedule, manage resource allocation, and optimize timing.
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">Day</Button>
            <Button variant="secondary">Week</Button>
            <Button variant="outline">Month</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Gantt Chart</CardTitle>
            <CardDescription>Drag and drop tasks to adjust the schedule. Week of July 22, 2024</CardDescription>
        </CardHeader>
        <CardContent className="pr-10">
            <div className="relative grid grid-cols-[150px_repeat(7,1fr)] gap-x-2 text-sm">
                {/* Header */}
                <div className="font-semibold text-right pr-2">Machine</div>
                <div className="text-center font-semibold">Mon</div>
                <div className="text-center font-semibold">Tue</div>
                <div className="text-center font-semibold">Wed</div>
                <div className="text-center font-semibold">Thu</div>
                <div className="text-center font-semibold">Fri</div>
                <div className="text-center font-semibold">Sat</div>
                <div className="text-center font-semibold">Sun</div>

                {/* Grid lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`absolute top-0 bottom-0 border-l ${ i === 0 ? 'left-[150px]' : ''}`} style={{ left: `calc(150px + (100% - 150px) / 7 * ${i})`}}></div>
                ))}
                
                {/* Rows */}
                <div className="col-span-8 border-b my-2"></div>
                <div className="font-semibold text-right pr-2 h-12 flex items-center justify-end">CNC Mill</div>
                <div className="col-span-7 h-12 relative border-b">
                    {scheduleData.filter(d => d.machine === "CNC Mill").map(d => (
                        <div key={d.id} className={`${d.color} absolute top-2 bottom-2 rounded-lg p-2 text-white overflow-hidden text-xs flex items-center cursor-pointer hover:opacity-80`} style={{ left: `calc((100% / 7) * ${d.start})`, width: `calc((100% / 7) * ${d.duration})`}}><GripVertical className="mr-1 h-4 w-4 shrink-0" /> {d.task}</div>
                    ))}
                </div>
                 <div className="font-semibold text-right pr-2 h-12 flex items-center justify-end">Laser Cutter</div>
                <div className="col-span-7 h-12 relative border-b">
                     {scheduleData.filter(d => d.machine === "Laser Cutter").map(d => (
                        <div key={d.id} className={`${d.color} absolute top-2 bottom-2 rounded-lg p-2 text-white overflow-hidden text-xs flex items-center cursor-pointer hover:opacity-80`} style={{ left: `calc((100% / 7) * ${d.start})`, width: `calc((100% / 7) * ${d.duration})`}}><GripVertical className="mr-1 h-4 w-4 shrink-0" /> {d.task}</div>
                    ))}
                </div>
                 <div className="font-semibold text-right pr-2 h-12 flex items-center justify-end">Assembly Line 1</div>
                <div className="col-span-7 h-12 relative border-b">
                     {scheduleData.filter(d => d.machine === "Assembly Line 1").map(d => (
                        <div key={d.id} className={`${d.color} absolute top-2 bottom-2 rounded-lg p-2 text-white overflow-hidden text-xs flex items-center cursor-pointer hover:opacity-80`} style={{ left: `calc((100% / 7) * ${d.start})`, width: `calc((100% / 7) * ${d.duration})`}}><GripVertical className="mr-1 h-4 w-4 shrink-0" /> {d.task}</div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
      
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Resource Allocation</CardTitle>
                <CardDescription>Assign skilled operators to tasks.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {resourceData.map(resource => (
                        <li key={resource.name} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarFallback>{resource.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-medium">{resource.name}</p>
                                <p className="text-sm text-muted-foreground">{resource.role}</p>
                            </div>
                            <Button variant="outline">View Schedule</Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Advanced Scheduling</CardTitle>
                <CardDescription>Tools to handle complex production scenarios.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">Finite Capacity Scheduling</h4>
                        <p className="text-sm text-muted-foreground">Prevents overbooking by respecting resource limits. This feature is automatically applied to prevent conflicts.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50">
                    <Users className="h-6 w-6 text-primary mt-1" />
                    <div>
                        <h4 className="font-semibold">Priority Scheduling</h4>
                        <p className="text-sm text-muted-foreground">Set custom rules to prioritize urgent orders and ensure key clients are served first. (Coming soon)</p>
                    </div>
                </div>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
