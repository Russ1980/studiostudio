import { getLearningResources } from "@/lib/actions";
import { LearnClientPage } from "./learn-client";

export default async function LearnPage() {
  const { quizzes, resources } = await getLearningResources();

  return <LearnClientPage quizzes={quizzes} resources={resources} />;
}
