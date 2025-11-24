'use server';
/**
 * @fileOverview An AI agent that simulates customer interactions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Readable } from 'stream';

// ─────────────────────────────
// SCHEMAS
// ─────────────────────────────

const GetOrderStatusInputSchema = z.object({
  orderId: z.string(),
});

const GetOrderStatusOutputSchema = z.object({
  status: z.string(),
  estimatedDelivery: z.string(),
  lastLocation: z.string(),
});

const ApplyDiscountInputSchema = z.object({
  orderId: z.string(),
  discountPercentage: z.number(),
});

const SendSubscriptionEmailInputSchema = z.object({
  email: z.string(),
});

const BookAppointmentInputSchema = z.object({
  date: z.string(),
  time: z.string(),
  topic: z.string(),
});

// ─────────────────────────────
// TOOLS
// ─────────────────────────────

const getOrderStatus = ai.defineTool(
  {
    name: 'getOrderStatus',
    description: 'Gets current order status.',
    inputSchema: GetOrderStatusInputSchema,
    outputSchema: GetOrderStatusOutputSchema,
  },
  async ({ orderId }) => {
    if (orderId === '1842') {
      return {
        status: 'Out for Delivery',
        estimatedDelivery: 'Today',
        lastLocation: 'Local distribution center',
      };
    }
    return {
      status: 'Shipped',
      estimatedDelivery: 'Tomorrow',
      lastLocation: 'Main warehouse',
    };
  }
);

const applyDiscount = ai.defineTool(
  {
    name: 'applyDiscount',
    description: 'Applies a discount.',
    inputSchema: ApplyDiscountInputSchema,
    outputSchema: z.boolean(),
  },
  async () => true
);

const sendSubscriptionEmail = ai.defineTool(
  {
    name: 'sendSubscriptionEmail',
    description: 'Email the subscription details.',
    inputSchema: SendSubscriptionEmailInputSchema,
    outputSchema: z.boolean(),
  },
  async () => true
);

const bookAppointment = ai.defineTool(
  {
    name: 'bookAppointment',
    description: 'Books a meeting.',
    inputSchema: BookAppointmentInputSchema,
    outputSchema: z.string(),
  },
  async ({ date, time }) =>
    `Appointment confirmed for ${date} at ${time}.`
);

// ─────────────────────────────
// PROMPT
// ─────────────────────────────

const agentPrompt = ai.definePrompt({
  name: 'agentResponsePrompt',
  system: `
    You are VOXA, a professional, empathetic support agent.
    You resolve issues and then upsell coffee subscriptions.
  `,
  tools: [getOrderStatus, applyDiscount, sendSubscriptionEmail, bookAppointment],
});

// ─────────────────────────────
// INTERFACE TYPES
// ─────────────────────────────

const MessageSchema = z.object({
  role: z.enum(['user', 'agent']),
  text: z.string(),
});

export type AgentResponseInput = {
  messages: z.infer<typeof MessageSchema>[];
};


// ─────────────────────────────
// MAIN FUNCTION
// ─────────────────────────────

export async function generateAgentResponse(input: AgentResponseInput) {

  // Initial call to LLM
  const llmResponse = await ai.generate({
    prompt: input.messages.map(m => ({
      role: m.role === 'agent' ? 'model' : m.role,
      content: [{ text: m.text }],
    })),
    model: 'googleai/gemini-2.5-flash',
    config: { temperature: 0.3 },
    tools: [getOrderStatus, applyDiscount, sendSubscriptionEmail, bookAppointment],
  });

  const choices = llmResponse.choices;

  // STREAM
  const stream = new ReadableStream({
    async start(controller) {

      for (const choice of choices) {

        // TOOL REQUEST
        if (choice.finishReason === 'toolCode') {
          for (const toolRequest of choice.message.toolRequests) {

            // Emit action
            controller.enqueue(JSON.stringify({
              role: 'tool',
              text: `ACTION: ${toolRequest.name}(${JSON.stringify(toolRequest.input)})`
            }));

            const toolResult = await ai.runTool(toolRequest);

            // Follow-up call
            const finalResponse = await ai.generate({
              prompt: [
                  ...input.messages.map(m => ({
                    role: m.role === 'agent' ? 'model' : m.role,
                    content: [{ text: m.text }]
                  })),
                  choice.message,
                  {
                    role: 'tool',
                    content: [{ text: JSON.stringify(toolResult) }]
                  },
              ],
              model: 'googleai/gemini-2.5-flash',
              config: { temperature: 0.5 }
            });

            controller.enqueue(JSON.stringify({
              role: 'agent',
              text: finalResponse.text
            }));
          }

        // NORMAL COMPLETION
        } else {
          controller.enqueue(JSON.stringify({
            role: 'agent',
            text: choice.text
          }));
        }

      }

      controller.close();
    }
  });

  return stream;
}
