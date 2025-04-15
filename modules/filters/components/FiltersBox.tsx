"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Filter, FilterTypeEnum } from "../types";
import Button from "@/components/ui/Button";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import Label from "@/components/ui/Label";
import { IoSearchOutline } from "react-icons/io5";
import objectToQs from "@/utils/objectToQs";

const LocationSearch = dynamic(() => import("./LocationSearch"));

interface Props {
  className?: string;
  filters: Filter[];
}

const FiltersBox = ({ className = "", filters = [] }: Props) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const router = useRouter();
  const pathname = usePathname();

  // Load active filters
  useEffect(() => {
    let activeFilters: Record<string, string> = {};

    filters.forEach((filter) => {
      if (filter.active) {
        activeFilters[filter.name] = filter.value;
      }
    });

    setActiveFilters({ ...activeFilters });
  }, [filters]);

  const applyFilters = useCallback(
    (activeFilters: Record<string, any>) => {
      router.push(`${pathname}?${objectToQs(activeFilters)}`);
    },
    [activeFilters, router, pathname]
  );

  return (
    <div className={`${className}`}>
      {/** 
<h2 className="text-lg md:text-2xl text-text-primary">Search Filter</h2> */}

      {/** Filters */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyFilters(activeFilters);
        }}
        className="flex items-start space-x-3"
      >
        <div className="w-full grid md:grid-cols-2 relative">
          {filters?.map((filter, i) => {
            if (!filter.visible) return null;

            // Search
            if (filter.type === FilterTypeEnum.LOCATION_SEARCH) {
              return (
                <div key={i} className="col-span-2">
                  <Label>Search Padel Courts Near Me</Label>
                  <LocationSearch
                    onLocationChange={(location) => {
                      const newActiveFilters = {
                        ...activeFilters,
                        q: location?.display_name || "",
                        lat: location?.lat || "",
                        lon: location?.lon || "",
                        boundingbox: location?.boundingbox,
                      };

                      setActiveFilters({ ...newActiveFilters });

                      applyFilters(newActiveFilters);
                    }}
                    className="w-full"
                    value={filter.value}
                    label={filter.label}
                  />
                </div>
              );
            }

            /**  if (filter.type === FilterTypeEnum.RANGE) {
              const range = activeFilters?.range || DEFAULT_AREA_RANGE;

              return (
                <div key={i} className="flex flex-col">
                  <Label>{filter?.label}</Label>
                  <Input
                    name={filter.name}
                    value={range?.toString()}
                    type="range"
                    useDebounce
                    className="!p-0 !m-0"
                    onChange={(range) => {
                      setActiveFilters((activeFilters) => ({
                        ...activeFilters,
                        range,
                      }));
                    }}
                    min={100}
                    max={1000}
                  />

                  <p className="text-[13px]">
                    Km: {range}{" "}
                    <span className="text-[12px]">{`(${Math.floor(
                      +range * 0.621371
                    )} miles)`}</span>
                  </p>
                </div>
              );
            } */

            // Checkbox
            if (filter.type === FilterTypeEnum.CHECHBOX) {
              return <div key={i}>Checkbox</div>;
            }

            return null;
          })}

          {Object.keys(activeFilters)?.length > 0 && (
            <p
              onClick={() => router.push("/")}
              className="text-red-400  float-right ml-3 underline text-sm cursor-pointer active:opacity-50 hover:md:opacity-80 z-[50]"
            >
              Clear filters
            </p>
          )}
        </div>

        {/** Submit Button */}
        <Button
          type="submit"
          title="Search"
          className="mt-6 text-[13px]  h-[50px] flex items-center justify-center md:text-base !rounded-full px-2 md:px-8"
        >
          <span className="hidden md:block mr-2">Search</span>
          <IoSearchOutline className="text-[20px] md:text-[25px]" />
        </Button>
      </form>
    </div>
  );
};

export default FiltersBox;
