import { BlogType } from "@/types/blog";
import axios from "axios";

export async function getBlogs({
  page,
  perPage,
  title,
}: {
  page?: string | number;
  perPage?: string | number;
  title?: string;
}) {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/blog", {
    params: {
      page,
      perPage,
      title,
    },
  });

  return {
    blogs: response?.data?.data as BlogType[],
    pagination: response?.data?.pagination,
  };
}

export default getBlogs;
