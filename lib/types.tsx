import { z } from "zod";

export type ServiceData = {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  imagePath: string;
  skills: { name: string }[];
  iconColor: string;
  category: string;
};

export type ServicesDataMap = {
  [key: string]: ServiceData;
};

export const sendEmailSchema = z.object({
  name: z
    .string()
    .min(1, "Required!")
    .min(3, "Name must be at least 3 characters long!"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Required!")
    .min(3, "Email must be at least 3 characters long!")
    .email("Invalid email address!"),

  mobile: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters long!")
    .max(15, "Phone number must be at most 15 characters long!")
    .regex(/^\+?\d+$/, "Phone number must contain only digits!")
    .optional()
    .or(z.literal("")),

  textarea: z
    .string()
    .trim()
    .min(1, { message: "Required!" })
    .min(5, { message: "Message should be longer than 5 characters long!" }),
});

export type TSendEmailSchema = z.infer<typeof sendEmailSchema>;
