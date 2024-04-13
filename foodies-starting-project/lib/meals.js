import fs from "fs"
import crypto from "crypto"
import sql from "better-sqlite3"
import slugify from "slugify";
import xss from "xss";
import { uploadOnCloudinary } from "@/utils/cloudinary";

const db = sql('meals.db')

export async function getMeals() {
  await new Promise(resolve => setTimeout(resolve, 2000))

  // throw new Error('Loading meals failed!')

  const meals = db.prepare(`SELECT * FROM meals`).all();
  return meals
}

export async function getMeal(slug) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  const meal = db.prepare(`SELECT * FROM meals where slug = ?`).get(slug);
  return meal
}

export async function saveMeal(meal) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  const fileExtension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}-${crypto.randomUUID()}.${fileExtension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`)
  const bufferedImage = await meal.image.arrayBuffer()

  stream.write(Buffer.from(bufferedImage), async (error) => {
    if (error) {
      throw new Error("Saving image failed!")
    }

    meal.image = `/images/${filename}`

    const response = await uploadOnCloudinary(`public/images/${filename}`)

    meal.image = response.url

    db.prepare(`
      INSERT INTO meals (title, slug, image, summary, instructions, creator, creator_email) 
      VALUES (
        @title,
        @slug,
        @image,
        @summary,
        @instructions,
        @creator,
        @creator_email
      )
    `).run(meal);
  })
}