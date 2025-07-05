import {genkit} from 'genkit/next';
import {ai} from '@/ai/genkit';

export const {GET, POST} = genkit({
  plugins: [ai.plugin],
});
