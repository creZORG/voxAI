'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Tool: Check Calendar Availability
export const checkCalendarAvailability = ai.defineTool(
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
    console.log(`Checking calendar availability for ${input.date} at ${input.time}`);
    // In a real app, this would connect to a calendar API.
    // Let's pretend some slots are busy.
    return !input.time.startsWith('14:'); // e.g., 2 PM is always busy.
  }
);

// Tool: Update CRM Record
export const updateCrmRecord = ai.defineTool(
  {
    name: 'updateCrmRecord',
    description: 'Updates a CRM record with new information.',
    inputSchema: z.object({
      recordId: z.string().describe('The ID of the CRM record to update.'),
      field: z.string().describe('The field to update.'),
      value: z.string().describe('The new value for the field.'),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    console.log(`Updating CRM record ${input.recordId}: ${input.field} = ${input.value}`);
    // In a real app, this would connect to a CRM API.
    return {
      success: true,
      message: `CRM record ${input.recordId} updated successfully.`
    };
  }
);

// Tool: Book Appointment
export const bookAppointment = ai.defineTool(
  {
    name: 'bookAppointment',
    description: 'Books an appointment in the calendar.',
    inputSchema: z.object({
      date: z.string().describe('The date for the appointment (YYYY-MM-DD).'),
      time: z.string().describe('The time for the appointment (HH:MM).'),
      attendeeName: z.string().describe("The name of the person attending."),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      confirmationId: z.string().optional(),
    }),
  },
  async (input) => {
    console.log(`Booking appointment for ${input.attendeeName} on ${input.date} at ${input.time}`);
    // In a real app, this would connect to a calendar API.
    return {
      success: true,
      confirmationId: `CONF-${Date.now()}`
    };
  }
);

// Tool: Send Subscription Email
export const sendSubscriptionEmail = ai.defineTool(
  {
    name: 'sendSubscriptionEmail',
    description: 'Sends an email with details about the coffee subscription.',
    inputSchema: z.object({
      email: z.string().email().describe("The recipient's email address."),
    }),
    outputSchema: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  async (input) => {
    console.log(`Sending subscription email to ${input.email}`);
    // In a real app, this would connect to an email service.
    return {
      success: true,
      message: `Subscription details sent to ${input.email}.`
    };
  }
);
