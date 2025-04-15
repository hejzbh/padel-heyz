"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const MobileSidebar = ({ className = "" }: { className?: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={`oveflow-hidden ${className}`}>
      <button
        onClick={() => setOpen(true)}
        title="Open sidebar"
        className="p-1"
      >
        {" "}
        <RxHamburgerMenu className="text-text-secondary text-2xl" />
      </button>
      <aside
        className={`fixed top-0 right-0 w-full max-w-[80%] bottom-0 !z-[5000] bg-bg-primary p-5 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-[150%]"
        }`}
      >
        <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
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
          </div>

          <button title="Close" onClick={() => setOpen(false)}>
            <IoClose className="text-[30px] text-[red]" />
          </button>
        </div>

        <div onClick={() => setOpen(false)}>
          <NavLinks direction="col" className="justify-center items-center" />
        </div>
      </aside>
    </div>
  );
};

export default MobileSidebar;
