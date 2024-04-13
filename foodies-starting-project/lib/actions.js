"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const shareMealSchema = z.object({
  creator: z.string().trim().min(1, "Please enter your name"),
  creator_email: z.string().trim().email("Please enter a valid email"),
  title: z.string().trim().min(1, "Please enter a title"),
  summary: z.string().trim().min(1, "Please enter a summary"),
  instructions: z.string().trim().min(1, "Please enter instructions"),
  // image: z.string().trim().min(1, "Please enter an image"),
});

export const shareMeal = async (prevState, formData) => {
  "use server";

  const validateShareMealFields = shareMealSchema.safeParse({
    title: formData.get("title"),
    // image: formData.get("image").name,
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  });

  if (!validateShareMealFields.success) {
    const { errors } = validateShareMealFields.error

    return {
      message: errors[0].message
    };
  }

  const meals = {
    ...validateShareMealFields.data,
    image: formData.get("image")
  }

  await saveMeal(meals);

  revalidatePath("/meals");

  redirect("/meals");
};