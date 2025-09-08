// This is a server-side file.
'use server';

/**
 * @fileOverview AI-powered suggested matches flow.
 *
 * This file defines a Genkit flow that suggests potential matches to a user
 * based on their profile information, including location, academic interests,
 * and other shared interests.
 *
 * @exports {
 *   suggestMatches,
 *   SuggestedMatchesInput,
 *   SuggestedMatchesOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema for the suggestMatches function.
const SuggestedMatchesInputSchema = z.object({
  location: z
    .string()
    .describe('The current location of the user (e.g., city, campus).'),
  academicCompatibility: z
    .string()
    .describe('The academic interests of the user.'),
  sharedInterests: z
    .string()
    .describe('A comma separated list of the user\s interests.'),
  desiredNumberOfMatches: z
    .number()
    .default(5)
    .describe('The number of suggested matches to return.'),
  profileDescription: z.string().describe('A free text description of the user\s profile'),
});

export type SuggestedMatchesInput = z.infer<typeof SuggestedMatchesInputSchema>;

// Output schema for the suggestMatches function.
const SuggestedMatchesOutputSchema = z.object({
  matches: z
    .array(z.string())
    .describe(
      'A list of potential match profiles, with names and a short description.'
    ),
});

export type SuggestedMatchesOutput = z.infer<typeof SuggestedMatchesOutputSchema>;

const suggestMatchesPrompt = ai.definePrompt({
  name: 'suggestMatchesPrompt',
  input: {schema: SuggestedMatchesInputSchema},
  output: {schema: SuggestedMatchesOutputSchema},
  prompt: `You are an AI matchmaker for a college campus connecting app.

Based on the user's profile information, suggest {{desiredNumberOfMatches}} potential matches.

Profile Description: {{{profileDescription}}}

Location: {{{location}}}

Academic Interests: {{{academicCompatibility}}}

Shared Interests: {{{sharedInterests}}}

Format each match as a short string containing the user's name and a brief description, listing only their first name.
`,
});

// Genkit flow definition for suggesting matches.
const suggestMatchesFlow = ai.defineFlow(
  {
    name: 'suggestMatchesFlow',
    inputSchema: SuggestedMatchesInputSchema,
    outputSchema: SuggestedMatchesOutputSchema,
  },
  async input => {
    const {output} = await suggestMatchesPrompt(input);
    return output!;
  }
);

/**
 * Suggests potential matches to a user based on their profile information.
 * @param input - The input data for suggesting matches.
 * @returns A promise that resolves to the suggested matches.
 */
export async function suggestMatches(input: SuggestedMatchesInput): Promise<SuggestedMatchesOutput> {
  return suggestMatchesFlow(input);
}
