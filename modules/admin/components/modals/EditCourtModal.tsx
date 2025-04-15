import React from "react";
import DynamicForm from "../forms/Form";
import { CourtFormDataType, CourtType } from "@/types/courts";
import { useModal } from "@/hooks/use-modal";
import { editCourt } from "../../actions/editCourt";

const EditCourtModal = () => {
  const { closeModal, data, fn: modalFn = () => {} } = useModal();

  async function onSubmit(formData: CourtFormDataType) {
    if (!data) return;

    editCourt(data?.id, formData)
      .then((res) => {
        if (res.success) {
          modalFn(res.data);
          closeModal();
          alert("✅ You've successfully edited a court :)");
        }
      })
      .catch((err) => {
        alert("🚩 ERROR: " + err.message);
      });
  }

  if (!data) {
    alert("Error: No court data, contact developers please.");
    return;
  }

  return (
    <div>
      <DynamicForm
        uniqueFormKey={`edit-court-${data.id}`}
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
        initFormData={
          {
            title: (data as CourtType)?.title,
            description: (data as CourtType)?.description,
            image: (data as CourtType)?.image,
            moreInfo: (data as CourtType)?.moreInfo,
            featured: (data as CourtType)?.featured,
            lat: (data as CourtType)?.lat,
            lon: (data as CourtType)?.lon,
          } as CourtFormDataType
        }
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default EditCourtModal;
