"use client";

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
import { MoreHorizontal, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teamMembers = [
    { name: "Sarah Johnson", email: "sarah.j@example.com", avatar: "SJ", role: "Admin", status: "Active" },
    { name: "John Doe", email: "john.d@example.com", avatar: "JD", role: "Accountant", status: "Active" },
    { name: "Jane Smith", email: "jane.s@example.com", avatar: "JS", role: "Viewer", status: "Inactive" },
    { name: "Mike Ross", email: "mike.r@example.com", avatar: "MR", role: "Accountant", status: "Pending" },
];

const roleVariant: { [key: string]: "default" | "secondary" } = {
  Admin: "default",
  Accountant: "secondary",
  Viewer: "secondary",
};
const statusVariant: { [key: string]: "success" | "secondary" | "default" } = {
  Active: "success",
  Inactive: "secondary",
  Pending: "default",
};

export default function TeamManagementPage() {
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
                <TableRow key={member.email}>
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
                    <Badge variant={roleVariant[member.role]}>{member.role}</Badge>
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
