'use server';

/**
 * @fileOverview Verifies if a user's profile photos are genuine using AI.
 *
 * - aiPhotoVerification - A function that initiates the photo verification process.
 * - AIPhotoVerificationInput - The input type for the aiPhotoVerification function.
 * - AIPhotoVerificationOutput - The return type for the aiPhotoVerification function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPhotoVerificationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of the user, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type AIPhotoVerificationInput = z.infer<typeof AIPhotoVerificationInputSchema>;

const AIPhotoVerificationOutputSchema = z.object({
  isGenuine: z
    .boolean()
    .describe('Whether the photo appears to be of the user and genuine.'),
  confidence: z
    .number()
    .describe('A confidence score (0-1) representing the certainty of the verification.'),
  reason: z
    .string()
    .optional()
    .describe('The reason why the photo is not genuine (if applicable).'),
});
export type AIPhotoVerificationOutput = z.infer<typeof AIPhotoVerificationOutputSchema>;

export async function aiPhotoVerification(
  input: AIPhotoVerificationInput
): Promise<AIPhotoVerificationOutput> {
  return aiPhotoVerificationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPhotoVerificationPrompt',
  input: {schema: AIPhotoVerificationInputSchema},
  output: {schema: AIPhotoVerificationOutputSchema},
  prompt: `You are an AI-powered tool that specializes in verifying the authenticity of user profile photos.

You will receive a photo and your task is to determine whether the photo is a genuine picture of the user.
Consider factors such as photo quality, consistency with typical user photos, and any signs of manipulation.

Respond with a JSON output indicating whether the photo is genuine (isGenuine: boolean), a confidence score (confidence: number between 0 and 1), and, if not genuine, a reason (reason: string).

Photo: {{media url=photoDataUri}}
`,
});

const aiPhotoVerificationFlow = ai.defineFlow(
  {
    name: 'aiPhotoVerificationFlow',
    inputSchema: AIPhotoVerificationInputSchema,
    outputSchema: AIPhotoVerificationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
