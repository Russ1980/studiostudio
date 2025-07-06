
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageSquare } from "lucide-react";

export default function ContactSupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Support</h1>
        <p className="text-muted-foreground">
          We're here to help. Choose your preferred way to get in touch.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-2">
                <MessageSquare className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle>Live Chat</CardTitle>
            <CardContent>Start a conversation with our team right now.</CardContent>
          </CardHeader>
          <CardFooter>
            <Button className="w-full">Start Chat</Button>
          </CardFooter>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-2">
                <Mail className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle>Email Support</CardTitle>
            <CardContent>Get a detailed response within 24 hours.</CardContent>
          </CardHeader>
           <CardFooter>
            <Button className="w-full" variant="outline">Send Email</Button>
          </CardFooter>
        </Card>
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto bg-secondary p-4 rounded-full w-fit mb-2">
                <Phone className="h-8 w-8 text-secondary-foreground" />
            </div>
            <CardTitle>Phone Support</CardTitle>
            <CardContent>Available Mon-Fri, 9am-5pm PST.</CardContent>
          </CardHeader>
           <CardFooter>
            <Button className="w-full" variant="outline">Call Us</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
