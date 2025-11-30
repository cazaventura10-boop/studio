'use server';

import { summarizeContent } from '@/ai/flows/summarize-content';
import { z } from 'zod';

const schema = z.object({
  content: z.string().optional(),
});

export async function getSummary(prevState: any, formData: FormData) {
  const unsafeInput = {
    content: formData.get('content'),
  };

  const validated = schema.safeParse(unsafeInput);
  if (!validated.success || !validated.data.content) {
    return { error: 'Invalid input.' };
  }

  // Strip HTML tags from content for better summarization
  const plainTextContent = validated.data.content.replace(/<[^>]*>?/gm, ' ');

  if (plainTextContent.trim().length < 50) {
      return { summary: "The content is too short to summarize." };
  }

  try {
    const result = await summarizeContent({ content: plainTextContent });
    return { summary: result.summary };
  } catch (e) {
    console.error(e);
    return { error: 'Failed to generate summary.' };
  }
}
