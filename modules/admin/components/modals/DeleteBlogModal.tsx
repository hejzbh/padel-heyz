import { useModal } from "@/hooks/use-modal";
import React from "react";
import AreYouSure from "../AreYouSure";
import { truncStr } from "@/utils/truncString";
import { BlogType } from "@/types/blog";
import { deleteBlog } from "../../actions/deleteBlog";

const DeleteBlogModal = () => {
  const { closeModal, fn: modalFn = () => {}, data } = useModal();

  if (!data) return;

  return (
    <div>
      <AreYouSure
        YES={() => {
          deleteBlog(data?.id)
            .then((res) => {
              if (res.success) {
                modalFn(data);
                closeModal();
                alert("✅ Blog is deleted");
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
          {truncStr((data as BlogType)?.title, 25)}{" "}
        </span>
        blog?
      </AreYouSure>
    </div>
  );
};

export default DeleteBlogModal;
