import { useModal } from "@/hooks/use-modal";
import React from "react";
import AreYouSure from "../AreYouSure";
import { CourtType } from "@/types/courts";
import { truncStr } from "@/utils/truncString";
import { deleteCourt } from "../../actions/deleteCourt";

const DeleteCourtModal = () => {
  const { closeModal, fn: modalFn = () => {}, data } = useModal();

  if (!data) return;
  return (
    <div>
      <AreYouSure
        YES={() => {
          deleteCourt(data?.id)
            .then((res) => {
              if (res.success) {
                modalFn(data);
                closeModal();
                alert("✅ Court is deleted");
              }
            })
            .catch((err) => {
              alert("🚩 ERROR:" + err.message);
            });
        }}
        NO={closeModal}
      >
        Are you sure you wanna delete{" "}
        <span className="text-red-500 text-2xl">
          {truncStr((data as CourtType)?.title, 25)}{" "}
        </span>
        court?
      </AreYouSure>
    </div>
  );
};

export default DeleteCourtModal;
