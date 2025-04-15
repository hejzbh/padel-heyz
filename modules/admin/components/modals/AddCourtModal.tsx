import React from "react";
import DynamicForm from "../forms/Form";
import { CourtFormDataType } from "@/types/courts";
import { addCourt } from "../../actions/addCourt";
import { useModal } from "@/hooks/use-modal";

const AddCourtModal = () => {
  const { closeModal } = useModal();

  async function onSubmit(formData: CourtFormDataType) {
    addCourt(formData)
      .then((res) => {
        if (res.success) {
          closeModal();
          alert("✅ You've successfully added new court ! :)");
        }
      })
      .catch((err) => {
        alert("🚩 ERROR: " + err.message);
      });
  }

  return (
    <div>
      <DynamicForm
        autosave
        uniqueFormKey="add-court"
        fields={[
          {
            name: "title",
            variant: "input",
            label: "Title",
            placeholder: "Enter title here",
            required: true,
          },
          {
            name: "description",
            variant: "textarea",
            label: "Description",
            placeholder: "Write something about this court if you want",
          },
          {
            name: "lat",
            variant: "input",
            label: "Latitude",

            required: true,
          },
          {
            name: "lon",
            variant: "input",
            label: "Longitude",

            required: true,
          },
          {
            name: "image",
            label: "Image",
            variant: "image_upload",
          },
          {
            name: "moreInfo",
            variant: "input",
            label: "Link for more details",
            placeholder: "exmpl: www.othersite.com",
            required: true,
          },
          {
            name: "featured",
            variant: "checkbox",
            label: "Featured",
          },
        ]}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AddCourtModal;
