

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { PersonStanding, Keyboard, Eye, Ear, Contrast } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Accessibility</h1>
        <p className="text-muted-foreground">
          Our commitment to making our application usable for everyone.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="bg-secondary p-3 rounded-lg w-fit">
              <PersonStanding className="h-6 w-6 text-secondary-foreground" />
            </div>
            <CardTitle className="text-2xl">Accessibility Statement</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none text-muted-foreground">
          <p>
            Mardisen Suite is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
          </p>
          <p>
            We aim to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 level AA. These guidelines explain how to make web content more accessible for people with a wide array of disabilities.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Keyboard /> Keyboard Navigation</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">The application is fully navigable using a keyboard. Use `Tab` to move between interactive elements and `Enter` or `Space` to activate them.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Eye /> Screen Reader Support</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">We use semantic HTML and ARIA attributes to ensure compatibility with screen readers like JAWS, NVDA, and VoiceOver.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Contrast /> Color Contrast</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Our light and dark themes are designed to meet WCAG AA contrast ratios for text and UI elements.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Ear /> Alternative Text</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">All meaningful images and icons include descriptive alternative text for users who cannot see them.</p>
            </CardContent>
          </Card>
      </div>

    </div>
  );
}
