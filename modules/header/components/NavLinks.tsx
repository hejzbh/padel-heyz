"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "mailto:hazimtulumovic.careers@gmail.com", label: "Contact" },
];

const NavLinks = ({
  direction = "row",
  className = "",
}: {
  className?: string;
  direction?: "row" | "col";
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={`flex ${className} ${
        direction === "col" ? "flex-col gap-1" : "flex-row gap-4"
      } `}
    >
      {NAV_LINKS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`px-4 py-2 rounded-md transition-colors ${
            pathname === href
              ? "text-primary"
              : "text-text-secondary hover:bg-primary/20 hover:text-primary"
          }`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
