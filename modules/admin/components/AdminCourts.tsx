"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLoading as LoadingIcon } from "react-icons/ai";
import getCourts from "@/actions/getCourts";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useModal } from "@/hooks/use-modal";
import { CourtType } from "@/types/courts";
import { truncStr } from "@/utils/truncString";

const AdminCourts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [courts, setCourts] = useState<CourtType[]>([]);
  const { openModal } = useModal();

  useEffect(() => {
    if (!searchQuery) {
      setCourts([]);
      return;
    }

    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const { courts } = await getCourts({ title: searchQuery });
        setCourts(courts);
      } catch {
        alert("Error occurred, please contact developer: Amel");
      } finally {
        setLoading(false);
      }
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    };
  }, [searchQuery]);

  return (
    <div>
      <div className="flex items-center justify-between space-x-5">
        <h2 className="text-2xl md:text-4xl font-semibold text-text-primary">
          Courts
        </h2>
        <Button
          className="hover:!bg-primary"
          onClick={() => openModal("addCourt")}
        >
          Add Court
        </Button>
      </div>

      <Input
        placeholder="Search court by title"
        value={searchQuery}
        useDebounce
        onChange={setSearchQuery}
        className="mt-5 w-full !border-[3px]"
      />

      <div className="mt-5">
        {loading && (
          <LoadingIcon className="animate-spin mx-auto text-[50px] text-primary mt-5" />
        )}

        {searchQuery && !loading && !courts.length && (
          <p className="text-lg text-text-secondary text-center">
            No results...
          </p>
        )}

        <ul className="space-y-5">
          {courts.map((court) => (
            <li
              key={court.id}
              className="py-3 px-4 rounded-xl flex items-center flex-col md:flex-row justify-between bg-bg-primary shadow-md text-text-primary"
            >
              <h3 className="text-sm md:text-lg">
                {truncStr(court.title, 35)} -{" "}
                <span className="text-[12px]">
                  LAT: {court.lat}, LON: {court.lon}
                </span>
              </h3>
              <div className="space-x-3">
                <Button
                  className="!bg-[#006ab0] text-[14px]"
                  onClick={() =>
                    openModal("editCourt", court, (updatedCourt: CourtType) => {
                      if (!updatedCourt.id) return;
                      setCourts((prevCourts) =>
                        prevCourts.map((c) =>
                          c.id === updatedCourt.id ? updatedCourt : c
                        )
                      );
                    })
                  }
                >
                  Edit
                </Button>
                <Button
                  className="!bg-red-500 text-[14px]"
                  onClick={() =>
                    openModal(
                      "deleteCourt",
                      court,
                      (deletedCourt: CourtType) => {
                        if (!deletedCourt.id) return;
                        setCourts((prevCourts) =>
                          prevCourts.filter(
                            (court) => court.id !== deletedCourt.id
                          )
                        );
                      }
                    )
                  }
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCourts;
