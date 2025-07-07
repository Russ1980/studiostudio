
import { createNextApiHandler } from '@genkit-ai/next/server';
import { ai } from '@/ai/genkit';

export const { GET, POST } = createNextApiHandler({
  plugins: [ai.plugin],
});
