import axios from "axios";

export async function deleteBlog(id: string | number) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,

      {
        headers: {
          "x-admin-key": prompt("What is a password of admin panel?"),
        },
      }
    );

    return response?.data as { success: boolean; message: string };
  } catch (err: any) {
    throw new Error(err?.response?.data?.error);
  }
}
