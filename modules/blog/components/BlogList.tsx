import { BlogSearchParams } from "@/app/blog/page";
import Pagination from "@/components/Pagination";
import { BlogType } from "@/types/blog";
import { PaginationType } from "@/types/pagination";
import React from "react";
import BlogCard from "./BlogCard";
import Separator from "@/components/ui/Separator";

interface Props {
  searchParams: BlogSearchParams;
  blogs: BlogType[];
  className?: string;
  pagination: PaginationType;
}

const BlogList = ({
  searchParams,
  blogs,
  className = "",
  pagination,
}: Props) => {
  return (
    <div className={`${className}`}>
      <p className="text-text-primary text-lg md:text-2xl">
        {pagination?.countItems}{" "}
        {pagination?.countItems === 1 ? "Result" : "Results"}
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-5 gap-10">
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
      <Separator className="mt-8" />
      <Pagination
        searchParams={searchParams}
        {...pagination}
        className="mt-10"
      />
    </div>
  );
};

export default BlogList;
