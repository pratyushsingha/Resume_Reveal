import { z } from "zod";

export const reviewSchema = z.object({
  worth: z.string(),
  skills: z.object({
    technical_skills: z.array(z.string()),
    soft_skills: z.array(z.string()),
    domain_specific_skills: z.array(z.string()),
  }),
  keyFactors: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  actionableAdvice: z.array(z.string()),
});
