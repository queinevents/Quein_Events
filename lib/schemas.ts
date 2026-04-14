import { z } from "zod";

/**
 * Contact Form Schema with 8 fields
 * Based on Quein blueprint requirements
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  eventType: z.enum(["private-events", "exhibitions", "conferences", "marriage-events", "other"], {
    required_error: "Please select an event type",
  }),
  eventDate: z.string().optional(),
  guestCount: z.string().optional(),
  hearAboutUs: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;
