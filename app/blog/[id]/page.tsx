import { BlogType } from "@/types/blog";
import axios from "axios";
import Image from "next/image";
import React from "react";

async function getBlogDetails(id: number | string) {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/blog/" + id
  );

  return response?.data?.data;
}

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const blogDetails: BlogType = await getBlogDetails(id);

  return (
    <div className="py-10">
      <div className="relative">
        <div
          style={{ backdropFilter: "blur(3px)" }}
          className="bg-black/50 absolute top-0 left-0 w-full h-full rounded-b-3xl"
        ></div>
        <Image
          loading="eager"
          src={blogDetails?.thumbnail || "/images/padel.webp"}
          width={1920}
          height={500}
          alt="Blog"
          className="w-full h-full max-h-[385px]  md:max-h-[370px] object-cover rounded-b-3xl"
        />

        <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] w-full p-5 text-white text-[23px] md:text-[40px] xl:text-[50px] font-semibold text-center">
          {blogDetails?.title}
        </h1>
      </div>
      <main
        className="container mx-auto text-text-primary blog px-2 mt-7"
        dangerouslySetInnerHTML={{
          __html: blogDetails.richTextContent,
        }}
      ></main>
    </div>
  );
};

export default BlogDetailsPage;
