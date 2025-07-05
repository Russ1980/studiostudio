import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const quizzes = [
  {
    question: "What does 'diversification' in a portfolio mean?",
    options: [
      "Putting all your money in one stock",
      "Spreading investments across various assets to reduce risk",
      "Only investing in technology companies",
      "Investing without a strategy",
    ],
    answer: "Spreading investments across various assets to reduce risk",
  },
  {
    question: "What is a 'bull market'?",
    options: [
      "A market where prices are falling",
      "A market that is stagnant",
      "A market where prices are rising",
      "A market for agricultural goods",
    ],
    answer: "A market where prices are rising",
  },
];

const resources = [
  { title: "Introduction to Stock Investing", image: "https://placehold.co/600x400.png", hint: "investment book" },
  { title: "Understanding Cryptocurrency", image: "https://placehold.co/600x400.png", hint: "crypto coins" },
  { title: "Retirement Planning 101", image: "https://placehold.co/600x400.png", hint: "saving piggybank" },
  { title: "How to Read Financial Statements", image: "https://placehold.co/600x400.png", hint: "financial document" },
];

export default function LearnPage() {
  return (
    <div className="grid gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Financial Literacy Quiz</CardTitle>
          <CardDescription>Test your knowledge and learn new concepts.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {quizzes.map((quiz, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{quiz.question}</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup className="gap-2">
                    {quiz.options.map((option, i) => (
                      <div className="flex items-center space-x-2" key={i}>
                        <RadioGroupItem value={option} id={`q${index}-o${i}`} />
                        <Label htmlFor={`q${index}-o${i}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button className="mt-4">Check Answer</Button>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource, index) => (
            <Card key={index} className="overflow-hidden">
              <Image
                src={resource.image}
                alt={resource.title}
                width={600}
                height={400}
                className="h-40 w-full object-cover"
                data-ai-hint={resource.hint}
              />
              <CardHeader>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" className="w-full">Read More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
