'use server';

/**
 * @fileOverview Summarizes key points from a document.
 *
 * - summarizeKnowledgeBase - A function that handles the summarization process.
 * - SummarizeKnowledgeBaseInput - The input type for the summarizeKnowledgeBase function.
 * - SummarizeKnowledgeBaseOutput - The return type for the summarizeKnowledgeBase function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeKnowledgeBaseInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be summarized.'),
});
export type SummarizeKnowledgeBaseInput = z.infer<typeof SummarizeKnowledgeBaseInputSchema>;

const SummarizeKnowledgeBaseOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key points in the document.'),
});
export type SummarizeKnowledgeBaseOutput = z.infer<typeof SummarizeKnowledgeBaseOutputSchema>;

export async function summarizeKnowledgeBase(
  input: SummarizeKnowledgeBaseInput
): Promise<SummarizeKnowledgeBaseOutput> {
  return summarizeKnowledgeBaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeKnowledgeBasePrompt',
  input: {schema: SummarizeKnowledgeBaseInputSchema},
  output: {schema: SummarizeKnowledgeBaseOutputSchema},
  prompt: `Summarize the key points from the following document:\n\n{{{documentText}}}`,
});

const summarizeKnowledgeBaseFlow = ai.defineFlow(
  {
    name: 'summarizeKnowledgeBaseFlow',
    inputSchema: SummarizeKnowledgeBaseInputSchema,
    outputSchema: SummarizeKnowledgeBaseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
