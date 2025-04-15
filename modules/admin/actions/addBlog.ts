import { BlogFormDataType, BlogType } from "@/types/blog";
import axios from "axios";

export async function addBlog(blogData: BlogFormDataType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/blog`,
      blogData,
      {
        headers: {
          "x-admin-key": prompt("What is a password of admin panel?"),
        },
      }
    );

    return response?.data as {
      message: string;
      data: BlogType;
      success: boolean;
    };
  } catch (err: any) {
    throw new Error(err?.response?.data?.error);
  }
}
