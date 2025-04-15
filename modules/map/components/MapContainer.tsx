"use client";
import React from "react";
import dynamic from "next/dynamic";
import { HomeSearchParams } from "@/app/page";
import { AiOutlineLoading as LoadingIcon } from "react-icons/ai";

const Map = dynamic(() => import("@/modules/map/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-bg-primary flex items-center justify-center flex-col space-y-3">
      <LoadingIcon className="text-[80px] text-primary animate-spin" />
      <h2 className="text-xl text-text-primary">Loading map</h2>
    </div>
  ),
});

const MapContainer = ({
  className = "",
  searchParams,
}: {
  className?: string;
  searchParams: HomeSearchParams;
}) => {
  return (
    <Map
      className={className}
      centerCoordinates={[
        Number(searchParams.lat || 50),
        Number(searchParams.lon || 50),
      ]}
    />
  );
};

export default MapContainer;
