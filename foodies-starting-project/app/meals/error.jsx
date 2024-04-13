"use client";

export default function MealsError({ error }) {
  return (
    <main className="error">
      <h1>An Error Occured!</h1>
      <p style={{ color: "white" }}>{error.message}</p>
    </main>
  );
}
