'use server';
/**
 * @fileOverview An AI agent that simulates customer interactions.
 * This flow can handle sales, support, and fulfillment scenarios.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Readable } from 'stream';

// Define schemas for tools
const GetOrderStatusInputSchema = z.object({
  orderId: z.string().describe('The ID of the order to check.'),
});

const GetOrderStatusOutputSchema = z.object({
  status: z.string().describe('The current status of the order (e.g., "shipped", "out for delivery", "delivered").'),
  estimatedDelivery: z.string().describe('The estimated delivery date.'),
  lastLocation: z.string().describe('The last known location of the package.'),
});

const ApplyDiscountInputSchema = z.object({
  orderId: z.string().describe('The order ID to apply the discount to.'),
  discountPercentage: z.number().describe('The percentage to discount.'),
});

const SendSubscriptionEmailInputSchema = z.object({
    email: z.string().describe("The user's email to send the subscription info to."),
});

const BookAppointmentInputSchema = z.object({
    date: z.string().describe('The requested date for the appointment in YYYY-MM-DD format.'),
    time: z.string().describe('The requested time for the appointment in HH:MM format.'),
    topic: z.string().describe('The topic of the appointment.'),
});

// Define tools
const getOrderStatus = ai.defineTool(
  {
    name: 'getOrderStatus',
    description: 'Gets the current status of a customer\'s order.',
    inputSchema: GetOrderStatusInputSchema,
    outputSchema: GetOrderStatusOutputSchema,
  },
  async ({ orderId }) => {
    console.log(`Checking status for order: ${orderId}`);
    // In a real app, this would call a fulfillment API
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
      description: 'Applies a discount to a given order ID for customer satisfaction.',
      inputSchema: ApplyDiscountInputSchema,
      outputSchema: z.boolean(),
    },
    async ({ orderId, discountPercentage }) => {
      console.log(`Applying ${discountPercentage}% discount to order ${orderId}`);
      // Real app would update this in a database/CRM
      return true;
    }
);

const sendSubscriptionEmail = ai.defineTool(
    {
        name: 'sendSubscriptionEmail',
        description: 'Sends an email to the user with details about the coffee subscription.',
        inputSchema: SendSubscriptionEmailInputSchema,
        outputSchema: z.boolean(),
    },
    async ({ email }) => {
        console.log(`Sending subscription details to ${email}`);
        return true;
    }
);

const bookAppointment = ai.defineTool(
    {
        name: 'bookAppointment',
        description: 'Books an appointment in the sales representatives calendar.',
        inputSchema: BookAppointmentInputSchema,
        outputSchema: z.string().describe("Confirmation message with the booked date and time."),
    },
    async ({ date, time, topic }) => {
        console.log(`Booking appointment for ${date} at ${time} about ${topic}`);
        // This is a placeholder for a real calendar API integration
        return `Appointment confirmed for ${date} at ${time}. A sales representative will call you.`;
    }
);


// Define the main flow input/output
const MessageSchema = z.object({
  role: z.enum(['user', 'agent']),
  text: z.string(),
});

const AgentResponseInputSchema = z.object({
  messages: z.array(MessageSchema).describe('The history of the conversation.'),
});

const AgentResponseOutputSchema = z.object({
  role: z.enum(['agent', 'tool']),
  text: z.string(),
});

export type AgentResponseInput = z.infer<typeof AgentResponseInputSchema>;
export type AgentResponseOutput = z.infer<typeof AgentResponseOutputSchema>;


const agentPrompt = ai.definePrompt({
    name: 'agentResponsePrompt',
    system: `You are VOXA, a highly advanced AI agent for a company that sells premium coffee. You are capable of handling customer support, sales, and fulfillment inquiries.

    Your personality is helpful, empathetic, and professional. When a customer is upset, be understanding and de-escalate.

    You have access to a set of tools to perform actions. When a user asks for information you don't have, use a tool. When you use a tool, the system will provide the result. You can then use that result to answer the user.

    After resolving a customer's primary issue, you should look for opportunities to upsell. Since this is a coffee company, a great default upsell is the coffee subscription service.

    Available tools:
    - getOrderStatus: Check the status of a customer's order.
    - applyDiscount: Apply a discount to an order to fix a customer problem.
    - sendSubscriptionEmail: Send details about the coffee subscription.
    - bookAppointment: Book a meeting with a sales rep.
    `,
    tools: [getOrderStatus, applyDiscount, sendSubscriptionEmail, bookAppointment],
});

export async function generateAgentResponse(input: AgentResponseInput) {
    const llmResponse = await ai.generate({
        prompt: input.messages.map(m => ({
            role: m.role === 'agent' ? 'model' : m.role,
            content: [{ text: m.text }],
        })),
        model: 'googleai/gemini-2.5-flash',
        config: {
            temperature: 0.3,
        },
        tools: [getOrderStatus, applyDiscount, sendSubscriptionEmail, bookAppointment],
    });

    const choices = llmResponse.choices;
    
    // Create a readable stream to send back to the client
    const stream = new ReadableStream({
        async start(controller) {
            for (const choice of choices) {
                if (choice.finishReason === 'toolCode') {
                    for(const toolRequest of choice.message.toolRequests) {
                        try {
                            const chunk = JSON.stringify({ role: 'tool', text: `ACTION: ${toolRequest.name}(${JSON.stringify(toolRequest.input)})`});
                            controller.enqueue(chunk);
                        } catch (e) {
                             console.warn("Could not stringify tool request chunk:", e);
                        }
                        
                        // Execute the tool and send the result back to the model
                        const toolResponse = await ai.runTool(toolRequest);

                        // Feed the tool response back into the model to get a natural language response
                         const finalResponse = await ai.generate({
                            prompt: [
                                ...input.messages.map(m => ({ role: m.role === 'agent' ? 'model' : m.role, content: [{ text: m.text }] })),
                                choice.message,
                                { role: 'tool', content: [{ data: toolResponse }] }
                            ],
                             model: 'googleai/gemini-2.5-flash',
                             config: {
                                temperature: 0.5,
                            },
                        });

                        const text = finalResponse.text;
                        if(text) {
                            try {
                                const chunk = JSON.stringify({ role: 'agent', text });
                                controller.enqueue(chunk);
                            } catch (e) {
                                console.warn("Could not stringify agent response chunk:", e);
                            }
                        }
                    }
                } else {
                    const text = choice.text;
                    if(text) {
                        try {
                           const chunk = JSON.stringify({ role: 'agent', text });
                           controller.enqueue(chunk);
                        } catch (e) {
                            console.warn("Could not stringify agent response chunk:", e);
                        }
                    }
                }
            }
            controller.close();
        },
    });

    return stream;
}
