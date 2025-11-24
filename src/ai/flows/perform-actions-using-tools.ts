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

// Example Tool: Check Calendar Availability
const checkCalendarAvailability = ai.defineTool(
  {
    name: 'checkCalendarAvailability',
    description: 'Checks the availability of a time slot in the calendar.',
    inputSchema: z.object({
      date: z.string().describe('The date to check for availability (YYYY-MM-DD).'),
      time: z.string().describe('The time to check for availability (HH:MM).'),
    }),
    outputSchema: z.boolean().describe('True if the time slot is available, false otherwise.'),
  },
  async (input) => {
    // TODO: Implement the actual calendar checking logic here
    // This is just a placeholder.  In a real application,
    // this would connect to a calendar API.
    console.log(`Checking calendar availability for ${input.date} at ${input.time}`);
    return true; // Assume it's available for now
  }
);

// Example Tool: Update CRM Record
const updateCrmRecord = ai.defineTool(
  {
    name: 'updateCrmRecord',
    description: 'Updates a CRM record with the given information.',
    inputSchema: z.object({
      recordId: z.string().describe('The ID of the CRM record to update.'),
      field: z.string().describe('The field to update.'),
      value: z.string().describe('The new value for the field.'),
    }),
    outputSchema: z.string().describe('Confirmation message.'),
  },
  async (input) => {
    // TODO: Implement the actual CRM updating logic here
    // This is just a placeholder. In a real application,
    // this would connect to a CRM API.
    console.log(`Updating CRM record ${input.recordId}: ${input.field} = ${input.value}`);
    return `CRM record ${input.recordId} updated successfully.`;
  }
);

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
