"use client";
import React, { Suspense, useEffect } from "react";
import { useModal } from "@/hooks/use-modal";
import dynamic from "next/dynamic";
import { BiX } from "react-icons/bi";
import { AiOutlineLoading as LoadingIcon } from "react-icons/ai";
import Separator from "../ui/Separator";
import CourtDetailsModal from "@/modules/results/components/modals/CourtDetailsModal";

// Dynamically import modal components

const AddBlogModal = dynamic(
  () => import("@/modules/admin/components/modals/AddBlogModal")
);
const EditBlogModal = dynamic(
  () => import("@/modules/admin/components/modals/EditBlogModal")
);
const DeleteBlogModal = dynamic(
  () => import("@/modules/admin/components/modals/DeleteBlogModal")
);
const AddCourtModal = dynamic(
  () => import("@/modules/admin/components/modals/AddCourtModal")
);
const EditCourtModal = dynamic(
  () => import("@/modules/admin/components/modals/EditCourtModal")
);
const DeleteCourtModal = dynamic(
  () => import("@/modules/admin/components/modals/DeleteCourtModal")
);

const ModalProvider = () => {
  const { isOpen, modalType, closeModal } = useModal();

  useEffect(() => {
    function closeOnEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
      }
    }
    window.addEventListener("keydown", closeOnEscape);

    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []); // eslint-disable-line

  if (!isOpen) return null;

  let ModalComponent = null;
  let title = "";

  // Determine which modal to show based on the modal type
  switch (modalType) {
    case "addBlog":
      title = "Add new blog";
      ModalComponent = AddBlogModal;
      break;
    case "editBlog":
      title = "Edit blog";
      ModalComponent = EditBlogModal;
      break;
    case "deleteBlog":
      title = "Delete blog";
      ModalComponent = DeleteBlogModal;
      break;
    case "addCourt":
      title = "Add new court";
      ModalComponent = AddCourtModal;
      break;
    case "editCourt":
      title = "Edit court";
      ModalComponent = EditCourtModal;
      break;
    case "deleteCourt":
      title = "Delete court";
      ModalComponent = DeleteCourtModal;
      break;
    case "courtDetails":
      title = "Details";
      ModalComponent = CourtDetailsModal;
      break;
    default:
      return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[5000] bg-black/80 flex items-center justify-center p-5">
      <div className="bg-bg-primary p-7 pb-10 w-full md:max-w-[80%] xl:max-w-[60%] rounded-xl overflow-y-scroll max-h-[90%] scrollbar-hide">
        <div className="flex items-center justify-between space-x-10">
          <h2 className="text-text-primary text-2xl">{title}</h2>
          <button
            title="Close modal"
            className="p-2 cursor-pointer hover:opacity-70 transition"
            onClick={closeModal}
          >
            <BiX className="text-3xl text-red-500" />
          </button>
        </div>
        <Separator className="my-5" />
        <Suspense
          fallback={
            <LoadingIcon className="mx-auto text-xl text-primary animate-spin" />
          }
        >
          <ModalComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default ModalProvider;
