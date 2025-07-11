
"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { MoreHorizontal, UserPlus, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const initialTeamMembers = [
    { id: "1", name: "Sarah Johnson", email: "sarah.j@example.com", avatar: "SJ", role: "Admin", status: "Active" },
    { id: "2", name: "John Doe", email: "john.d@example.com", avatar: "JD", role: "Accountant", status: "Active" },
    { id: "3", name: "Jane Smith", email: "jane.s@example.com", avatar: "JS", role: "Viewer", status: "Inactive" },
    { id: "4", name: "Mike Ross", email: "mike.r@example.com", avatar: "MR", role: "Accountant", status: "Pending" },
];

const roles = [
  { value: "Admin", label: "Admin" },
  { value: "Accountant", label: "Accountant" },
  { value: "Viewer", label: "Viewer" },
];

const statusVariant: { [key: string]: "success" | "default" } = {
  Active: "success",
  Inactive: "default",
  Pending: "default",
};

export default function TeamManagementPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = (userId: string, newRole: string) => {
    startTransition(() => {
      // Simulate API call
      setTimeout(() => {
        setTeamMembers(prevMembers =>
          prevMembers.map(member =>
            member.id === userId ? { ...member, role: newRole } : member
          )
        );
      }, 500);
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">
            Invite new team members and set their roles and permissions.
          </p>
        </div>
        <Button><UserPlus className="mr-2"/> Invite User</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-[150px] justify-between">
                                {member.role}
                                {isPending ? <Loader2 className="ml-2 h-4 w-4 animate-spin" /> : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> }
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[150px] p-0">
                            <Command>
                                <CommandList>
                                    <CommandGroup>
                                        {roles.map((role) => (
                                        <CommandItem
                                            key={role.value}
                                            value={role.value}
                                            onSelect={(currentValue) => {
                                                handleRoleChange(member.id, currentValue.charAt(0).toUpperCase() + currentValue.slice(1));
                                            }}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                member.role === role.value ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {role.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                  </TableCell>
                   <TableCell>
                    <Badge variant={statusVariant[member.status]}>{member.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        {member.status === 'Pending' && <DropdownMenuItem>Resend Invite</DropdownMenuItem>}
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Remove User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
