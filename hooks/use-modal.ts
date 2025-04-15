import { BlogType } from "@/types/blog";
import { CourtType } from "@/types/courts";
import { create } from "zustand";

export type ModalType =
  | "addBlog"
  | "editBlog"
  | "deleteBlog"
  | "addCourt"
  | "editCourt"
  | "deleteCourt"
  | "courtDetails";

type ModalState = {
  isOpen: boolean;
  modalType: ModalType | null;
  data: BlogType | CourtType | undefined;
  fn?: (data?: any) => void;
  openModal: (
    type: ModalState["modalType"],
    data?: BlogType | CourtType,
    fn?: (data?: any) => void
  ) => void;
  closeModal: () => void;
};

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  data: undefined,
  openModal: (type, data, fn) =>
    set({ isOpen: true, modalType: type, data, fn }),
  closeModal: () =>
    set({ isOpen: false, modalType: null, data: undefined, fn: undefined }),
}));
