'use server';

/**
 * @fileOverview An AI agent that uses external tools to perform actions based on user input.
 *
 * - performActionsUsingTools - A function that handles the process of performing actions using tools.
 * - PerformActionsUsingToolsInput - The input type for the performActionsUsingTools function.
 * - PerformActionsUsingToolsOutput - The return type for the performActionsUsingTools function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { checkCalendarAvailability, updateCrmRecord } from '@/ai/tools';


const PerformActionsUsingToolsInputSchema = z.object({
  userInput: z.string().describe('The input from the user.'),
});
export type PerformActionsUsingToolsInput = z.infer<typeof PerformActionsUsingToolsInputSchema>;

const PerformActionsUsingToolsOutputSchema = z.object({
  response: z.string().describe('The response from the AI agent.'),
});
export type PerformActionsUsingToolsOutput = z.infer<typeof PerformActionsUsingToolsOutputSchema>;

export async function performActionsUsingTools(input: PerformActionsUsingToolsInput): Promise<PerformActionsUsingToolsOutput> {
  return performActionsUsingToolsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'performActionsUsingToolsPrompt',
  input: {schema: PerformActionsUsingToolsInputSchema},
  output: {schema: PerformActionsUsingToolsOutputSchema},
  tools: [checkCalendarAvailability, updateCrmRecord],
  prompt: `You are an AI assistant that can use external tools to perform actions based on user input.

  The available tools are:
  - checkCalendarAvailability: Checks the availability of a time slot in the calendar.
  - updateCrmRecord: Updates a CRM record with the given information.

  User Input: {{{userInput}}}
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const performActionsUsingToolsFlow = ai.defineFlow(
  {
    name: 'performActionsUsingToolsFlow',
    inputSchema: PerformActionsUsingToolsInputSchema,
    outputSchema: PerformActionsUsingToolsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
