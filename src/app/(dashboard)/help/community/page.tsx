

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Users, Lightbulb, MessageSquare, BookUser } from "lucide-react";
import { Button } from "@/components/ui/button";

const forums = [
  { title: "General Discussion", description: "Talk about anything related to accounting and business management.", icon: MessageSquare },
  { title: "Feature Requests", description: "Have an idea for a new feature? Share it with the community and our product team.", icon: Lightbulb },
  { title: "User Guides & Tutorials", description: "Share your own guides or find tutorials created by other users.", icon: BookUser },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Community Hub</h1>
        <p className="text-muted-foreground">
          Join user forums, ask questions, and share knowledge with other users.
        </p>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forums.map((forum) => (
          <Card key={forum.title}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-lg">
                    <forum.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle>{forum.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{forum.description}</CardDescription>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Go to Forum</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Community Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
            <ul>
                <li>Be respectful and courteous to other members.</li>
                <li>Do not share sensitive personal or client information.</li>
                <li>Keep discussions relevant to the forum topic.</li>
                <li>No spam or self-promotion.</li>
            </ul>
        </CardContent>
       </Card>
    </div>
  );
}
