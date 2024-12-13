import { z } from "zod";

export const cardNumberSchema = z.object({
  cardNumber: z
    .string()
    .min(4, "Card number must be at least 4 digits long")
    .regex(/^\d+$/, "Card number must contain numbers only"),
});

export const cardValiditySchema = z.object({
  validity_start: z.string(),
  validity_end: z.string(),
});

export type CardValidity = z.infer<typeof cardValiditySchema>;

export const cardStateSchema = z.object({
  state_id: z.number(),
  state_description: z.string(),
});

export type CardState = z.infer<typeof cardStateSchema>;
