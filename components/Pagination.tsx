"use client";
import { PaginationType } from "@/types/pagination";
import objectToQs from "@/utils/objectToQs";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const Pagination = ({
  className = "",
  nextPage,
  prevPage,
  currentPage,
  totalPages,
  searchParams,
}: PaginationType & { className?: string; searchParams: any }) => {
  const [pages, setPages] = useState<number[]>([]);
  const router = useRouter();
  const pathame = usePathname();

  const handlePageChange = (page: number) => {
    searchParams.page = page;

    if (page >= 1 && page <= totalPages) {
      router.push(pathame + "?" + objectToQs(searchParams));
    }
  };
  const generatePageNumbers = () => {
    const pages = [];

    // Ensure there are at least 2 previous and 2 future pages if they exist

    const offsetPages = window.innerWidth > 900 ? 2 : 1;

    const startPage = Math.max(currentPage - offsetPages, 1);
    const endPage = Math.min(currentPage + offsetPages, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    setPages(generatePageNumbers());
  }, [currentPage, totalPages]); // eslint-disable-line

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <button
        title="Go back"
        onClick={() => prevPage && handlePageChange(prevPage)}
        disabled={!prevPage}
        className="cursor-pointer border-[1px] border-border-secondary px-3 py-2 text-text-primary rounded-lg flex items-center text-[12px] md:text-[15px] active:opacity-60 hover:md:text-primary transition-all disabled:opacity-50"
      >
        <FaArrowLeftLong className="mr-2" /> Back
      </button>

      {pages?.map((page) => (
        <button
          key={page}
          title={`Page ${page}`}
          onClick={() => page !== currentPage && handlePageChange(page)}
          className={`w-[40px] text-text-primary active:opacity-50 h-[40px] border-[1px] border-border-secondary cursor-pointer hover:md:border-primary transition rounded-lg text-[12px] md:text-base ${
            page === currentPage && "!bg-primary !text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => nextPage && handlePageChange(nextPage)}
        disabled={!nextPage}
        className="cursor-pointer border-[1px] border-border-secondary px-3 py-2 text-text-primary rounded-lg flex items-center text-[12px] md:text-[15px] active:opacity-60 hover:md:text-primary transition-all disabled:opacity-50"
      >
        Next <FaArrowRightLong className="ml-2" />
      </button>
    </div>
  );
};

export default Pagination;
