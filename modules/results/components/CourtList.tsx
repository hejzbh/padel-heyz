import React from "react";
import CourtCard from "./CourtCard";
import Pagination from "@/components/Pagination";
import { PaginationType } from "@/types/pagination";
import Separator from "@/components/ui/Separator";
import { HomeSearchParams } from "@/app/page";

interface Props {
  className?: string;
  courts: any[];
  count: number;
  pagination: PaginationType;
  searchParams: HomeSearchParams;
}

const CourtList = ({
  className = "",
  courts = [],
  count,
  pagination,
  searchParams,
}: Props) => {
  return (
    <div className={`${className}`}>
      <div className="flex items-center space-x-4">
        <p className="text-text-primary text-xl md:text-3xl">
          {count} {count === 1 ? "Result" : "Results"}
        </p>
      </div>

      <ul className="grid grid-cols-2  gap-5 mt-10">
        {courts?.map((court) => (
          <li key={court.id}>
            <CourtCard court={court} />
          </li>
        ))}
      </ul>

      <Separator className="my-5" />

      <Pagination searchParams={searchParams} {...pagination} />
    </div>
  );
};

export default CourtList;
