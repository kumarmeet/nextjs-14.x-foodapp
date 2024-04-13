import { notFound } from "next/navigation";
import Image from "next/image";
import classes from "./page.module.css";
import { getMeal } from "@/lib/meals";

export async function generateMetadata({ params }) {
  const meal = await getMeal(params.slug);

  if (!meal) {
    notFound(); // check closest not found page
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default async function MealsDetails({ params, searchParams }) {
  const { slug } = params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound(); // check closest not found page
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br/>");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={meal.image}
            fill
          />
        </div>

        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            {" "}
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        >
          {/* {meal.instructions} */}
        </p>
      </main>
    </>
  );
}
