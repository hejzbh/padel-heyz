"use client";
import { CourtType } from "@/types/courts";
import React from "react";
import { PiMapPinSimpleAreaLight } from "react-icons/pi";
import { RiDirectionLine } from "react-icons/ri";
import { CiCircleInfo } from "react-icons/ci";
import { useMapControls } from "@/modules/map/components/providers/MapControlsProvider";
import openGoogleMaps from "@/utils/openGoogleMaps";
import { useModal } from "@/hooks/use-modal";

interface Props {
  court: CourtType;
  className?: string;
}

const CourtCardControls = ({ court, className = "" }: Props) => {
  const { zoomIn } = useMapControls();
  const { openModal } = useModal();

  return (
    <div
      className={`grid grid-cols-3 items-start gap-[2px] md:gap-3 ${className}`}
    >
      {/** Zoom in map */}
      <div
        title="Zoom in map"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          zoomIn([court.lat, court.lon], 16);
        }}
        className="flex flex-col justify-center items-center text-center group transition active:opacity-50"
      >
        <PiMapPinSimpleAreaLight className="text-[20px] mb-1 md:text-[32px] text-[#828282]/80 transition group-hover:md:text-primary/80" />
        <span className="text-[10px] md:text-[13px] text-text-primary group-hover:md:text-primary">
          Zoom
        </span>
      </div>
      {/** More Info */}
      <div
        title="More Info"
        onClick={() => openModal("courtDetails", court)}
        className="flex flex-col justify-center items-center text-center group active:opacity-50"
      >
        <CiCircleInfo className="text-[20px] md:text-[32px] mb-1 text-[#828282]/80 transition group-hover:md:text-primary/80" />
        <span className="text-[10px] md:text-[13px] text-text-primary group-hover:md:text-primary">
          Info
        </span>
      </div>
      {/** Get directions */}
      <div
        title="Google maps directions"
        onClick={() => openGoogleMaps(court.lat, court.lon)}
        className="flex flex-col justify-center items-center text-center group active:opacity-50"
      >
        <RiDirectionLine className="text-[20px] md:text-[32px] mb-1 text-[#828282]/80 transition font-[400] group-hover:md:text-primary/80" />
        <span className="text-[10px] md:text-[13px] text-text-primary group-hover:md:text-primary">
          Navigate
        </span>
      </div>
    </div>
  );
};

export default CourtCardControls;
