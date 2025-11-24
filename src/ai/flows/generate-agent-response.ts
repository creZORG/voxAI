'use server';

/**
 * @fileOverview A streaming AI agent that can use tools to respond to user input.
 *
 * - generateAgentResponse - A function that streams the agent's response.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  checkCalendarAvailability,
  updateCrmRecord,
  bookAppointment,
  sendSubscriptionEmail,
} from '@/ai/tools';
import { Message } from 'genkit/experimental/ai';

// Define the input schema for a single message
const MessageSchema = z.object({
  role: z.enum(['user', 'agent']),
  text: z.string(),
});

// Define the input schema for the flow
const AgentResponseInputSchema = z.object({
  messages: z.array(MessageSchema),
});
type AgentResponseInput = z.infer<typeof AgentResponseInputSchema>;


// The main function that generates the agent's response as a stream
export async function generateAgentResponse(
  input: AgentResponseInput
): Promise<ReadableStream<Uint8Array>> {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const send = (data: object) => {
        controller.enqueue(encoder.encode(JSON.stringify(data)));
      };

      try {
        // 1. Initial call to the model with conversation history and tools
        const llmResponse = await ai.generate({
          prompt: input.messages.map(m => ({
            role: m.role === 'agent' ? 'model' : 'user',
            content: [{ text: m.text }],
          })),
          model: 'googleai/gemini-2.5-flash',
          config: {
            temperature: 0.3,
          },
          tools: [
            checkCalendarAvailability,
            updateCrmRecord,
            bookAppointment,
            sendSubscriptionEmail,
          ],
        });

        let choice = llmResponse.choices[0];

        // 2. Loop to handle potential tool calls
        while (choice.finishReason === 'toolCode') {
          const toolCalls = choice.message.toolCalls;
          if (!toolCalls) {
            break; // Should not happen if finishReason is toolCode
          }

          const toolResponses: any[] = [];

          for (const toolCall of toolCalls) {
            const toolName = toolCall.toolName;
            const args = toolCall.args || {};

            send({ role: 'tool', text: `Calling tool: ${toolName} with args: ${JSON.stringify(args)}` });
            
            let toolResponse;
            try {
              switch (toolName) {
                case 'checkCalendarAvailability':
                  toolResponse = await checkCalendarAvailability.run(args as any);
                  break;
                case 'updateCrmRecord':
                  toolResponse = await updateCrmRecord.run(args as any);
                  break;
                case 'bookAppointment':
                  toolResponse = await bookAppointment.run(args as any);
                  break;
                case 'sendSubscriptionEmail':
                  toolResponse = await sendSubscriptionEmail.run(args as any);
                  break;
                default:
                  throw new Error(`Unknown tool: ${toolName}`);
              }

              toolResponses.push({
                toolCall,
                data: toolResponse,
              });

            } catch (error) {
               toolResponses.push({
                toolCall,
                data: { error: error instanceof Error ? error.message : String(error) },
              });
            }
          }

          // 3. Call the model AGAIN with the tool responses
          const followUpResponse = await ai.generate({
            prompt: [
              ...input.messages.map(m => ({
                role: m.role === 'agent' ? 'model' : 'user',
                content: [{ text: m.text }],
              }) as Message),
              choice.message, // Include the model's previous message that requested the tool call
              {
                role: 'tool',
                content: toolResponses.map(tr => ({
                  toolResponse: {
                    toolCall: tr.toolCall,
                    data: tr.data,
                  }
                }))
              },
            ],
            model: 'googleai/gemini-2.5-flash',
            config: {
              temperature: 0.5,
            },
          });
          
          choice = followUpResponse.choices[0];
        }

        // 4. Stream the final text response
        const finalAnswer = choice.text;
        if (finalAnswer) {
          // Stream word by word for a better UX
          const words = finalAnswer.split(/(\s+)/);
          for (const word of words) {
            send({ role: 'agent', text: word });
            await new Promise(resolve => setTimeout(resolve, 50)); // Small delay between words
          }
        }

      } catch (err) {
        console.error('Error in generateAgentResponse stream:', err);
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        send({ role: 'error', text: errorMessage });
      } finally {
        controller.close();
      }
    },
  });

  return stream;
}
