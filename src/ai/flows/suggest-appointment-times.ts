'use server';

/**
 * @fileOverview An AI agent for suggesting optimal appointment times between students and teachers.
 *
 * - suggestAppointmentTimes - A function that suggests appointment times.
 * - SuggestAppointmentTimesInput - The input type for the suggestAppointmentTimes function.
 * - SuggestAppointmentTimesOutput - The return type for the suggestAppointmentTimes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAppointmentTimesInputSchema = z.object({
  teacherAvailability: z
    .string()
    .describe(
      'The teacher availability schedule, formatted as a JSON string.  Each key represents the day of the week, and the value is an array of available time slots.'
    ),
  studentPreferences: z
    .string()
    .describe(
      'The student preferences for appointment times, formatted as a JSON string.  Include preferred days and times.'
    ),
  appointmentDuration: z
    .number()
    .describe('The desired duration of the appointment in minutes.'),
});
export type SuggestAppointmentTimesInput = z.infer<
  typeof SuggestAppointmentTimesInputSchema
>;

const SuggestAppointmentTimesOutputSchema = z.object({
  suggestedTimes: z
    .array(z.string())
    .describe(
      'An array of suggested appointment times, formatted as strings (e.g., YYYY-MM-DD HH:mm).'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the suggested times are optimal based on student preferences and teacher availability.'
    ),
});
export type SuggestAppointmentTimesOutput = z.infer<
  typeof SuggestAppointmentTimesOutputSchema
>;

export async function suggestAppointmentTimes(
  input: SuggestAppointmentTimesInput
): Promise<SuggestAppointmentTimesOutput> {
  return suggestAppointmentTimesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAppointmentTimesPrompt',
  input: {schema: SuggestAppointmentTimesInputSchema},
  output: {schema: SuggestAppointmentTimesOutputSchema},
  prompt: `You are an AI assistant that suggests optimal appointment times for students and teachers.

  Consider the teacher's availability and the student's preferences to find the best possible times.

  Teacher Availability: {{{teacherAvailability}}}
  Student Preferences: {{{studentPreferences}}}
  Appointment Duration: {{{appointmentDuration}}} minutes

  Suggest a few appointment times that work for both the student and the teacher, and explain your reasoning.
  Format the suggested times as YYYY-MM-DD HH:mm.
  Make sure that the generated suggested times take into consideration appointment duration.
  Make sure to only generate suggested times that occur during available hours in the teacher availability schedule.
  `,
});

const suggestAppointmentTimesFlow = ai.defineFlow(
  {
    name: 'suggestAppointmentTimesFlow',
    inputSchema: SuggestAppointmentTimesInputSchema,
    outputSchema: SuggestAppointmentTimesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
