import { CourtType } from "@/types/courts";
import React from "react";
import Image from "next/image";
import { truncStr } from "@/utils/truncString";
import CourtCardControls from "./CourtCardControls";
import dynamic from "next/dynamic";

const Ribbon = dynamic(() => import("./ui/Ribbon"));

interface Props {
  court: CourtType;
  className?: string;
}

const CourtCard = ({ className = "", court }: Props) => {
  return (
    <article
      title={`Zoom in`}
      className={`shadow-sm cursor-pointer hover:md:opacity-90 active:opacity-60 hover:md:translate-y-[-3%] transition-all duration-300 relative ${className}`}
    >
      <div className="relative h-full">
        <Image
          src={court.image || "/images/court.webp"}
          width={500}
          height={500}
          alt="Court's image"
          loading="lazy"
          className="rounded-lg w-full h-full min-h-[170px] md:min-h-[190px] max-h-[190px] z-[-2] object-cover"
        />
        <h2 className="text-white text-[14px] md:text-[18px] lg:text-[19px] absolute bottom-7 left-4 right-4 z-[5]">
          {truncStr(court.title, 45)}
        </h2>
        <div className="bg-black/30 absolute top-0 left-0 w-full h-full rounded-lg"></div>
      </div>
      <div className="bg-bg-primary p-3 px-2 rounded-t-xl mt-[-15px] relative border-[1px] border-border-primary">
        <CourtCardControls court={court} />
      </div>

      {court.featured && <Ribbon text={`TOP MATCH`} />}
    </article>
  );
};

export default CourtCard;
