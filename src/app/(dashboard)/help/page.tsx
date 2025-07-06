
"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Rocket,
  BookUser,
  Wrench,
  Phone,
  GraduationCap,
  Users,
  Info,
  PersonStanding,
  MessageSquare,
  Scale,
  Keyboard,
  Languages,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

const helpTopics = [
  {
    title: "Getting Started",
    description: "Account setup, basic navigation, and first steps.",
    icon: Rocket,
    href: "/help/getting-started",
  },
  {
    title: "User Guides",
    description: "Comprehensive manuals and process documentation.",
    icon: BookUser,
    href: "/help/user-guides",
  },
  {
    title: "Troubleshooting",
    description: "Solutions for common issues and error messages.",
    icon: Wrench,
    href: "/help/troubleshooting",
  },
  {
    title: "Contact Support",
    description: "Reach our support team via live chat, email, or phone.",
    icon: Phone,
    href: "/help/contact-support",
  },
  {
    title: "Training",
    description: "Access webinars and certification programs.",
    icon: GraduationCap,
    href: "/help/training",
  },
  {
    title: "Community",
    description: "Join user forums and share knowledge with others.",
    icon: Users,
    href: "/help/community",
  },
  {
    title: "System Information",
    description: "View version details and system status.",
    icon: Info,
    href: "/help/system-information",
  },
   {
    title: "Accessibility",
    description: "Learn about accessibility features and resources.",
    icon: PersonStanding,
    href: "/help/accessibility",
  },
   {
    title: "Feedback",
    description: "Submit feature requests and bug reports.",
    icon: MessageSquare,
    href: "/help/feedback",
  },
   {
    title: "Legal",
    description: "Review our Terms of Service and Privacy Policy.",
    icon: Scale,
    href: "/help/legal",
  },
  {
    title: "Keyboard Shortcuts",
    description: "A reference for all keyboard shortcuts.",
    icon: Keyboard,
    href: "/help/keyboard-shortcuts",
  },
  {
    title: "Language & Region",
    description: "Manage language and regional settings.",
    icon: Languages,
    href: "/help/language-region",
  },
  {
    title: "Updates & Maintenance",
    description: "Information on updates and scheduled maintenance.",
    icon: RefreshCw,
    href: "/help/updates-maintenance",
  },
  {
    title: "Emergency Assistance",
    description: "Critical support and data recovery options.",
    icon: AlertTriangle,
    href: "/help/emergency-assistance",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground mt-2">
          How can we help you today?
        </p>
        <div className="relative mt-4 max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search the knowledge base..." className="pl-10 h-12 text-lg" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {helpTopics.map((topic, index) => (
          <Link href={topic.href} key={index}>
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-secondary p-3 rounded-lg">
                  <topic.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
