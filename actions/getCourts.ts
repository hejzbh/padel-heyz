import { CourtType } from "@/types/courts";
import { PaginationType } from "@/types/pagination";
import axios from "axios";

export async function getCourts({
  page,
  perPage,
  boundingbox,
  title,
}: {
  page?: string | number;
  perPage?: string | number;
  boundingbox?: string;
  title?: string;
}) {
  const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/court", {
    params: {
      page,
      perPage,
      boundingbox,
      title,
    },
  });

  return {
    courts: response?.data?.data as CourtType[],
    pagination: response?.data?.pagination as PaginationType,
  };
}

export default getCourts;
