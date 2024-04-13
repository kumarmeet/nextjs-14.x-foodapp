"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "@/components/main-header/NavLink.module.css";

export const NavLink = () => {
  const path = usePathname();

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link
            href="/meals"
            className={path.startsWith("/meals") ? classes.active : ""}
          >
            Meals
          </Link>
        </li>
        <li>
          <Link
            href="/community"
            className={path.startsWith("/community") ? classes.active : ""}
          >
            Community
          </Link>
        </li>
      </ul>
    </nav>
  );
};
