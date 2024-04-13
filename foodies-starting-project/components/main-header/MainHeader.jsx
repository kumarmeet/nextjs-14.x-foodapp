import Image from "next/image";
import Link from "next/link";
import logoImage from "@/assets/logo.png";
import classes from "@/components/main-header/MainHeader.module.css";
import { HeaderBackground } from "./MainHeaderBackground";
import { NavLink } from "./NavLink";

export const MainHeader = () => {
  return (
    <>
      <HeaderBackground />

      <header className={classes.header}>
        <Link
          className={classes.logo}
          href={"/"}
        >
          <Image
            src={logoImage}
            alt="NextLevel Food Logo"
            width={100}
            height={100}
          />
          Next Level Food
        </Link>

        <NavLink />
      </header>
    </>
  );
};
