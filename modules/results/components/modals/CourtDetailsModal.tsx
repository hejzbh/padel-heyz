import { useModal } from "@/hooks/use-modal";
import { CourtType } from "@/types/courts";
import openGoogleMaps from "@/utils/openGoogleMaps";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiDirectionLine } from "react-icons/ri";

const CourtDetailsModal = () => {
  const { data } = useModal();

  if (!data) return null;
  return (
    <div>
      <Image
        loading="eager"
        quality={60}
        width={768}
        height={600}
        alt="Modal image"
        src={(data as CourtType)?.image || "/images/court.webp"}
        className="w-full max-h-[250px] object-cover rounded-3xl"
      />

      <div className="mt-3">
        <span className="text-[13px] md:text-sm text-text-secondary uppercase">
          Title
        </span>
        <p className="text-base md:text-lg text-text-title mb-4">
          {(data as CourtType)?.title}
        </p>

        <span className="text-[13px] md:text-sm text-text-secondary uppercase">
          Description
        </span>
        <p className="text-base md:text-lg text-text-title mb-4">
          {(data as CourtType)?.description || "No description"}
        </p>

        <div className="mb-4">
          <span className="text-[13px] md:text-sm text-text-secondary uppercase block">
            More information at:
          </span>
          <Link
            href={
              (data as CourtType)?.moreInfo?.startsWith("http")
                ? (data as CourtType)?.moreInfo
                : `https://${(data as CourtType)?.moreInfo}`
            }
            title={"Check more information"}
            className="text-base md:text-lg text-[#006ab0] underline"
          >
            {(data as CourtType)?.moreInfo}
          </Link>
        </div>

        <span className="text-[13px] md:text-sm text-text-secondary uppercase">
          Directions on google map
        </span>
        <div
          onClick={() =>
            openGoogleMaps((data as CourtType).lat, (data as CourtType).lon)
          }
          className="flex flex-col justify-center items-center max-w-fit mt-2 text-center group cursor-pointer active:opacity-50"
        >
          <RiDirectionLine className="text-[27px] md:text-[32px] mb-1 text-[#828282]/80 transition font-[400] group-hover:md:text-primary/80" />
          <span className="text-[13px] text-text-primary group-hover:md:text-primary">
            Navigate
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourtDetailsModal;
