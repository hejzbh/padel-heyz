import { CourtFormDataType, CourtType } from "@/types/courts";
import axios from "axios";

export async function addCourt(courtData: CourtFormDataType) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/court`,
      courtData,
      {
        headers: {
          "x-admin-key": prompt("What is a password of admin panel?"),
        },
      }
    );

    return response?.data as {
      message: string;
      data: CourtType;
      success: boolean;
    };
  } catch (err: any) {
    throw new Error(err?.response?.data?.error);
  }
}
