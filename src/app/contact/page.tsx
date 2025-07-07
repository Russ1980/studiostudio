import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin } from "lucide-react";


export default function ContactPage() {
  return (
    <div className="container mx-auto py-24 px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          We'd love to hear from you. Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">
        <div className="space-y-8">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <CardTitle>Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">General Inquiries</p>
                    <a href="mailto:hello@mardisen.com" className="font-semibold text-lg hover:underline">hello@mardisen.com</a>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <CardTitle>Our Office</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Come say hello at our headquarters.</p>
                    <p className="font-semibold text-lg">888 Prospect Street</p>
                    <p className="font-semibold text-lg">San Diego, CA 92037</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                 <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Your message..." />
                </div>
            </CardContent>
            <CardFooter>
                <Button>Send Message</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
