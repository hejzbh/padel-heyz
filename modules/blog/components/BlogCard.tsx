import Button from "@/components/ui/Button";
import { BlogType } from "@/types/blog";
import { truncStr } from "@/utils/truncString";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({
  blog,
  className,
}: {
  blog: BlogType;
  className?: string;
}) => {
  return (
    <Link
      href={`/blog/${blog.id}`}
      title={blog.title}
      className={`block  hover:md:translate-y-[-2%] active:opacity-50 hover:md:opacity-80 transition-all duration-300 ${className}`}
    >
      <Image
        loading="lazy"
        src={blog?.thumbnail || "/images/padel.webp"}
        width={350}
        height={500}
        alt="Blog"
        className="rounded-xl drop-shadow-sm w-full h-full max-h-[200px]"
      />
      <div className="min-h-[250px] md:min-h-[280px] p-3 bg-bg-primary mt-[-20px] relative rounded-t-3xl flex flex-col justify-between items-start">
        <div>
          <h2 className="text-text-title  text-[16px] md:text-[18px] lg:text-[20px] font-[500] uppercase">
            {truncStr(blog?.title, 65)}
          </h2>
          <p className="text-text-secondary mt-2 text-[14px] md:text-[15px]">
            {truncStr(blog?.shortDescription, 120)}
          </p>
        </div>

        <Button className="mt-5" variant="secondary">
          Read more
        </Button>
      </div>
    </Link>
  );
};

export default BlogCard;
