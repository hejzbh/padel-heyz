import getBlogs from "@/actions/getBlogs";
import Separator from "@/components/ui/Separator";
import BlogList from "@/modules/blog/components/BlogList";
import { unstable_cache } from "next/cache";
import React from "react";

const getBlogData = unstable_cache(
  async (searchParams: BlogSearchParams) => {
    const { blogs, pagination } = await getBlogs({
      page: searchParams?.page,
      perPage: 8,
    });

    return {
      blogs,
      pagination,
    };
  },
  ["blog_data"],
  {
    revalidate: 1, // 1 hour cache TODO
  }
);

interface Props {
  searchParams: Promise<BlogSearchParams>;
}

export type BlogSearchParams = { page?: string };

const BlogPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const { blogs, pagination } = await getBlogData(searchParams);

  return (
    <div className="container mx-auto p-2">
      <section>
        <h1 className="text-[1.8rem] mt-10 sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] text-text-primary text-center">
          All About Padel: News, Tips & Inspiration
        </h1>
        <p className="text-text-secondary mb-10 text-center">
          Whether you're a beginner or a pro, find everything you need to
          elevate your game
        </p>
        <Separator />
      </section>

      <BlogList
        blogs={blogs}
        searchParams={searchParams}
        pagination={pagination}
        className="my-10"
      />
    </div>
  );
};

export default BlogPage;
