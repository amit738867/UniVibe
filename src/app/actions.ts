// This is a server-side file.
'use server';

import {
  aiPhotoVerification,
  type AIPhotoVerificationInput,
  type AIPhotoVerificationOutput,
} from '@/ai/flows/ai-photo-verification';
import {
  suggestMatches,
  type SuggestedMatchesInput,
  type SuggestedMatchesOutput,
} from '@/ai/flows/ai-suggested-matches';

export async function verifyPhotoAction(
  input: AIPhotoVerificationInput
): Promise<AIPhotoVerificationOutput> {
  // In a real application, you would add authentication and authorization checks here.
  console.log('Verifying photo for user...');
  try {
    const result = await aiPhotoVerification(input);
    return result;
  } catch (error) {
    console.error('Error in verifyPhotoAction:', error);
    // Return a structured error response
    return {
      isGenuine: false,
      confidence: 0,
      reason: 'An unexpected error occurred during verification.',
    };
  }
}

export async function suggestMatchesAction(
  input: SuggestedMatchesInput
): Promise<SuggestedMatchesOutput> {
  // In a real application, you would add authentication and authorization checks here.
  console.log('Suggesting matches for user...');
  try {
    const result = await suggestMatches(input);
    return result;
  } catch (error) {
    console.error('Error in suggestMatchesAction:', error);
    return {
      matches: [],
    };
  }
}
