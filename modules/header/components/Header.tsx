import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavLinks from "./NavLinks";
import ThemeToggler from "./ThemeToggler";
import dynamic from "next/dynamic";

const MobileSidebar = dynamic(() => import("./MobileSidebar"));

interface Props {
  className?: string;
}

const Header = ({ className = "" }: Props) => {
  return (
    <header
      className={`bg-bg-header flex items-center max-w-[97%] w-full md:container !mx-auto justify-between border-[1px] border-border-primary rounded-[45px] mt-3 md:m-5 px-6 md:px-10 py-2 ${className}`}
    >
      {/** Logo */}
      <Link
        href={"/"}
        title="Home"
        className="flex items-center space-x-2 active:opacity-40 transition flex-[1]"
      >
        <Image
          src={"/images/logo.webp"}
          width={60}
          height={80}
          alt="Padel logo"
          loading="lazy"
          className="w-full max-w-[45px] md:max-w-[60px]"
        />
        <p className="font-semibold text-text-primary text-lg md:text-3xl uppercase">
          Padel
        </p>
      </Link>
      {/** Links */}
      <NavLinks className="hidden md:flex flex-[2] justify-center" />
      {/** Dark mode toggler */}
      <div className="flex-[1] justify-end items-center space-x-1 flex">
        {" "}
        <ThemeToggler />
        <MobileSidebar className="block md:hidden" />
      </div>
    </header>
  );
};

export default Header;
