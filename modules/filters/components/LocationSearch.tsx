"use client";
import React, { memo, useEffect, useRef, useState } from "react";
import Input from "@/components/ui/Input";
import { Location } from "../types";
import { AiOutlineLoading as LoadingIcon } from "react-icons/ai";
import axiosInstance from "@/lib/axios";

interface Props {
  className?: string;
  value?: string;
  label?: string;
  onLocationChange: (location?: Location | null) => void;
}

const defaultLocations: Location[] = [
  {
    place_id: 0,
    lat: "49.8158683",
    lon: "6.1296751",
    display_name: "Luxembourg",
    boundingbox: [49.4478587, 50.1827726, 5.7357006, 6.5312481],
  },
  {
    place_id: 1,
    lat: "-38.416097",
    lon: "-63.616672",
    display_name: "Argentina",
    boundingbox: [-55.1925709, -21.7808568, -73.5605371, -53.6374515],
  },
  {
    place_id: 2,
    lat: "41.87194",
    lon: "12.56738",
    display_name: "Italia",
    boundingbox: [35.2889616, 41.0, 6.6272658, 13.0],
  },
  {
    place_id: 3,
    lat: "60.128161",
    lon: "18.643501",
    display_name: "Swedish",
    boundingbox: [55.1370957, 69.0599735, 10.5935025, 24.1776819],
  },
  {
    place_id: 4,
    lat: "46.603354",
    lon: "1.888334",
    display_name: "France",
    boundingbox: [-50.2187169, 51.3055721, -178.3873749, 172.3057152],
  },
];
let x: any = null;

const LocationSearch = memo(
  ({ className = "", value, label = "Search", onLocationChange }: Props) => {
    const [q, setQ] = useState<string>("");
    const [locations, setLocations] = useState<Location[]>(defaultLocations);
    const [inFocus, setInFocus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const divRef = useRef<any>(null);

    useEffect(() => {
      setQ(value || "");
    }, [value]);

    useEffect(() => {
      if (!inFocus) return;

      // If there's no q
      if (!q) {
        setLocations(defaultLocations);
        setLoading(false);
        onLocationChange(null);
        return;
      }

      setLoading(true);

      const searchLimiter = setTimeout(async () => {
        try {
          // Fetch results
          const response = await axiosInstance.get(`/locations?q=${q}`);

          if (response?.data?.success && response?.data?.data) {
            setLocations(response?.data?.data);
          }
        } finally {
          setLoading(false);
        }
      }, 350);

      return () => clearTimeout(searchLimiter);
    }, [q]);

    const handleClickOutside = (e: any) => {
      if (divRef.current && !divRef.current.contains(e.target)) {
        setInFocus(false);
      }
    };

    useEffect(() => {
      document.addEventListener("click", handleClickOutside);

      // Cleanup
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, []);

    return (
      <div ref={divRef} className={`relative z-[150] ${className}`}>
        <Input
          onFocus={() => {
            setInFocus(true);
          }}
          className="w-full !border-[3px]"
          placeholder={label}
          value={q}
          onChange={setQ}
        />

        {(loading || inFocus) && (
          <div className="absolute z-[50] rounded-3xl top-[100%] space-y-2 left-0 w-full p-2 bg-bg-primary border-[1px] border-border-primary">
            {loading ? (
              <LoadingIcon className="block animate-spin w-[35px] h-[35px] text-primary" />
            ) : locations?.length ? (
              locations?.map((location) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    onLocationChange(location);
                    setQ(location.display_name);
                    setInFocus(false);
                  }}
                  className="p-3 block rounded-3xl transition-all active:opacity-50 duration-300 ease-in-out cursor-pointer text-text-primary hover:bg-bg-secondary"
                  key={location.place_id}
                >
                  {location.display_name}
                </div>
              ))
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

export default LocationSearch;
