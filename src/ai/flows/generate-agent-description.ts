'use server';

/**
 * @fileOverview Generates a description for an AI agent based on its role and capabilities.
 *
 * @exported generateAgentDescription - An async function that takes AgentDescriptionInput and returns AgentDescriptionOutput.
 * @exported AgentDescriptionInput - The input type for the generateAgentDescription function.
 * @exported AgentDescriptionOutput - The return type for the generateAgentDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgentDescriptionInputSchema = z.object({
  role: z.string().describe('The role of the agent, e.g., customer support, sales, etc.'),
  capabilities: z.string().describe('A list of capabilities the agent possesses, e.g., answering FAQs, booking appointments, etc.'),
});

export type AgentDescriptionInput = z.infer<typeof AgentDescriptionInputSchema>;

const AgentDescriptionOutputSchema = z.object({
  description: z.string().describe('A generated description of the agent based on its role and capabilities.'),
});

export type AgentDescriptionOutput = z.infer<typeof AgentDescriptionOutputSchema>;

export async function generateAgentDescription(input: AgentDescriptionInput): Promise<AgentDescriptionOutput> {
  return generateAgentDescriptionFlow(input);
}

const generateAgentDescriptionPrompt = ai.definePrompt({
  name: 'generateAgentDescriptionPrompt',
  input: {schema: AgentDescriptionInputSchema},
  output: {schema: AgentDescriptionOutputSchema},
  prompt: `You are an AI assistant that generates descriptions for AI agents. Given the role and capabilities of an agent, create a concise and compelling description.

Role: {{{role}}}
Capabilities: {{{capabilities}}}

Description:`, 
});

const generateAgentDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAgentDescriptionFlow',
    inputSchema: AgentDescriptionInputSchema,
    outputSchema: AgentDescriptionOutputSchema,
  },
  async input => {
    const {output} = await generateAgentDescriptionPrompt(input);
    return output!;
  }
);
