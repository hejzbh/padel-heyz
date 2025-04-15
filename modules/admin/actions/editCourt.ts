import { CourtFormDataType, CourtType } from "@/types/courts";
import axios from "axios";

export async function editCourt(
  id: string | number,
  courtData: CourtFormDataType
) {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/court/${id}`,
      {
        title: courtData?.title,
        description: courtData?.description,
        image: courtData?.image,
        moreInfo: courtData?.moreInfo,
        featured: courtData?.featured,
        lat: courtData.lat,
        lon: courtData.lon,
      },
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
