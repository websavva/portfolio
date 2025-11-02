import { z } from 'zod';

export const ContactDto = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(100),
  company: z.string().min(1).max(100),
  message: z.string().min(1).max(5e3),
});

export type ContactDto = z.infer<typeof ContactDto>;
